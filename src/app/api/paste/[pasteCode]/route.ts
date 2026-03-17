import { getPaste } from "@/lib/webhook";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ pasteCode: string }> }
) {
  const { pasteCode } = await params;
  const paste = await getPaste(pasteCode);

  if (!paste) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(paste);
}
