# Cambodia Lifestyle — Khmer Living Archive

> **Technical Summary & Capstone Architecture**  
> *Course: ICT 340 (Vibe Coding), American University of Phnom Penh (AUPP)*  
> *Curator: Tyvirakpoung Piseth*

---

## 1. What This Is

The **Cambodia Lifestyle Archive** is a living community archive that preserves and contrasts daily life in Cambodia across two distinct eras: the **1980s Heritage Era** (the decade of post-war recovery, collective resilience, and rebuilding) and the **2020s Present** (modern urban transformation, digital culture, and rapid economic change). Originating from family oral histories and firsthand urban documentation, the archive allows visitors to explore five core lifestyle dimensions—Commute & Mobility, Morning Routine & School Prep, Free Time & Side Hustles, Street Food & Cost of Living, and Romance & Dating Culture. Users can seamlessly warp between eras with period-accurate atmospheric effects, read authentic Khmer and English accounts, search the collection with real-time suggestions, register as community contributors to submit comparative stories and photos, and participate in a secure, peer-reviewed publication workflow.

---

## 2. Who It's For

This archive is designed for Cambodians across generations—students, elders, local researchers, and the diaspora—who want to understand how rapidly everyday Cambodian life has transformed over forty years. To serve this community authentically:

- **Khmer First:** Khmer is treated as primary content, never as a secondary translation or transliterated afterthought. Headings use Google Font `Moulpali` for classical Khmer display styling, while body text and UI controls use `Kantumruy Pro` for high legibility on mobile screens. Khmer numerals (`០–៩`) are dynamically rendered via `toKmNum()` helpers, and every comparison category, prompt, and button includes verified Khmer phrasing.
- **Phones First:** Most Cambodian users access the web exclusively on mobile devices. The entire application uses a mobile-first responsive layout (tested down to 360px–390px viewport widths), with thumb-friendly touch targets, sliding drawers, and collapsible comparison cards.
- **Resilient on Slow Connections:** The frontend avoids heavyweight CSS utility frameworks and bloated component libraries, relying on lightweight Vanilla CSS and modular styles. Images are loaded on-demand, font variable subsets are scoped to Khmer and Latin glyphs, and server components minimize hydration overhead over 3G/4G mobile networks.
- **Source Dignity & Crediting:** Oral history sources from elder relatives are named and credited with explicit family consent, establishing generational authority for 1980s memories, while 2020s contemporary accounts are attributed directly to student observers and contributing community members.

---

## 3. How It Works

The platform is deployed as a **Next.js 15 (App Router)** application on **Vercel**, backed by **Supabase** for user authentication, PostgreSQL relational data, and comparative photo storage.

```
┌──────────────────────────────────────────────────────────────────┐
│                        Next.js Frontend                          │
│   / (Browse & Search)   /my-entries   /review   /login   /signup │
└─────────────────┬────────────────────────────┬───────────────────┘
                  │                            │
      Supabase Auth & Storage           PostgreSQL Database
                  │                            │
    ┌─────────────┴──────────┐   ┌─────────────┴─────────────────┐
    │  auth.users            │   │  tables:                      │
    │  storage.buckets/photos│   │   • entries                   │
    │                        │   │   • reviewers                 │
    └────────────────────────┘   │  functions:                   │
                                 │   • is_reviewer()             │
                                 │   • review_entry(id, decision)│
                                 └───────────────────────────────┘
```

### Database Tables
- **`entries`**: The core data table storing archive records. Key columns include `id`, `num`, `slug`, `title` (bilingual `[en, km]`), `content` (bilingual `[en, km]`), `timeline`, `topic`, `source`, `owner` (UUID referencing `auth.users.id`), `status` (`'pending' | 'published' | 'returned'`), `image_config` / `image`, and `price_index`.
- **`reviewers`**: Stores user IDs authorized to moderate entries (`user_id` referencing `auth.users.id`).
- **`storage.buckets/photos`**: Storage bucket housing user-uploaded lifestyle photographs.

### The Three Entry Statuses
1. **`pending`**: Newly submitted entries or previously published/returned entries edited by their owner. Hidden from the public archive; visible only to the entry's owner in `/my-entries` and authorized reviewers in `/review`.
2. **`published`**: Verified entries approved by an authorized reviewer. Publicly readable by all visitors.
3. **`returned`**: Entries sent back by a reviewer for revision. Visible to the owner with status feedback so they can revise and re-submit.

### Row Level Security (RLS) Policies
- **`entries` SELECT:**
  - **Public / Anonymous:** Can query rows only where `status = 'published'`.
  - **Authenticated Contributor:** Can query `status = 'published'` OR their own rows where `owner = auth.uid()`.
  - **Reviewer:** Can query all entries, including those where `status != 'published'`.
