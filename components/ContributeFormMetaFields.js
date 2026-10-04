"use client";

import ContributeTextField from "./ContributeTextField";
import ContributeSelectField from "./ContributeSelectField";

export default function ContributeFormMetaFields({
  title,
  setTitle,
  titleKm,
  setTitleKm,
  topic,
  setTopic,
  timeline,
  setTimeline,
  errors,
}) {
  return (
    <>
      <ContributeTextField
        id="title"
        label="TITLE (EN)"
        value={title}
        onChange={setTitle}
        error={errors.title}
        placeholder="e.g. Steel Frames, Cyclos & Early Two-Strokes"
        required
      />

      <ContributeTextField
        id="title_km"
        label="TITLE (ខ្មែរ / KHMER)"
        value={titleKm}
        onChange={setTitleKm}
        error={errors.title_km}
        placeholder="e.g. កង់តួដែកធ្ងន់ ស៊ីក្លូ និងម៉ូតូកន្ត្រាក់ជំនាន់ដំបូង"
        required
      />

      <ContributeSelectField
        id="topic"
        label="TOPIC"
        value={topic}
        onChange={setTopic}
        error={errors.topic}
        required
      />

      <ContributeTextField
        id="timeline"
        label="TIMELINE (YEAR)"
        value={timeline}
        onChange={setTimeline}
        error={errors.timeline}
        placeholder="e.g. 1985 or 2024"
        required
      />
    </>
  );
}
