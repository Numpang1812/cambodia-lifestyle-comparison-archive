"use client";

import { useContributeForm } from "../app/lib/useContributeForm";
import ContributeTextField from "./ContributeTextField";
import ContributeFormMetaFields from "./ContributeFormMetaFields";
import ContributeFormExtraFields from "./ContributeFormExtraFields";
import styles from "../app/contribute/contribute.module.css";

export default function ContributeForm({ user }) {
  const form = useContributeForm(user);

  return (
    <form className={styles.form} onSubmit={form.handleSubmit} noValidate>
      {form.formError && (
        <div className={styles.formAlert} role="alert">
          {form.formError}
        </div>
      )}

      <ContributeFormMetaFields {...form.metaProps} />

      <ContributeTextField
        id="content"
        label="CONTENT"
        value={form.content}
        onChange={form.setContent}
        error={form.errors.content}
        placeholder="Minimum 50 characters describing cultural observation..."
        multiline
        required
      />

      <ContributeFormExtraFields {...form.extraProps} />

      <button
        type="submit"
        className={styles.submitBtn}
        disabled={form.isSubmitting}
      >
        {form.isSubmitting ? "UPLOADING & SAVING..." : "SAVE & PUBLISH ENTRY"}
      </button>
    </form>
  );
}
