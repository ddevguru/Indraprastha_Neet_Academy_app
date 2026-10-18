/**
 * Utilities for resolving Google Drive & YouTube image and video URLs for web rendering,
 * perfectly matching Flutter mobile application's drive_image_url.dart and FastNetworkImage.
 */

export function extractDriveFileId(raw?: string | null): string | null {
  if (!raw) return null;
  const trimmed = raw.trim();
  if (!trimmed) return null;

  try {
    const url = new URL(trimmed);

    // 1. Path segment 'images/<fileId>' (API proxy pattern)
    const segments = url.pathname.split("/").filter(Boolean);
    const imgIdx = segments.indexOf("images");
    if (imgIdx >= 0 && imgIdx + 1 < segments.length) {
      const id = segments[imgIdx + 1];
      if (id && id.length >= 10) return id;
    }

    // 2. Query param ?id=<fileId>
    const idParam = url.searchParams.get("id");
    if (idParam && idParam.length >= 10) return idParam;

    // 3. /file/d/<fileId>
    const fileIdx = segments.indexOf("file");
    if (fileIdx >= 0 && segments[fileIdx + 1] === "d" && segments[fileIdx + 2]) {
      return segments[fileIdx + 2];
    }

    // 4. /d/<fileId>
    const dIdx = segments.indexOf("d");
    if (dIdx >= 0 && segments[dIdx + 1]) {
      return segments[dIdx + 1];
    }
  } catch {
    // Regex fallbacks
    const mImages = trimmed.match(/\/images\/([a-zA-Z0-9_-]+)/);
    if (mImages && mImages[1]) return mImages[1];

    const m = trimmed.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (m && m[1]) return m[1];

    const m2 = trimmed.match(/[?&]id=([a-zA-Z0-9_-]+)/);
    if (m2 && m2[1]) return m2[1];
  }

  // If raw string itself is an ID (alphanumeric 20-50 chars)
  if (/^[a-zA-Z0-9_-]{25,50}$/.test(trimmed)) {
    return trimmed;
  }

  return null;
}

/**
 * Resolves any image URL to a directly renderable web image URL.
 * Prefers Google CDN (lh3.googleusercontent.com) and Google Drive thumbnails
 * which render with 200 OK directly in all browsers without 401 Authorization issues.
 */
export function resolveImageUrl(raw?: string | null, width: number = 900): string {
  if (!raw) return "";
  const trimmed = raw.trim();
  if (!trimmed) return "";

  const driveId = extractDriveFileId(trimmed);
  if (driveId) {
    // Google's direct CDN works globally in all web browsers without auth headers
    return `https://lh3.googleusercontent.com/d/${driveId}`;
  }

  // Non-drive direct image links (e.g. Cloudinary, Firebase)
  return trimmed;
}

/**
 * Alternative fallback URLs for images if primary fails
 */
export function getDriveImageFallbackUrls(raw?: string | null, width: number = 900): string[] {
  const driveId = extractDriveFileId(raw);
  if (!driveId) return raw ? [raw] : [];

  return [
    `https://lh3.googleusercontent.com/d/${driveId}`,
    `https://drive.google.com/thumbnail?id=${driveId}&sz=w${width}`,
    `https://drive.google.com/uc?export=view&id=${driveId}`,
  ];
}

export function extractYouTubeVideoId(url?: string | null): string | null {
  if (!url) return null;
  const trimmed = url.trim();
  if (!trimmed) return null;

  try {
    if (trimmed.includes("youtu.be/")) {
      return trimmed.split("youtu.be/")[1]?.split(/[?#]/)[0] || null;
    }
    const u = new URL(trimmed);
    const v = u.searchParams.get("v");
    if (v) return v;

    const parts = u.pathname.split("/").filter(Boolean);
    const embedIdx = parts.indexOf("embed");
    if (embedIdx >= 0 && parts[embedIdx + 1]) return parts[embedIdx + 1];
  } catch {
    const m = trimmed.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    if (m && m[1]) return m[1];
  }

  return null;
}

export function resolveVideoEmbedUrl(raw?: string | null): string {
  if (!raw) return "";
  const trimmed = raw.trim();
  if (!trimmed) return "";

  // YouTube
  const ytId = extractYouTubeVideoId(trimmed);
  if (ytId) {
    return `https://www.youtube-nocookie.com/embed/${ytId}?autoplay=1&rel=0&modestbranding=1`;
  }

  // Google Drive
  const driveId = extractDriveFileId(trimmed);
  if (driveId) {
    return `https://drive.google.com/file/d/${driveId}/preview`;
  }

  return trimmed;
}

/**
 * Parses and validates if a question has a valid similar_question added by admin.
 * Matches Flutter app's:
 *   final rawSim = question['similar_question'];
 *   if (similarQuestion == null || similarQuestion['question'].isEmpty) -> No similar question
 */
export function parseSimilarQuestion(rawSim: any): {
  question: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_option: string;
  explanation?: string;
  question_image_link?: string;
  explanation_image_link?: string;
} | null {
  if (!rawSim) return null;

  let sq = rawSim;
  if (typeof rawSim === "string") {
    const trimmed = rawSim.trim();
    if (!trimmed || trimmed === "null" || trimmed === "{}") return null;
    try {
      sq = JSON.parse(trimmed);
    } catch {
      return null;
    }
  }

  if (typeof sq === "object" && sq !== null) {
    const qText = (sq.question || sq.question_text || "").toString().trim();
    if (qText.length > 0) {
      return {
        question: qText,
        option_a: (sq.option_a || sq.optionA || "").toString(),
        option_b: (sq.option_b || sq.optionB || "").toString(),
        option_c: (sq.option_c || sq.optionC || "").toString(),
        option_d: (sq.option_d || sq.optionD || "").toString(),
        correct_option: (sq.correct_option || sq.correctOption || sq.correct_answer || "A")
          .toString()
          .toUpperCase()
          .trim(),
        explanation: (sq.explanation || "").toString(),
        question_image_link: (
          sq.question_image_link ||
          sq.questionImageLink ||
          sq.image_url ||
          sq.question_image ||
          ""
        ).toString(),
        explanation_image_link: (
          sq.explanation_image_link ||
          sq.explanationImageLink ||
          sq.explanation_image ||
          ""
        ).toString(),
      };
    }
  }

  return null;
}
