import type { Metadata } from "next";
import PasteLoader from "@/components/PasteLoader";
import { getPaste } from "@/lib/webhook";
import { getPlainTextPreview } from "@/lib/tabs";

type Props = {
  params: Promise<{ pasteCode: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { pasteCode } = await params;
  const paste = await getPaste(pasteCode);
  if (!paste) return {};

  const title = paste.paste_title || "Untitled";
  const description = getPlainTextPreview(paste.paste_text).slice(0, 155);
  const url = `${process.env.NEXT_PUBLIC_SITE_URL}/${pasteCode}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { type: "article", title, description, url },
    twitter: { title, description },
  };
}

export default async function PastePage({ params }: Props) {
  const { pasteCode } = await params;
  const paste = await getPaste(pasteCode);

  const jsonLd = paste
    ? {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: paste.paste_title || "Untitled",
        description: getPlainTextPreview(paste.paste_text).slice(0, 155),
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/${pasteCode}`,
        datePublished: paste.created_at,
      }
    : null;

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <PasteLoader pasteCode={pasteCode} />
    </main>
  );
}
