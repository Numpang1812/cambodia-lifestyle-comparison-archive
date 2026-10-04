"use client";

import { useContributeForm } from "../app/lib/useContributeForm";
import ContributeTextField from "./ContributeTextField";
import ContributeFormMetaFields from "./ContributeFormMetaFields";
import ContributeFormExtraFields from "./ContributeFormExtraFields";
import styles from "../app/contribute/contribute.module.css";

export default function ContributeForm({ user, initialData = null }) {
  const form = useContributeForm(user, initialData);
  const isEdit = Boolean(initialData?.id);

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

      <ContributeFormExtraFields {...form.extraProps} isEdit={isEdit} />

      <button
        type="submit"
        className={styles.submitBtn}
        disabled={form.isSubmitting}
      >
        {form.isSubmitting
          ? "UPLOADING & SAVING..."
          : isEdit
          ? "UPDATE & SAVE ENTRY"
          : "SAVE & PUBLISH ENTRY"}
      </button>
    </form>
  );
}
