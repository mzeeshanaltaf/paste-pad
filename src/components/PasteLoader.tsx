"use client";

import { useEffect, useState } from "react";
import { Paste } from "@/lib/types";
import PasteView from "./PasteView";
import Link from "next/link";

export default function PasteLoader({ pasteCode }: { pasteCode: string }) {
  const [paste, setPaste] = useState<Paste | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const key = `paste_${pasteCode}`;
    const cached = sessionStorage.getItem(key);

    if (cached) {
      sessionStorage.removeItem(key);
      setPaste(JSON.parse(cached));
      setLoading(false);
      return;
    }

    fetch(`/api/paste/${pasteCode}`)
      .then((res) => {
        if (res.status === 404) {
          setNotFound(true);
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (data) setPaste(data);
      })
      .finally(() => setLoading(false));
  }, [pasteCode]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <svg
          className="h-6 w-6 animate-spin text-teal-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      </div>
    );
  }

  if (notFound || !paste) {
    return (
      <div className="flex flex-col items-center py-24 text-center">
        <div className="animate-fade-up rounded-2xl border border-stone-200/80 bg-white p-12 shadow-sm dark:border-stone-800/60 dark:bg-[#171923]">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-stone-100 dark:bg-stone-800/60">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              className="h-8 w-8 text-stone-400 dark:text-stone-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
              />
            </svg>
          </div>
          <p className="font-mono text-sm font-bold tracking-widest text-teal-600">
            404
          </p>
          <h2 className="mt-2 text-xl font-bold text-stone-800 dark:text-stone-100">
            Paste Not Found
          </h2>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-stone-500 dark:text-stone-400">
            This paste doesn&apos;t exist or may have been removed.
          </p>
          <Link
            href="/"
            className="btn-press mt-8 inline-flex items-center gap-2 rounded-xl bg-teal-600 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-teal-600/25 transition-all hover:bg-teal-700"
          >
            Create New Paste
          </Link>
        </div>
      </div>
    );
  }

  return <PasteView paste={paste} />;
}
