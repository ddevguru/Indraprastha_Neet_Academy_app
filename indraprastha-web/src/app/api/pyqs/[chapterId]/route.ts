import { NextRequest, NextResponse } from "next/server";

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
    const res = await fetch(
      `https://api.indraprasthaneetacademy.com/api/admin/chapters/${idNum}/pyqs`,
      {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
      }
    );

    if (!res.ok) {
      return NextResponse.json(
        { success: false, error: `Failed to fetch chapter questions: ${res.status}` },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json({
      success: true,
      chapter_id: idNum,
      pyqs: data.pyqs || [],
      count: (data.pyqs || []).length,
    });
  } catch (error: any) {
    console.error(`Failed to load PYQs for chapter ${chapterId}:`, error);
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to load chapter PYQs" },
      { status: 500 }
    );
  }
}