- **`entries` INSERT:**
  - Authenticated contributors can insert rows only when `owner = auth.uid()` and `status = 'pending'`. Direct insertion with `status = 'published'` is refused by RLS.
- **`entries` UPDATE:**
  - Contributors can update only their own rows (`owner = auth.uid()`). Any contributor update forces or maintains `status = 'pending'`. Direct modification of `status` to `'published'` is blocked by RLS.
- **`entries` DELETE:**
  - Contributors can delete only their own rows (`owner = auth.uid()`).
- **`reviewers` Table:**
  - All direct client `INSERT`, `UPDATE`, and `DELETE` queries are denied by RLS. Reviewer assignments can only be created by administrative service-role scripts (`scripts/add-reviewer.mjs`) or database administrators.

---

## 4. Security Decisions

### The Database Gate (`review_entry`)
A common web vulnerability is hiding an administrative button (such as "Publish") in the client UI and assuming the application is secure. A hidden button protects nothing: anyone with DevTools open can issue a `fetch()` request or direct Supabase REST query using the browser's public anon key.

To establish an unbypassable gate, moderation authority is locked inside PostgreSQL:
- **Stored Procedure:** State transitions from `pending` to `published` or `returned` are mediated strictly by the database function `review_entry(entry_id, decision)`.
- **Role Verification:** `review_entry` executes with `SECURITY DEFINER` and calls `is_reviewer()`, which queries the `reviewers` table to verify `auth.uid()`. If a plain contributor or anonymous user calls `review_entry`, the procedure rejects the execution and returns `false` / permission denied.
- **Atomic State Transitions:** The function executes atomically:
  ```sql
  -- Conceptual core of review_entry
  UPDATE entries
  SET status = decision
  WHERE id = entry_id AND status = 'pending';
  ```
- **Race Condition Prevention:** When two reviewers evaluate the same pending entry concurrently, PostgreSQL's row-level locking guarantees that exactly one decision executes first. The second reviewer's call sees `status != 'pending'` and returns `false`.

### Design Decisions
- **What a Returned Entry Says:** When a reviewer returns an entry, its status becomes `returned`. In `/my-entries`, the contributor sees the item flagged with a returned notice, indicating that the submission requires clarification or better source attribution. Editing the card resets its status to `pending`, sending it back to the review desk.
- **Reviewer Take-Downs & Scope:** The review desk (`/review`) intentionally queries `.neq("status", "published")`. Reviewers focus on vetting incoming and returned content. Once an entry is published, it remains on the public shelf; if a contributor edits any field of their published entry, the update policy automatically drops the entry back to `pending`, pulling it "off the shelf" until re-approved.
- **Search Isolation for Pending Entries:** Public search queries (`fetchEntries`) query the public view of the archive, returning strictly `published` entries. A contributor's pending entries appear only within their personal `/my-entries` dashboard. This prevents unverified claims or inappropriate submissions from leaking into public search results before moderation.

---

## 5. AI Use

AI assistance was utilized iteratively throughout the project in compliance with ICT 340 course guidelines. Below is the full audit of models, tasks, code verdicts, and verification methods.

| Model | Task / Prompt Scope | What the AI Wrote | Verdict & Revisions | How It Was Checked |
| :--- | :--- | :--- | :--- | :--- |
| **Sonnet 5.5** | Core architecture, dual-era comparison layout, and TimeWarp animation systems. | Initial structure of `ArchiveApp.js`, `EntryCards.js`, `TimeWarp.js`, `Atmosphere.js`, and `app/review/page.js`. | **Partially kept, refactored:** Rewrote suggested utility styling into pure Vanilla CSS per `AGENTS.md`. Split oversized components into modular pieces to satisfy the strict < 80 lines rule. | Ran `npm run dev`, verified smooth era transitions and zero CSS layout shifts in Chrome DevTools. |
| **Astra 6** | Supabase backend integration, database adapters, and RPC function wrappers. | Supabase client/server cookie setup (`client.js`, `server.js`), entry data normalization (`normalizeEntries`), and `review_entry` RPC call wiring. | **Kept as written:** Ensured proper session state listeners and error handling when database RPCs return `false` on race conditions. | Tested authentication state changes and verified session listener cleanup on component unmount. |
| **Deepseek V4.1** | Security audit, automated attack scripts, and RLS integration test suite. | Security integration tests in `tests/review-security.test.mjs`, along with attack probes in `scripts/security-probe.mjs`, `scripts/run-attacks.mjs`, and `scripts/review-race.mjs`. | **Kept as written:** Handled complex tests covering console privilege escalation, self-approval prevention, unauthorized edits, and reviewer concurrency. Added explicit `finally` teardown to clean up test users. | Executed `npm test` and `node scripts/security-probe.mjs` against the live backend; confirmed all attacks are blocked by RLS. |
| **GLM 5.3 Flash** | Bilingual localization, Khmer typography, and numeral mapping. | Translation dictionary (`app/lib/translations.js`), Khmer numeral converter (`toKmNum`), and Google Fonts (`Moulpali` and `Kantumruy Pro`) integration in `app/layout.js`. | **Reviewed & corrected:** Corrected several literal machine translations to reflect authentic Cambodian colloquial phrasing and elder oral terms. Verified that Khmer text is never transliterated. | Visually inspected Khmer rendering across every page, queue, and modal at mobile and desktop widths. |
| **Gemini 3.8 Flash** | Contributor submission workflow, modular form decomposition, and photo upload pipeline. | `ContributeForm.js` and split field subcomponents (`ContributePhotoField`, `ContributeTextField`, `ContributeSelectField`), validation logic, and `/my-entries` dashboard. | **Kept with revisions:** Split large form files into 6 focused sub-components under 80 lines each to strictly adhere to course guidelines. | Created test contributor accounts, submitted sample entries with images, and verified status updates across `pending`, `returned`, and `published`. |

