import { getPaste } from "@/lib/webhook";
import { notFound } from "next/navigation";
import PasteView from "@/components/PasteView";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ pasteCode: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { pasteCode } = await params;
  const paste = await getPaste(pasteCode);
  return {
    title: paste ? `${paste.paste_title || "Untitled"} - Paste Pad` : "Not Found - Paste Pad",
  };
}

export default async function PastePage({ params }: Props) {
  const { pasteCode } = await params;
  const paste = await getPaste(pasteCode);

  if (!paste) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <PasteView paste={paste} />
    </main>
  );
}
