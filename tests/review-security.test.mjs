// Integration tests: review + security behaviors of the live Supabase backend.
// Run:  node --test tests/
// Needs NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
//       SUPABASE_SECRET_KEY (env, falling back to .env.local). No secrets in this file.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { randomUUID } from "node:crypto";
import { createClient } from "@supabase/supabase-js";

function loadEnvLocal() {
  try {
    const text = readFileSync(new URL("../.env.local", import.meta.url), "utf8");
    for (const line of text.split(/\r?\n/)) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
    }
  } catch {}
}
loadEnvLocal();

const SB_URL = (process.env.NEXT_PUBLIC_SUPABASE_URL || "").replace(/\/$/, "");
const ANON = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
const SECRET = process.env.SUPABASE_SECRET_KEY;
const hasCreds = Boolean(SB_URL && ANON && SECRET);

const adminH = () => ({
  apikey: SECRET,
  Authorization: `Bearer ${SECRET}`,
  "Content-Type": "application/json",
});
const svcRest = (path, opts = {}) =>
  fetch(`${SB_URL}/rest/v1/${path}`, {
    ...opts,
    headers: { ...adminH(), ...(opts.headers || {}) },
  });
const isRls = (e) => !!e && /row-level security|permission denied|violates/i.test(e.message || "");

const CONTENT = [
  "In the 1980s and 90s, most people moved on foot or on small-framed bicycles in Cambodia. This row exists only for automated testing.",
];

