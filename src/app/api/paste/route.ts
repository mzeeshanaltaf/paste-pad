import { createPaste } from "@/lib/webhook";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { paste_title, paste_text } = body;

    if (!paste_text || !paste_text.trim()) {
      return NextResponse.json(
        { success: false, error: "Text is required" },
        { status: 400 }
      );
    }

    const paste = await createPaste(paste_title || "", paste_text);

    return NextResponse.json({ success: true, data: paste });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to create paste" },
      { status: 500 }
    );
  }
}
