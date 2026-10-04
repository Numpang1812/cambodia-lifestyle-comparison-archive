"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "./supabase/client";
import { uploadAndCreateEntry, updateExistingEntry } from "./contribute-submit";
import {
  validateTitle,
  validateTitleKm,
  validateContent,
  validateTimeline,
  validateTopic,
  validateSource,
  validatePriceIndex,
  validateImage,
  validateKeywords,
} from "./contribute-validation";

export function useContributeForm(user, initialData = null) {
  const router = useRouter();
  const isEdit = Boolean(initialData?.id);
  const entryId = initialData?.id || null;

  const [title, setTitle] = useState(
    Array.isArray(initialData?.title)
      ? initialData.title[0] || ""
      : initialData?.title || ""
  );
  const [titleKm, setTitleKm] = useState(
    Array.isArray(initialData?.title)
      ? initialData.title[1] || ""
      : initialData?.title_km || ""
  );
  const [content, setContent] = useState(
    Array.isArray(initialData?.content)
      ? initialData.content[0] || ""
      : initialData?.content || ""
  );
  const [timeline, setTimeline] = useState(initialData?.timeline || "");
  const [topic, setTopic] = useState(
    Array.isArray(initialData?.topic)
      ? initialData.topic[0] || ""
      : initialData?.topic || ""
  );
  const [source, setSource] = useState(
    Array.isArray(initialData?.source)
      ? initialData.source[0] || ""
      : initialData?.source || ""
  );
  const [priceIndex, setPriceIndex] = useState(
    initialData?.price_index
      ? typeof initialData.price_index === "object"
        ? JSON.stringify(initialData.price_index)
        : String(initialData.price_index)
      : ""
  );
  const [keywords, setKeywords] = useState(
    initialData?.keywords ? JSON.stringify(initialData.keywords) : ""
  );
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(
    initialData?.image_config?.url || null
  );

  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleFileSelect(e) {
    const file = e.target.files?.[0] || null;
    setPhotoFile(file);
    setPhotoPreview(file ? URL.createObjectURL(file) : initialData?.image_config?.url || null);
    if (file) setErrors((prev) => ({ ...prev, image: validateImage(file) }));
    else if (!isEdit) setErrors((prev) => ({ ...prev, image: "Photo is required." }));
    else setErrors((prev) => ({ ...prev, image: null }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setFormError("");

    const trimmed = {
      title: title.trim(),
      titleKm: titleKm.trim(),
      content: content.trim(),
      timeline: timeline.trim(),
      topic: topic.trim(),
      source: source.trim(),
      priceIndex: priceIndex.trim(),
      keywords: keywords.trim(),
    };

    // Changing photo is optional on edit; if no new file chosen, keep existing photo
    const imageError = isEdit && !photoFile ? null : validateImage(photoFile);

    const newErrors = {
      title: validateTitle(trimmed.title),
      title_km: validateTitleKm(trimmed.titleKm),
      content: validateContent(trimmed.content),
      timeline: validateTimeline(trimmed.timeline),
      topic: validateTopic(trimmed.topic),
      source: validateSource(trimmed.source),
      price_index: validatePriceIndex(trimmed.priceIndex),
      image: imageError,
      keywords: validateKeywords(trimmed.keywords),
    };

    setErrors(newErrors);
    if (Object.values(newErrors).some(Boolean)) return;

    setIsSubmitting(true);
    const supabase = createClient();

    try {
      if (isEdit) {
        await updateExistingEntry({
          supabase,
          user,
          entryId,
          trimmed,
          photoFile,
          existingImageConfig: initialData?.image_config || null,
        });
        router.push(`/?entry=${entryId}`);
      } else {
        const inserted = await uploadAndCreateEntry({
          supabase,
          user,
          trimmed,
          photoFile,
        });
        const newId = inserted?.id || "";
        router.push(newId ? `/?entry=${newId}` : "/");
      }
    } catch (err) {
      console.error(isEdit ? "Update entry failed:" : "Contribution submission failed:", err);
      if (err.message === "NOT_SAVED") {
        setFormError("That change wasn't saved");
      } else {
        setFormError("Failed to save entry. Please check your network and try again.");
      }
      setIsSubmitting(false);
    }
  }

  return {
    content,
    setContent,
    errors,
    formError,
    isSubmitting,
    handleSubmit,
    metaProps: {
      title,
      setTitle,
      titleKm,
      setTitleKm,
      topic,
      setTopic,
      timeline,
      setTimeline,
      errors,
    },
    extraProps: {
      photoFile,
      photoPreview,
      onFileSelect: handleFileSelect,
      source,
      setSource,
      priceIndex,
      setPriceIndex,
      keywords,
      setKeywords,
      errors,
      isSubmitting,
    },
  };
}
