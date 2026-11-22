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
  validateImage,
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
  const [artwork, setArtwork] = useState(initialData?.image_config?.artwork || "");
  const savedDesign = initialData?.image_config?.design;
  const [design, setDesign] = useState([2, 3].includes(savedDesign) ? savedDesign : 1);
  const [source, setSource] = useState(
    Array.isArray(initialData?.source) ? initialData.source[0] || "" : initialData?.source || ""
  );
  const savedKeywords = initialData?.keywords;
  const [keywordEdit, setKeywords] = useState(null);
  const keywords = keywordEdit ?? {
    tags: Array.isArray(savedKeywords)
      ? savedKeywords.map(String)
      : typeof savedKeywords === "string"
        ? savedKeywords.match(/\S+/gu) || []
        : [],
    draft: "",
  };
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
    setErrors((prev) => ({ ...prev, image: file ? validateImage(file) : null }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (submitLock.current) return;
    setFormError("");

    const words = [...keywords.tags, ...(keywords.draft.match(/\S+/gu) || [])];
    const trimmed = {
      title: title.trim(),
      titleKm: titleKm.trim(),
      content: content.trim(),
      timeline: timeline.trim(),
      topic: topic.trim(),
      artwork,
      design,
      source: source.trim(),
      keywords:
        isEdit && !keywordEdit && savedKeywords != null
          ? JSON.stringify(savedKeywords)
          : words.length
            ? JSON.stringify(words)
            : "",
    };

    const imageError = photoFile ? validateImage(photoFile) : null;

    const newErrors = {
      title: validateTitle(trimmed.title),
      title_km: validateTitleKm(trimmed.titleKm),
      content: validateContent(trimmed.content),
      timeline: validateTimeline(trimmed.timeline),
      topic: validateTopic(trimmed.topic),
      artwork: artwork ? validateTopic(artwork) : null,
      source: validateSource(trimmed.source),
      image: imageError,
    };

    const order = [
      "title",
      "title_km",
      "topic",
      "artwork",
      "timeline",
      "content",
      "image",
      "source",
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
      artwork,
      setArtwork,
      design,
      setDesign,
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
      keywords,
      setKeywords,
      errors,
      isSubmitting,
    },
  };
}