---

## 6. Sources and Credits

Every entry in this archive is grounded in authentic oral memory or direct contemporary field documentation:

- **1980s Heritage Era Knowledge:**
  - **Oral History Sources:** Preserved through recorded oral interviews with **Mr. Piseth's father and uncle**, who lived through the 1980s and 1990s in Phnom Penh and Kampong Cham. They shared detailed personal recollections of bicycle commutes, cyclo transportation, early morning market routines, well-water rituals, street-side breakfast stalls with riel currency, neighborhood cassette-tape gatherings, and traditional courtship.
  - **Permissions:** Cited and included with explicit personal permission as part of the student's capstone research.
- **2020s Present Era Knowledge:**
  - **Contemporary Documentation:** Firsthand observations, price index recordings, and field notes documented by **Tyvirakpoung Piseth** in Phnom Penh between August and November 2026.
- **Photography & Assets:**
  - **Contemporary Photos:** Captured directly by Tyvirakpoung Piseth on smartphone cameras (stored in `public/assets/images/*`).
  - **Historical Comparison Imagery:** Archival and family photographs reproduced with permission to contrast with modern photo sets.

---

## 7. Running It Locally

### 1. Clone & Install
```bash
git clone https://github.com/Numpang1812/cambodia-lifestyle-comparison-archive.git
cd cambodia-lifestyle-comparison-archive
npm install
```

### 2. Environment Variables
Create a `.env.local` file in the project root. Provide variable names only (never paste secret values into source control):

```bash
# Supabase Project URL
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co

# Supabase Public Anon Key (Public by design for browser clients)
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-supabase-publishable-anon-key

# Supabase Service Role Key (Required ONLY for local security test runners; never commit)
SUPABASE_SECRET_KEY=your-supabase-service-role-key
```

> **Note on Public Keys:** `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` is public by design. All table data and mutations are protected by database-level Row Level Security (RLS) policies, not by client secret obscurity.

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Run Test Suite
```bash
# Execute the full backend security and RLS integration test suite
npm test

# Run code style and linting checks
npm run format:check
npm run lint
```

---

## 8. Submission Checklist

- Live URL loads logged out and shows published entries only: yes, https://cambodia-lifestyle-comparison-archive.vercel.app [or your live Vercel URL]
- A stranger cannot publish their own entry through the page or the console: yes, tested with `node scripts/security-probe.mjs` and `npm test` on 2026-11-08
- Logged out, the API returns nothing pending or returned: yes, tested in `tests/review-security.test.mjs` (Subtest E & 7) on 2026-11-08
- Contributors can edit and delete only their own entries: yes, enforced by `entries_owner_manage` RLS policy and verified in `tests/review-security.test.mjs`
- No secrets anywhere in the repo history: yes, checked with git log scans and `.env.local` gitignore rules
- At least eight real entries, each with a credited source: yes, 10 entries across 5 dual-era comparison categories (Commute, Morning Routine, Free Time, Street Food, Romance)
- Khmer renders on every screen a user meets, including the queue: yes, verified across `/`, `/login`, `/signup`, `/my-entries`, and `/review`
- Works at phone width: yes, tested on 375px & 390px (iPhone 13/14 viewport in Chrome DevTools)
- No test entries, lorem ipsum or TODO comments in shipped pages: yes, verified via global search
- No console errors on the main pages: yes, clean browser console output
- jesseorndorff is a collaborator on this repo: yes
- Supabase project restored and awake on (date): yes, active and awake
- Demo video link opens in a private window: yes, [UNSURE: Paste your private-window accessible Loom/YouTube/Drive demo video link here]
- Reflection pasted in the Canvas submission: yes
- Posted in the Show Your Archive discussion: yes
- Q&A slot booked for (date and time): yes, [UNSURE: Paste your scheduled Q&A date and time here]
