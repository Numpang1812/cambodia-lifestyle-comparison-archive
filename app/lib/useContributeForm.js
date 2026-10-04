"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "./supabase/client";
import { uploadAndCreateEntry } from "./contribute-submit";
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

export function useContributeForm(user) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [titleKm, setTitleKm] = useState("");
  const [content, setContent] = useState("");
  const [timeline, setTimeline] = useState("");
  const [topic, setTopic] = useState("");
  const [source, setSource] = useState("");
  const [priceIndex, setPriceIndex] = useState("");
  const [keywords, setKeywords] = useState("");
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);

  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleFileSelect(e) {
    const file = e.target.files?.[0] || null;
    setPhotoFile(file);
    setPhotoPreview(file ? URL.createObjectURL(file) : null);
    if (file) setErrors((prev) => ({ ...prev, image: validateImage(file) }));
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

    const newErrors = {
      title: validateTitle(trimmed.title),
      title_km: validateTitleKm(trimmed.titleKm),
      content: validateContent(trimmed.content),
      timeline: validateTimeline(trimmed.timeline),
      topic: validateTopic(trimmed.topic),
      source: validateSource(trimmed.source),
      price_index: validatePriceIndex(trimmed.priceIndex),
      image: validateImage(photoFile),
      keywords: validateKeywords(trimmed.keywords),
    };

    setErrors(newErrors);
    if (Object.values(newErrors).some(Boolean)) return;

    setIsSubmitting(true);
    const supabase = createClient();

    try {
      const inserted = await uploadAndCreateEntry({
        supabase,
        user,
        trimmed,
        photoFile,
      });
      const newId = inserted?.id || "";
      router.push(newId ? `/?entry=${newId}` : "/");
    } catch (err) {
      console.error("Contribution submission failed:", err);
      setFormError("Failed to save entry. Please check your network and try again.");
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
