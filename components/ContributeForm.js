"use client";

import { useContributeForm } from "../app/lib/useContributeForm";
import ContributeTextField from "./ContributeTextField";
import ContributeFormMetaFields from "./ContributeFormMetaFields";
import ContributeFormExtraFields from "./ContributeFormExtraFields";
import ContributeSuccessNotice from "./ContributeSuccessNotice";
import styles from "../app/contribute/contribute.module.css";

export default function ContributeForm({ user, initialData = null, pairSlug = null }) {
  const form = useContributeForm(user, initialData, pairSlug);
  const isEdit = Boolean(initialData?.id);

  if (form.submittedSuccess) {
    return <ContributeSuccessNotice />;
  }

  return (
    <form className={styles.form} onSubmit={form.handleSubmit} noValidate>
      {form.formError || form.errorCount > 0 ? (
        <div className={styles.formAlert} role={form.formError ? "alert" : "status"}>
          {form.formError && <p style={{ margin: 0 }}>{form.formError}</p>}
          {form.errorCount > 0 && (
            <p style={{ margin: form.formError ? "6px 0 0" : 0 }}>
              {form.errorCount} {form.errorCount === 1 ? "field needs" : "fields need"} attention.
              Details appear next to each field; fix them, then submit again.
            </p>
          )}
        </div>
      ) : null}

      <p className={styles.hint} style={{ margin: 0 }}>
        {isEdit
          ? "Photo is optional when editing; leave it unchanged to keep the current image. Depending on your account, saving may return the entry to review before it appears in the archive again."
          : "You can submit without a photo. New entries are reviewed before they appear in the archive; track status in My Entries."}
      </p>

      <fieldset
        disabled={form.isSubmitting}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "22px",
          border: 0,
          margin: 0,
          padding: 0,
          minWidth: 0,
        }}
      >
        <ContributeFormMetaFields {...form.metaProps} />

        <ContributeTextField
          id="content"
          label="CONTENT"
          value={form.content}
          onChange={form.setContent}
          error={form.errors.content}
          placeholder="Minimum 50 characters describing cultural observation..."
          hint="50 to 6000 characters. Describe the memory or place: who was there, what it looked like, what it cost, and what has changed since."
          multiline
          required
        />

        <ContributeFormExtraFields {...form.extraProps} isEdit={isEdit} />
      </fieldset>

      <button type="submit" className={styles.submitBtn} disabled={form.isSubmitting}>
        {form.isSubmitting ? "SAVING..." : isEdit ? "SAVE CHANGES" : "SUBMIT FOR REVIEW"}
      </button>
    </form>
  );
}
