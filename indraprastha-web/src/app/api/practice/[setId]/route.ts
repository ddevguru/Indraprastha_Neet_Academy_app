import { NextRequest, NextResponse } from "next/server";
import { fetchAdmin } from "@/lib/adminApi";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ setId: string }> }
) {
  const { setId } = await params;
  const idNum = parseInt(setId);

  if (!idNum || isNaN(idNum)) {
    return NextResponse.json({ success: false, error: "Invalid practice set ID" }, { status: 400 });
  }

  try {
    const res = await fetchAdmin(`/admin/practice-sets/${idNum}/questions`);
    if (!res.ok) {
      return NextResponse.json(
        { success: false, error: `Failed to fetch practice set questions: ${res.status}` },
        { status: res.status }
      );
    }

    const data = await res.json();
    const questions = data.questions || [];

    // Also try to get set metadata
    let practiceSet = data.practiceSet || data.practice_set || null;
    if (!practiceSet) {
      try {
        const setsRes = await fetchAdmin("/admin/practice-sets");
        if (setsRes.ok) {
          const setsData = await setsRes.json();
          const list: any[] = setsData.practiceSets || setsData || [];
          practiceSet = list.find((s) => Number(s.id) === idNum) || null;
        }
      } catch {
        // ignore
      }
    }

    return NextResponse.json({
      success: true,
      practiceSet,
      questions,
      count: questions.length,
    });
  } catch (error: any) {
    console.error(`Failed to load questions for practice set ${setId}:`, error);
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to load practice questions" },
      { status: 500 }
    );
  }
}
