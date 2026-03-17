import PasteLoader from "@/components/PasteLoader";

type Props = {
  params: Promise<{ pasteCode: string }>;
};

export default async function PastePage({ params }: Props) {
  const { pasteCode } = await params;

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <PasteLoader pasteCode={pasteCode} />
    </main>
  );
}
