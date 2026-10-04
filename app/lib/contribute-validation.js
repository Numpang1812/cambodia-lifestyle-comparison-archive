// Validation rules for contribute form based on Tuesday specifications

export const VALID_TOPICS = [
  "Commute & Mobility",
  "Morning Routine & School Prep",
  "Free Time, Entertainment & Side Hustles",
  "Street Food & Cost of Living",
  "Romance & Dating Culture",
];

export function validateTitle(val) {
  if (!val || val.length < 5) return "Minimum 5 characters required.";
  if (val.length > 100) return "Maximum 100 characters allowed.";
  // No symbols allowed other than (! : ? ‘ ’ ' " “ ”)
  const allowed = /^[a-zA-Z0-9\s!:?'‘’"“”]+$/;
  if (!allowed.test(val)) {
    return "No symbols allowed other than (! : ? ‘ ’ \" “ ”).";
  }
  return null;
}

export function validateTitleKm(val) {
  if (!val) return "Khmer title is required.";
  if (val.length > 120) return "Maximum 120 characters allowed.";
  const kmLetters = val.match(/[\u1780-\u17D3\u17D7\u17DC\u17DD]/g);
  if (!kmLetters || kmLetters.length < 5) {
    return "Minimum 5 Khmer characters required.";
  }
  // No symbols allowed other than (! : ? ។)
  const allowedKm = /^[\u1780-\u17FF\s!:?។]+$/;
  if (!allowedKm.test(val)) {
    return "No symbols allowed other than (! : ? ។).";
  }
  return null;
}

export function validateContent(val) {
  if (!val || val.length < 50) return "Minimum 50 characters required.";
  if (val.length > 6000) return "Maximum 6000 characters allowed.";
  if (!/\s/.test(val)) return "Content must have at least 1 space.";
  return null;
}

export function validateTimeline(val) {
  if (!val) return "Timeline is required.";
  if (!/^(18|19|20)\d{2}$/.test(val)) {
    return "Must be 4 digits starting with 18, 19, or 20 (e.g. 1980 or 2024).";
  }
  return null;
}

export function validateTopic(val) {
  if (!val || !VALID_TOPICS.includes(val)) {
    return "Must be 1 of the 5 archive topics.";
  }
  return null;
}

export function validateSource(val) {
  if (!val || val.length < 3) return "Minimum 3 characters required.";
  if (val.length > 100) return "Maximum 100 characters allowed.";
  // No special characters (letters, numbers, spaces only)
  if (!/^[a-zA-Z0-9\u1780-\u17FF\s]+$/.test(val)) {
    return "No special characters allowed.";
  }
  return null;
}

export function validatePriceIndex(val) {
  if (!val || val === "") return null; // Can be null
  if (val.length > 30) return "Maximum 30 digits allowed.";
  if (!/^\d+$/.test(val)) return "Digits only, no special characters.";
  return null;
}

export function validateImage(file) {
  if (!file) return "Photo is required.";
  if (file.size > 5 * 1024 * 1024) return "Photo must be below 5MB.";
  const ext = (file.name.split(".").pop() || "").toLowerCase();
  const allowedExts = ["jpeg", "jpg", "png", "webp", "web"];
  if (!allowedExts.includes(ext)) {
    return "Must be jpeg, jpg, webp, or png.";
  }
  const allowedMimes = ["image/jpeg", "image/png", "image/webp"];
  if (file.type && !allowedMimes.includes(file.type)) {
    return "Invalid photo type.";
  }
  return null;
}

export function validateKeywords(val) {
  if (!val || val === "") return null; // Can be null
  try {
    JSON.parse(val);
    return null;
  } catch (_) {
    return "Must be valid .json format.";
  }
}
