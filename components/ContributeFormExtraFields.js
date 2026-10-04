"use client";

import ContributeTextField from "./ContributeTextField";
import ContributePhotoField from "./ContributePhotoField";

export default function ContributeFormExtraFields({
  photoFile,
  photoPreview,
  onFileSelect,
  source,
  setSource,
  priceIndex,
  setPriceIndex,
  keywords,
  setKeywords,
  errors,
  isSubmitting,
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

      <ContributeTextField
        id="price_index"
        label="PRICE INDEX (DIGITS ONLY)"
        value={priceIndex}
        onChange={setPriceIndex}
        error={errors.price_index}
        placeholder="Optional (digits only, e.g. 1500)"
      />

      <ContributeTextField
        id="keywords"
        label="KEYWORDS (JSON FORMAT)"
        value={keywords}
        onChange={setKeywords}
        error={errors.keywords}
        placeholder='Optional JSON, e.g. ["commute", "cyclo"]'
      />
    </>
  );
}
