import { NextRequest, NextResponse } from "next/server";
import { fetchAdmin } from "@/lib/adminApi";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ testId: string }> }
) {
  const { testId } = await params;
  const idNum = parseInt(testId);

  if (!idNum || isNaN(idNum)) {
    return NextResponse.json({ success: false, error: "Invalid test ID" }, { status: 400 });
  }

  try {
    const res = await fetchAdmin(`/admin/tests/${idNum}/questions`);
    if (!res.ok) {
      return NextResponse.json(
        { success: false, error: `Failed to fetch test questions: ${res.status}` },
        { status: res.status }
      );
    }

    const data = await res.json();
    const questions = data.questions || [];

    // Also get test metadata
    let test = data.test || data.test_details || null;
    if (!test) {
      try {
        const testsRes = await fetchAdmin("/admin/tests");
        if (testsRes.ok) {
          const testsData = await testsRes.json();
          const list: any[] = testsData.tests || testsData || [];
          test = list.find((t) => Number(t.id) === idNum) || null;
        }
      } catch {
        // ignore
      }
    }

    return NextResponse.json({
      success: true,
      test,
      questions,
      count: questions.length,
    });
  } catch (error: any) {
    console.error(`Failed to load questions for test ${testId}:`, error);
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to load test questions" },
      { status: 500 }
    );
  }
}
