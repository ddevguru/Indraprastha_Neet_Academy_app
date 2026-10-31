import { NextResponse } from "next/server";

import seedChapters from "@/lib/pyqChaptersSeed.json";

interface ChapterItem {
  id: number;
  book_id: number;
  title: string;
  topic: string;
  subject: string;
  class_label: string;
  question_count: number;
  order_index: number;
}

// In-memory cache initialized with compiled seed catalog for instant response
let cachedChapters: ChapterItem[] = (seedChapters as unknown as ChapterItem[]) || [];
let cacheTime = 0;
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes

async function getAdminToken(): Promise<string> {
  const loginRes = await fetch("https://api.indraprasthaneetacademy.com/api/admin/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: "indraprasthaadmin", password: "indraprastha@123" }),
    cache: "no-store",
  });
  if (!loginRes.ok) {
    throw new Error(`Admin login failed: ${loginRes.status}`);
  }
  const data = await loginRes.json();
  return data.token;
}

export async function GET() {
  const now = Date.now();
  // If cached and fresh, return immediately
  if (cachedChapters && cachedChapters.length > 0 && now - cacheTime < CACHE_TTL) {
    return NextResponse.json({ success: true, chapters: cachedChapters, cached: true });
  }

  try {
    const token = await getAdminToken();

    // 1. Fetch all books
    const booksRes = await fetch("https://api.indraprasthaneetacademy.com/api/admin/books", {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    if (!booksRes.ok) {
      throw new Error(`Failed to fetch books: ${booksRes.status}`);
    }
    const booksData = await booksRes.json();
    const books: any[] = booksData.books || [];

    // 2. Fetch chapters for all books in concurrent batches
    const batchSize = 15;
    const allChapters: ChapterItem[] = [];

    for (let i = 0; i < books.length; i += batchSize) {
      const batch = books.slice(i, i + batchSize);
      const batchResults = await Promise.all(
        batch.map(async (book) => {
          try {
            const chRes = await fetch(
              `https://api.indraprasthaneetacademy.com/api/admin/books/${book.id}/chapters`,
              {
                headers: { Authorization: `Bearer ${token}` },
                cache: "no-store",
              }
            );
            if (!chRes.ok) return [];
            const chData = await chRes.json();
            const chapters: any[] = chData.chapters || [];
            return chapters.map((ch) => ({
              id: ch.id,
              book_id: book.id,
              title: ch.title || book.topic || book.title || "Chapter",
              topic: book.topic || ch.title || "",
              subject: book.subject || "General",
              class_label: book.class_label || "Class 11",
              question_count: Number(ch.linked_pyq_count) || 0,
              order_index: Number(ch.order_index ?? ch.id),
            }));
          } catch {
            return [];
          }
        })
      );

      for (const list of batchResults) {
        allChapters.push(...list);
      }
    }

    // Sort chapters by Class (Class 11 then Class 12), then Subject, then order_index / id
    allChapters.sort((a, b) => {
      if (a.class_label !== b.class_label) {
        return a.class_label.localeCompare(b.class_label);
      }
      if (a.subject !== b.subject) {
        return a.subject.localeCompare(b.subject);
      }
      return a.id - b.id;
    });

    cachedChapters = allChapters;
    cacheTime = now;

    return NextResponse.json({ success: true, chapters: allChapters, total: allChapters.length });
  } catch (error: any) {
    console.error("Failed to load PYQ chapters:", error);
    // If cache exists even if expired, return it as fallback
    if (cachedChapters) {
      return NextResponse.json({ success: true, chapters: cachedChapters, fallback: true });
    }
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to load PYQ chapters" },
      { status: 500 }
    );
  }
}
