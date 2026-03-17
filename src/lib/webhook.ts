import { cache } from "react";
import { Paste } from "./types";

const WEBHOOK_URL = process.env.N8N_WEBHOOK_URL!;
const API_KEY = process.env.N8N_API_KEY!;
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL!;

export async function createPaste(
  title: string,
  text: string
): Promise<Paste> {
  const res = await fetch(WEBHOOK_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
    },
    body: JSON.stringify({
      event_type: "create_paste",
      paste_title: title,
      paste_text: text,
    }),
  });

  if (!res.ok) {
    throw new Error(`Failed to create paste: ${res.status}`);
  }

  const data: Paste[] = await res.json();
  return data[0];
}

export const getPaste = cache(async function getPaste(pasteCode: string): Promise<Paste | null> {
  try {
    const res = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
      },
      body: JSON.stringify({
        event_type: "get_paste",
        paste_url: `${SITE_URL}/${pasteCode}`,
      }),
    });

    if (!res.ok) return null;

    const data: Paste[] = await res.json();
    return data.length > 0 ? data[0] : null;
  } catch {
    return null;
  }
});
