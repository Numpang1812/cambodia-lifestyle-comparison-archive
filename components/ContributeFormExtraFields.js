"use client";

import ContributeTextField from "./ContributeTextField";
import ContributePhotoField from "./ContributePhotoField";
import ContributeKeywordField from "./ContributeKeywordField";

export default function ContributeFormExtraFields({
  photoFile,
  photoPreview,
  onFileSelect,
  source,
  setSource,
  keywords,
  setKeywords,
  errors,
  isSubmitting,
  isEdit = false,
}) {
  return (
    <>
      <ContributePhotoField
        id="photo"
        file={photoFile}
        previewUrl={photoPreview}
        onChange={onFileSelect}
        error={errors.image}
        disabled={isSubmitting}
        isEdit={isEdit}
      />

      <ContributeTextField
        id="source"
        label="SOURCE"
        value={source}
        onChange={setSource}
        error={errors.source}
        placeholder="e.g. Oral history from my father"
        required
      />

      <ContributeKeywordField value={keywords} onChange={setKeywords} />
    </>
  );
}