test(
  "review & security integration",
  {
    skip: !hasCreds
      ? "missing NEXT_PUBLIC_SUPABASE_URL / publishable key / SUPABASE_SECRET_KEY"
      : false,
  },
  async (t) => {
    const made = { users: [], entries: [] };

    async function createUser(tag) {
      const email = `it-${tag}-${Date.now()}-${Math.floor(Math.random() * 1e6)}@example.com`;
      const password = `It-${randomUUID()}`;
      const res = await fetch(`${SB_URL}/auth/v1/admin/users`, {
        method: "POST",
        headers: adminH(),
        body: JSON.stringify({ email, password, email_confirm: true }),
      });
      assert.ok(res.ok, `createUser ${tag}: ${res.status}`);
      const user = await res.json();
      made.users.push(user.id);
      const sb = createClient(SB_URL, ANON);
      const { error } = await sb.auth.signInWithPassword({ email, password });
      assert.ok(!error, `signIn ${tag}: ${error?.message}`);
      return { id: user.id, email, sb };
    }

    async function addReviewer(userId) {
      const res = await svcRest("reviewers", {
        method: "POST",
        headers: { Prefer: "return=minimal" },
        body: JSON.stringify({ user_id: userId }),
      });
      if (!res.ok) assert.fail(`addReviewer: ${res.status} ${await res.text()}`);
    }

    async function createEntry(owner, status = "pending") {
      const res = await svcRest("entries?select=id,status", {
        method: "POST",
        headers: { Prefer: "return=representation" },
        body: JSON.stringify({
          num: `it${Date.now() % 100000}`,
          slug: `it-${randomUUID()}`,
          title: ["Integration Test Entry", "ការសាកល្បងសមាហរណកម្ម"],
          content: CONTENT,
          timeline: "2024",
          topic: ["Commute & Mobility"],
          source: ["integration test"],
          owner,
          status,
        }),
      });
      if (!res.ok) assert.fail(`createEntry: ${res.status} ${await res.text()}`);
      const row = (await res.json())[0];
      made.entries.push(row.id);
      return row;
    }

    async function statusOf(id) {
      const res = await svcRest(`entries?id=eq.${id}&select=status`);
      return (await res.json())[0]?.status;
    }
    async function setStatus(id, status) {
      await svcRest(`entries?id=eq.${id}`, { method: "PATCH", body: JSON.stringify({ status }) });
    }

    try {
      const attacker = await createUser("attacker"); // plain contributor, not a reviewer
      const owner = await createUser("owner"); // owns the target entry
      const rev1 = await createUser("rev1");
      const rev2 = await createUser("rev2");
      await addReviewer(rev1.id);
      await addReviewer(rev2.id);
      const target = await createEntry(owner.id, "pending");

      // --- console attacks (Lab 10 Part 4 + Sprint 2 ownership) ---
      await t.test("A. insert with status published blocked by RLS", async () => {
        const { error } = await attacker.sb
          .from("entries")
          .insert({
            num: `it${Date.now() % 100000}`,
            slug: `it-${randomUUID()}`,
            title: ["Should be rejected", "គួរបដិសេធ"],
            content: CONTENT,
            timeline: "2024",
            topic: ["Commute & Mobility"],
            source: ["attack"],
            owner: attacker.id,
            status: "published",
          })
          .select();
        assert.ok(
          error && isRls(error),
          `expected RLS error, got: ${error?.message || JSON.stringify(error)}`
        );
      });

      await t.test("B. update own pending entry to published blocked by RLS", async () => {
        const mine = await createEntry(attacker.id, "pending");
        const { data, error } = await attacker.sb
          .from("entries")
          .update({ status: "published" })
          .eq("id", mine.id)
          .select();
        assert.ok(
          (error && isRls(error)) || (Array.isArray(data) && data.length === 0),
          `expected refusal, got rows=${data?.length}`
        );
      });

      await t.test("C. review_entry on own pending entry returns false", async () => {
        const mine = await createEntry(attacker.id, "pending");
        const { data, error } = await attacker.sb.rpc("review_entry", {
          entry_id: mine.id,
          decision: "published",
        });
        assert.ok(
          data === false ||
            (error && /permission denied|not authorized|reviewer/i.test(error.message)),
          `got data=${JSON.stringify(data)} err=${error?.message}`
        );
      });

      await t.test("D. insert self into reviewers blocked by RLS", async () => {
        const { data, error } = await attacker.sb
          .from("reviewers")
          .insert({ user_id: attacker.id })
          .select();
        assert.ok(
          error && isRls(error),
          `expected RLS error, got: ${error?.message || JSON.stringify(data)}`
        );
      });

      await t.test("E. logged out, request unpublished -> empty", async () => {
        const anon = createClient(SB_URL, ANON);
        const { data } = await anon.from("entries").select("id,status").neq("status", "published");
        assert.equal(data?.length, 0);
      });

      await t.test("7. visitor sees only published", async () => {
        const anon = createClient(SB_URL, ANON);
        const { data } = await anon.from("entries").select("status");
        const statuses = [...new Set((data || []).map((r) => r.status))];
        assert.deepEqual(statuses, ["published"]);
      });

      await t.test(
        "6a/6b. update & delete another owner's entry refused, target unchanged",
        async () => {
          const upd = await attacker.sb
            .from("entries")
            .update({ title: ["hijacked", "hijacked"] })
            .eq("id", target.id)
            .select();
          assert.ok(
            (upd.error && isRls(upd.error)) || (Array.isArray(upd.data) && upd.data.length === 0),
            `update rows=${upd.data?.length}`
          );
          const del = await attacker.sb.from("entries").delete().eq("id", target.id).select();
          assert.ok(
            (del.error && isRls(del.error)) || (Array.isArray(del.data) && del.data.length === 0),
            `delete rows=${del.data?.length}`
          );
          const after = await svcRest(`entries?id=eq.${target.id}&select=status`);
          assert.equal((await after.json())[0]?.status, "pending", "target must be unchanged");
        }
      );

      // --- round trip: contributor edit paths vs RLS ---
      await t.test("round trip: returned -> edit -> pending", async () => {
        const e = await createEntry(owner.id, "pending");
        await setStatus(e.id, "returned");
        const { data, error } = await owner.sb
          .from("entries")
          .update({ title: ["Edited title here", "កែសម្រួល"], status: "pending" })
          .eq("id", e.id)
          .eq("owner", owner.id)
          .select();
        assert.ok(!error, error?.message);
        assert.equal(data?.[0]?.status, "pending");
      });

      await t.test("round trip: published -> edit -> pending (off shelf)", async () => {
        const e = await createEntry(owner.id, "pending");
        await setStatus(e.id, "published");
        const { data, error } = await owner.sb
          .from("entries")
          .update({ title: ["Edited title here", "កែសម្រួល"], status: "pending" })
          .eq("id", e.id)
          .eq("owner", owner.id)
          .select();
        assert.ok(!error, error?.message);
        assert.equal(data?.[0]?.status, "pending");
      });

      await t.test("round trip: contributor cannot self-publish via edit", async () => {
        const e = await createEntry(owner.id, "pending");
        const { data, error } = await owner.sb
          .from("entries")
          .update({ title: ["Edited title here", "កែសម្រួល"], status: "published" })
          .eq("id", e.id)
          .eq("owner", owner.id)
          .select();
        assert.ok(
          (error && isRls(error)) || (Array.isArray(data) && data.length === 0),
          `rows=${data?.length}`
        );
      });

      // --- concurrency: two reviewers, opposite decisions ---
      await t.test("race: first reviewer wins, loser refused, status terminal", async () => {
        const e = await createEntry(owner.id, "pending");
        const [r1, r2] = await Promise.all([
          rev1.sb.rpc("review_entry", { entry_id: e.id, decision: "published" }),
          rev2.sb.rpc("review_entry", { entry_id: e.id, decision: "returned" }),
        ]);
        const winners = [r1, r2].filter((r) => r.data === true);
        const losers = [r1, r2].filter((r) => r.data === false);
        assert.equal(winners.length, 1, `expected exactly 1 winner, got ${winners.length}`);
        assert.equal(losers.length, 1, `expected exactly 1 loser, got ${losers.length}`);
        const final = await statusOf(e.id);
        assert.ok(["published", "returned"].includes(final), `final status ${final}`);

        // after a decision lands, a fresh decision must be refused and status stay put
        const late = await rev1.sb.rpc("review_entry", {
          entry_id: e.id,
          decision: final === "published" ? "returned" : "published",
        });
        assert.equal(late.data, false, "late decision must be refused");
        assert.equal(await statusOf(e.id), final, "status must not change after a decision");
      });
    } finally {
      for (const id of made.entries) await svcRest(`entries?id=eq.${id}`, { method: "DELETE" });
      for (const id of made.users)
        await svcRest(`reviewers?user_id=eq.${id}`, { method: "DELETE" });
      for (const id of made.users)
        await fetch(`${SB_URL}/auth/v1/admin/users/${id}`, { method: "DELETE", headers: adminH() });
    }
  }
);
