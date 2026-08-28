"use client";

import { Paste } from "@/lib/types";
import { parseTabs } from "@/lib/tabs";
import { useState } from "react";

export default function PasteView({ paste }: { paste: Paste }) {
  const [copied, setCopied] = useState(false);
  const tabs = parseTabs(paste.paste_text);
  const [activeTabId, setActiveTabId] = useState(tabs?.[0]?.id ?? "");

  const activeContent = tabs
    ? tabs.find((t) => t.id === activeTabId)?.content ?? tabs[0].content
    : paste.paste_text;

  function handleCopy() {
    navigator.clipboard.writeText(activeContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const createdDate = new Date(paste.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="animate-fade-up overflow-hidden rounded-2xl border border-stone-200/80 bg-white shadow-sm shadow-stone-200/50 dark:border-stone-800/60 dark:bg-[#171923] dark:shadow-none">
      {/* Header bar */}
      <div className="flex items-start justify-between gap-4 border-b border-stone-100 px-6 py-5 dark:border-stone-800/60 sm:items-center">
        <div className="min-w-0 flex-1">
          <h1 className="truncate text-xl font-bold tracking-tight text-stone-900 dark:text-stone-50 sm:text-2xl">
            {paste.paste_title || "Untitled"}
          </h1>
          <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-stone-400 dark:text-stone-500">
            <span className="inline-flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-3 w-3">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              {createdDate}
            </span>
            <span className="font-mono rounded bg-stone-100 px-1.5 py-0.5 text-stone-500 dark:bg-stone-800 dark:text-stone-400">
              {paste.paste_code}
            </span>
          </div>
        </div>
        <button
          onClick={handleCopy}
          aria-label={copied ? "Copied to clipboard" : "Copy to clipboard"}
          className={`btn-press flex shrink-0 items-center gap-1.5 rounded-lg border px-3.5 py-2 text-sm font-medium transition-all ${
            copied
              ? "border-teal-200 bg-teal-50 text-teal-700 dark:border-teal-800 dark:bg-teal-900/40 dark:text-teal-300"
              : "border-stone-200 bg-stone-50 text-stone-600 hover:border-stone-300 hover:bg-stone-100 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300 dark:hover:border-stone-600 dark:hover:bg-stone-700"
          }`}
        >
          {copied ? (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              Copy
            </>
          )}
        </button>
      </div>

      {/* Tab bar */}
      {tabs && tabs.length > 1 && (
        <div className="flex items-center gap-1 overflow-x-auto border-b border-stone-100 bg-stone-50/50 px-4 pt-2 dark:border-stone-800/60 dark:bg-stone-900/30">
          {tabs.map((tab) => {
            const isActive = tab.id === activeTabId;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTabId(tab.id)}
                className={`shrink-0 truncate rounded-t-lg border border-b-0 px-3 py-2 text-sm font-medium transition-colors max-w-40 ${
                  isActive
                    ? "border-stone-200 bg-white text-stone-900 dark:border-stone-800/60 dark:bg-[#171923] dark:text-stone-100"
                    : "border-transparent text-stone-500 hover:bg-stone-200/40 dark:text-stone-400 dark:hover:bg-stone-800/40"
                }`}
              >
                {tab.name}
              </button>
            );
          })}
        </div>
      )}

      {/* Content */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 w-12 border-r border-stone-100 bg-stone-50/50 dark:border-stone-800/40 dark:bg-stone-900/30" />
        <div className="relative px-6 py-5 pl-16">
          <pre className="whitespace-pre-wrap wrap-break-word font-mono text-sm leading-7 text-stone-700 dark:text-stone-300">
            {activeContent}
          </pre>
        </div>
      </div>
    </div>
  );
}
