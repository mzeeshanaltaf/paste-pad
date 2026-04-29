import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex max-w-6xl flex-col items-center px-4 py-24 text-center">
      <div className="animate-fade-up rounded-2xl border border-stone-200/80 bg-white p-12 shadow-sm shadow-stone-200/50 dark:border-stone-800/60 dark:bg-[#171923] dark:shadow-none">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-stone-100 dark:bg-stone-800/60">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-8 w-8 text-stone-400 dark:text-stone-500">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="m6 18 .8-2.4a1 1 0 0 1 .95-.68h.5a1 1 0 0 1 .95.68L10 18" />
          </svg>
        </div>
        <p className="font-mono text-sm font-bold tracking-widest text-teal-600">
          404
        </p>
        <h1 className="mt-2 text-xl font-bold text-stone-800 dark:text-stone-100">
          Paste Not Found
        </h1>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-stone-500 dark:text-stone-400">
          This paste doesn&apos;t exist or may have been removed. Double-check the URL or create a new one.
        </p>
        <Link
          href="/"
          className="btn-press mt-8 inline-flex items-center gap-2 rounded-xl bg-teal-600 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-teal-600/25 transition-all hover:bg-teal-700 hover:shadow-lg hover:shadow-teal-600/30"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
            <path d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Create New Paste
        </Link>
      </div>
    </main>
  );
}
