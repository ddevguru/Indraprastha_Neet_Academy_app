import { NextResponse } from "next/server";
import { fetchAdmin } from "@/lib/adminApi";

let cachedTests: any[] | null = null;
let cacheTime = 0;
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes

export async function GET() {
  const now = Date.now();
  if (cachedTests && now - cacheTime < CACHE_TTL) {
    return NextResponse.json({
      success: true,
      tests: cachedTests,
      total: cachedTests.length,
      cached: true,
    });
  }

  try {
    const res = await fetchAdmin("/admin/tests");
    if (!res.ok) {
      throw new Error(`Failed to fetch tests: ${res.status}`);
    }

    const data = await res.json();
    const tests = data.tests || data || [];

    cachedTests = tests;
    cacheTime = now;

    return NextResponse.json({
      success: true,
      tests,
      total: tests.length,
    });
  } catch (error: any) {
    console.error("Failed to load tests:", error);
    if (cachedTests) {
      return NextResponse.json({
        success: true,
        tests: cachedTests,
        total: cachedTests.length,
        fallback: true,
      });
    }
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to load tests" },
      { status: 500 }
    );
  }
}
