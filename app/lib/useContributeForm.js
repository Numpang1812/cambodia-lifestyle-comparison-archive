"use client";

import { useEffect, useRef, useState } from "react";
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

export function useContributeForm(user, initialData = null, pairSlug = null) {
  const router = useRouter();
  const isEdit = Boolean(initialData?.id);
  const entryId = initialData?.id || null;

  const [title, setTitle] = useState(
    Array.isArray(initialData?.title) ? initialData.title[0] || "" : initialData?.title || ""
  );
  const [titleKm, setTitleKm] = useState(
    Array.isArray(initialData?.title) ? initialData.title[1] || "" : initialData?.title_km || ""
  );
  const [content, setContent] = useState(
    Array.isArray(initialData?.content) ? initialData.content[0] || "" : initialData?.content || ""
  );
  const [timeline, setTimeline] = useState(initialData?.timeline || "");
  const [topic, setTopic] = useState(
    Array.isArray(initialData?.topic) ? initialData.topic[0] || "" : initialData?.topic || ""
  );
  const [source, setSource] = useState(
    Array.isArray(initialData?.source) ? initialData.source[0] || "" : initialData?.source || ""
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
  const [photoPreview, setPhotoPreview] = useState(initialData?.image_config?.url || null);

  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const submitLock = useRef(false);
  const focusTarget = useRef(null);

  useEffect(() => {
    const target = focusTarget.current;
    if (!target) return;
    focusTarget.current = null;

    if (target === "image") {
      const input = document.getElementById("photo");
      const zone = input?.parentElement?.querySelector('[role="button"]');
      if (zone) zone.focus();
      return;
    }

    document.getElementById(target)?.focus();
  }, [errors]);

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
    if (submitLock.current) return;
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

    const order = [
      "title",
      "title_km",
      "topic",
      "timeline",
      "content",
      "image",
      "source",
      "price_index",
      "keywords",
    ];
    const firstInvalid = order.find((key) => newErrors[key]);
    focusTarget.current = firstInvalid || null;

    setErrors(newErrors);
    if (firstInvalid) return;

    submitLock.current = true;
    setIsSubmitting(true);

    try {
      const supabase = createClient();

      if (isEdit) {
        await updateExistingEntry({
          supabase,
          user,
          entryId,
          trimmed,
          photoFile,
          existingImageConfig: initialData?.image_config || null,
        });
        router.push("/my-entries");
      } else {
        await uploadAndCreateEntry({
          supabase,
          user,
          trimmed,
          photoFile,
          pairSlug,
        });
        setSubmittedSuccess(true);
      }
    } catch (err) {
      submitLock.current = false;
      setIsSubmitting(false);
      console.error(isEdit ? "Update entry failed:" : "Contribution submission failed:", err);

      if (err?.message === "UNAUTHORIZED") {
        setFormError(
          "Your session has expired, so this wasn't saved. Your draft is still in this form — sign in again in another tab, then save here."
        );
      } else if (err?.message === "NOT_SAVED" && !isEdit && pairSlug) {
        setFormError(
          "That change wasn't saved. Your draft is still in this form. This can happen when the year is missing or not four digits, or when that story already has an entry for that era — check the year, then save again."
        );
      } else if (err?.message === "NOT_SAVED") {
        setFormError(
          "That change wasn't saved. Your draft is still in this form — check your connection and save again."
        );
      } else {
        setFormError(
          "Failed to save entry. Your draft is still in this form — check your connection and save again."
        );
      }
    }
  }

  return {
    submittedSuccess,
    content,
    setContent,
    errors,
    formError,
    isSubmitting,
    errorCount: Object.values(errors).filter(Boolean).length,
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
