import { NextRequest, NextResponse } from "next/server";
import seedChapters from "@/lib/pyqChaptersSeed.json";

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

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ chapterId: string }> }
) {
  const { chapterId } = await params;
  const idNum = parseInt(chapterId);

  if (!idNum || isNaN(idNum)) {
    return NextResponse.json({ success: false, error: "Invalid chapter ID" }, { status: 400 });
  }

  try {
    const token = await getAdminToken();
    let pyqs: any[] = [];

    try {
      const res = await fetch(
        `https://api.indraprasthaneetacademy.com/api/admin/chapters/${idNum}/pyqs`,
        {
          headers: { Authorization: `Bearer ${token}` },
          cache: "no-store",
        }
      );
      if (res.ok) {
        const data = await res.json();
        pyqs = data.pyqs || [];
      }
    } catch (_) {}

    // If empty or failed, fallback to practice set questions for this chapter
    if (pyqs.length === 0) {
      try {
        const seedItem = (seedChapters as any[])?.find(
          (c) => c.id === idNum || c.chapter_id === idNum
        );
        const searchTitle = seedItem?.title || "";

        const setsRes = await fetch(
          "https://api.indraprasthaneetacademy.com/api/admin/practice-sets",
          {
            headers: { Authorization: `Bearer ${token}` },
            cache: "no-store",
          }
        );
        if (setsRes.ok) {
          const setsData = await setsRes.json();
          const sets: any[] = setsData.practiceSets || [];
          const clean = (s: string) => (s || "").toLowerCase().replace(/[^a-z0-9]/g, "");
          const matchedSet = sets.find((s) => {
            const sTitle = clean(s.title);
            const target = clean(searchTitle);
            return (
              sTitle === target ||
              clean(s.topic) === target ||
              (target && sTitle.includes(target)) ||
              (target && target.includes(sTitle))
            );
          });

          if (matchedSet) {
            const qsRes = await fetch(
              `https://api.indraprasthaneetacademy.com/api/admin/practice-sets/${matchedSet.id}/questions`,
              {
                headers: { Authorization: `Bearer ${token}` },
                cache: "no-store",
              }
            );
            if (qsRes.ok) {
              const qsData = await qsRes.json();
              pyqs = (qsData.questions || []).map((q: any) => ({
                ...q,
                chapter_id: idNum,
                year_label: q.year_label || "NEET",
              }));
            }
          }
        }
      } catch (_) {}
    }

    return NextResponse.json({
      success: true,
      chapter_id: idNum,
      pyqs,
      count: pyqs.length,
    });
  } catch (error: any) {
    console.error(`Failed to load PYQs for chapter ${chapterId}:`, error);
    return NextResponse.json({
      success: true,
      chapter_id: idNum,
      pyqs: [],
      count: 0,
    });
  }
}
