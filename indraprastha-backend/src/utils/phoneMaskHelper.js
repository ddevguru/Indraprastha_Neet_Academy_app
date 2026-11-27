/**
 * Masks phone numbers in text so students and teachers cannot share
 * phone numbers in Community chat, doubts, replies, or whiteboards.
 * Preserves normal scientific/mathematical numbers (e.g., 6.022, 1800, 4.1).
 */

function countDigits(str) {
  let count = 0;
  for (let i = 0; i < str.length; i++) {
    const code = str.charCodeAt(i);
    if (code >= 48 && code <= 57) count++;
  }
  return count;
}

function maskPhoneNumbers(input) {
  if (input === null || input === undefined) return input;
  const text = String(input);
  if (!text.trim()) return text;

  let result = text;

  // 1. Match sequences of digits with optional country code (+91, 0) and separators
  //    (spaces, hyphens, dots, underscores, slashes, parentheses, asterisks).
  result = result.replace(
    /(?:\+?\d{1,3}[\s\-._/*()]*)?(?:\(?\d{1,5}\)?[\s\-._/*()]*){2,15}\d{1,5}/g,
    (match) => {
      const digits = countDigits(match);
      if (digits < 7 || digits > 15) return match;

      // Avoid masking pure scientific constants like 3.14159265 (single dot, no +, no spaces)
      const hasSingleDotOnly = /^[\d]+\.[\d]+$/.test(match.trim());
      if (hasSingleDotOnly && digits < 10) return match;

      return '[Phone Number Hidden]';
    }
  );

  // 2. Catch plain contiguous 7 to 15 digit numbers (e.g. 9876543210, 09876543210)
  result = result.replace(/\b\+?\d{7,15}\b/g, '[Phone Number Hidden]');

  // 3. Catch consecutive number words (7+ words like "nine eight seven six five four three two one zero")
  result = result.replace(
    /\b(?:zero|one|two|three|four|five|six|seven|eight|nine|oh)(?:[\s,\-]+(?:zero|one|two|three|four|five|six|seven|eight|nine|oh)){6,14}\b/gi,
    '[Phone Number Hidden]'
  );

  return result;
}

function containsPhoneNumber(input) {
  if (!input) return false;
  const text = String(input);
  return maskPhoneNumbers(text) !== text;
}

/**
 * Recursively masks phone numbers in whiteboard JSON (text/label/title/content/note nodes)
 */
function maskWhiteboardJson(doc) {
  if (!doc) return doc;
  if (typeof doc === 'string') {
    try {
      const parsed = JSON.parse(doc);
      return JSON.stringify(maskWhiteboardJson(parsed));
    } catch (_) {
      return maskPhoneNumbers(doc);
    }
  }
  if (Array.isArray(doc)) {
    return doc.map(maskWhiteboardJson);
  }
  if (typeof doc === 'object') {
    const out = {};
    for (const [k, v] of Object.entries(doc)) {
      if (
        typeof v === 'string' &&
        (k === 'text' || k === 'label' || k === 'title' || k === 'content' || k === 'note')
      ) {
        out[k] = maskPhoneNumbers(v);
      } else if (typeof v === 'object' && v !== null) {
        out[k] = maskWhiteboardJson(v);
      } else {
        out[k] = v;
      }
    }
    return out;
  }
  return doc;
}

module.exports = {
  maskPhoneNumbers,
  containsPhoneNumber,
  maskWhiteboardJson,
};

