import { NextResponse } from "next/server";
import { fetchAdmin } from "@/lib/adminApi";

interface PracticeSetItem {
  id: number;
  batch_id?: number;
  class_label: string;
  subject: string;
  title: string;
  topic: string;
  difficulty?: string;
  estimated_minutes?: number;
  question_count?: number;
  source_type?: string;
  batch_name?: string;
  is_completed?: boolean;
  last_accuracy?: string;
}

let cachedPracticeSets: PracticeSetItem[] | null = null;
let cacheTime = 0;
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes

export async function GET() {
  const now = Date.now();
  if (cachedPracticeSets && now - cacheTime < CACHE_TTL) {
    return NextResponse.json({
      success: true,
      practiceSets: cachedPracticeSets,
      total: cachedPracticeSets.length,
      cached: true,
    });
  }

  try {
    const res = await fetchAdmin("/admin/practice-sets");
    if (!res.ok) {
      throw new Error(`Failed to fetch practice sets: ${res.status}`);
    }

    const data = await res.json();
    const rawSets: any[] = data.practiceSets || data || [];

    // Filter to valid sets
    const sets: PracticeSetItem[] = rawSets.map((s) => ({
      id: Number(s.id),
      batch_id: s.batch_id,
      class_label: s.class_label || "Class 11",
      subject: s.subject || "Physics",
      title: s.title || s.name || "Practice Set",
      topic: s.topic || s.title || "Topic Practice",
      difficulty: s.difficulty || "Moderate",
      estimated_minutes: s.estimated_minutes || 20,
      question_count: Number(s.question_count || s.total_questions || 0),
      source_type: s.source_type,
      batch_name: s.batch_name,
    }));

    // If question_count is not provided by backend, fetch in parallel batches
    const setsNeedingCounts = sets.filter((s) => !s.question_count);
    if (setsNeedingCounts.length > 0) {
      const batchSize = 15;
      for (let i = 0; i < setsNeedingCounts.length; i += batchSize) {
        const batch = setsNeedingCounts.slice(i, i + batchSize);
        await Promise.all(
          batch.map(async (set) => {
            try {
              const qRes = await fetchAdmin(`/admin/practice-sets/${set.id}/questions`);
              if (qRes.ok) {
                const qData = await qRes.json();
                set.question_count = Array.isArray(qData.questions) ? qData.questions.length : 0;
              }
            } catch {
              // keep fallback 0
            }
          })
        );
      }
    }

    cachedPracticeSets = sets;
    cacheTime = now;

    return NextResponse.json({
      success: true,
      practiceSets: sets,
      total: sets.length,
    });
  } catch (error: any) {
    console.error("Failed to load practice sets:", error);
    if (cachedPracticeSets) {
      return NextResponse.json({
        success: true,
        practiceSets: cachedPracticeSets,
        total: cachedPracticeSets.length,
        fallback: true,
      });
    }
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to load practice sets" },
      { status: 500 }
    );
  }
}
