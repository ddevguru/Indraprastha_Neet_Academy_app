function normalizeTestCategory({ title = '', category = '', subject = '', topic = '' } = {}) {
  const cat = (category || '').toString().trim();
  const ttl = (title || '').toString().trim();
  const top = (topic || '').toString().trim();
  const sub = (subject || '').toString().trim();

  const lowerCat = cat.toLowerCase();
  const lowerTtl = ttl.toLowerCase();
  const lowerTop = top.toLowerCase();
  const lowerSub = sub.toLowerCase();

  // 1. Explicit title pattern checks (highest accuracy for acronyms like TST, ST, CT, GT)
  const titleIsSubject = /^(tst|st|sub|subject)[-_\s0-9:]|\b(tst|st|subject|sub-test|sub\s+test|subjectwise|subject-wise)\b/i.test(ttl);
  const titleIsChapter = /^(ct|chapter)[-_\s0-9:]|\b(ct|chapter|chapterwise|chapter-wise)\b/i.test(ttl);
  const titleIsGrand = /^(gt|flt|fmt|grand)[-_\s0-9:]|\b(gt|grand|full\s*syllabus|flt|fmt|full\s*mock)\b/i.test(ttl);

  if (titleIsSubject && !titleIsGrand) return 'Subject test';
  if (titleIsChapter && !titleIsGrand) return 'Chapter test';
  if (titleIsGrand && !titleIsSubject) return 'Grand test';

  // 2. Explicit category checks
  if (cat.length > 0) {
    if (lowerCat.includes('subject') || lowerCat.includes('tst') || /\b(st|tst)\b/i.test(lowerCat)) {
      return 'Subject test';
    }
    if (lowerCat.includes('chapter') || lowerCat.includes('ct') || /\bct\b/i.test(lowerCat)) {
      return 'Chapter test';
    }
    if (lowerCat.includes('grand') || lowerCat.includes('gt') || lowerCat.includes('full syllabus') || /\bgt\b/i.test(lowerCat)) {
      return 'Grand test';
    }
  }

  // 3. Search combined text
  const combined = `${lowerCat} ${lowerTtl} ${lowerTop} ${lowerSub}`;
  if (/\b(tst|st|subject|sub-test|sub\s+test|subjectwise)\b/i.test(combined)) {
    return 'Subject test';
  }
  if (/\b(ct|chapter|chapterwise)\b/i.test(combined)) {
    return 'Chapter test';
  }
  if (/\b(gt|grand|full\s*syllabus|flt|fmt)\b/i.test(combined)) {
    return 'Grand test';
  }

  return 'Grand test';
}

function getCategoryType(categoryName) {
  const norm = normalizeTestCategory({ category: categoryName });
  if (norm === 'Subject test') return 'subject';
  if (norm === 'Chapter test') return 'chapter';
  return 'grand';
}

module.exports = {
  normalizeTestCategory,
  getCategoryType,
};
