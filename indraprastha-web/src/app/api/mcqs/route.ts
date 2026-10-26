import { NextResponse } from "next/server";
import { fetchAdmin } from "@/lib/adminApi";

let cachedMcqs: any[] | null = null;
let cacheTime = 0;
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes

export async function GET() {
  const now = Date.now();
  if (cachedMcqs && now - cacheTime < CACHE_TTL) {
    return NextResponse.json({
      success: true,
      mcqs: cachedMcqs,
      total: cachedMcqs.length,
      cached: true,
    });
  }

  try {
    const res = await fetchAdmin("/admin/mcqs");
    if (!res.ok) {
      throw new Error(`Failed to fetch daily mcqs: ${res.status}`);
    }

    const data = await res.json();
    const mcqs = data.mcqs || data || [];

    cachedMcqs = mcqs;
    cacheTime = now;

    return NextResponse.json({
      success: true,
      mcqs,
      total: mcqs.length,
    });
  } catch (error: any) {
    console.error("Failed to load daily mcqs:", error);
    if (cachedMcqs) {
      return NextResponse.json({
        success: true,
        mcqs: cachedMcqs,
        total: cachedMcqs.length,
        fallback: true,
      });
    }
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to load daily mcqs" },
      { status: 500 }
    );
  }
}
