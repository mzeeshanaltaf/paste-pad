"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { PasteTab, serializeTabs } from "@/lib/tabs";

export default function PasteForm() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [tabs, setTabs] = useState<PasteTab[]>([
    { id: "tab-1", name: "Tab 1", content: "" },
  ]);
  const [activeTabId, setActiveTabId] = useState("tab-1");
  const [renamingTabId, setRenamingTabId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState("");
  const nextTabId = useRef(2);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const activeTab = tabs.find((t) => t.id === activeTabId) ?? tabs[0];

  function updateActiveContent(content: string) {
    setTabs((prev) =>
      prev.map((t) => (t.id === activeTabId ? { ...t, content } : t))
    );
  }

  function addTab() {
    const id = `tab-${nextTabId.current++}`;
    setTabs((prev) => [...prev, { id, name: `Tab ${prev.length + 1}`, content: "" }]);
    setActiveTabId(id);
  }

  function deleteTab(id: string) {
    if (tabs.length <= 1) return;
    const idx = tabs.findIndex((t) => t.id === id);
    const filtered = tabs.filter((t) => t.id !== id);
    setTabs(filtered);
    if (activeTabId === id) {
      const fallback = filtered[Math.max(0, idx - 1)] ?? filtered[0];
      setActiveTabId(fallback.id);
    }
  }

  function startRename(tab: PasteTab) {
    setRenamingTabId(tab.id);
    setRenameValue(tab.name);
  }

  function commitRename() {
    if (renamingTabId) {
      setTabs((prev) =>
        prev.map((t) =>
          t.id === renamingTabId
            ? { ...t, name: renameValue.trim() || t.name }
            : t
        )
      );
    }
    setRenamingTabId(null);
  }

  function cancelRename() {
    setRenamingTabId(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!tabs.some((t) => t.content.trim())) {
      setError("Add some text to at least one tab");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/paste", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          paste_title: title,
          paste_text: serializeTabs(tabs),
        }),
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.error || "Failed to create paste");
        return;
      }

      sessionStorage.setItem(`paste_${data.data.paste_code}`, JSON.stringify(data.data));
      router.push(`/${data.data.paste_code}`);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="animate-fade-up rounded-2xl border border-stone-200/80 bg-white p-6 shadow-sm shadow-stone-200/50 dark:border-stone-800/60 dark:bg-[#171923] dark:shadow-none sm:p-8">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 dark:bg-teal-900/30">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5 text-teal-600 dark:text-teal-400">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-50">
            New Paste
          </h1>
          <p className="text-sm text-stone-500 dark:text-stone-400">
            Share text snippets instantly
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <label htmlFor="paste-title" className="sr-only">
            Paste title (optional)
          </label>
          <input
            id="paste-title"
            type="text"
            placeholder="Title (optional)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={100}
            className="w-full rounded-xl border border-stone-200 bg-stone-50/50 px-4 py-3 pr-20 text-stone-900 placeholder-stone-400 outline-none transition-all focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-500/10 dark:border-stone-700/80 dark:bg-stone-800/50 dark:text-stone-100 dark:placeholder-stone-500 dark:focus:border-teal-500 dark:focus:bg-stone-800"
          />
          {title.length > 0 && (
            <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 rounded-md bg-stone-100 px-2 py-0.5 font-mono text-xs dark:bg-stone-700/50">
              <span className={title.length >= 90 ? "text-amber-500" : "text-stone-400 dark:text-stone-500"}>
                {title.length}/100
              </span>
            </div>
          )}
        </div>

        <div>
          {/* Tab bar */}
          <div className="flex items-end gap-1 overflow-x-auto rounded-t-xl border border-b-0 border-stone-200 bg-stone-100/60 px-2 pt-2 dark:border-stone-700/80 dark:bg-stone-900/40">
            {tabs.map((tab) => {
              const isActive = tab.id === activeTabId;
              return (
                <div
                  key={tab.id}
                  className={`group flex shrink-0 items-center gap-1.5 rounded-t-lg border border-b-0 px-3 py-2 text-sm transition-colors ${
                    isActive
                      ? "border-stone-200 bg-white text-stone-900 dark:border-stone-700/80 dark:bg-[#171923] dark:text-stone-100"
                      : "border-transparent text-stone-500 hover:bg-stone-200/50 dark:text-stone-400 dark:hover:bg-stone-800/60"
                  }`}
                >
                  {renamingTabId === tab.id ? (
                    <input
                      autoFocus
                      value={renameValue}
                      onChange={(e) => setRenameValue(e.target.value)}
                      onBlur={commitRename}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          commitRename();
                        } else if (e.key === "Escape") {
                          e.preventDefault();
                          cancelRename();
                        }
                      }}
                      maxLength={40}
                      className="w-24 rounded border border-teal-500 bg-transparent px-1 text-sm outline-none"
                    />
                  ) : (
                    <button
                      type="button"
                      onClick={() => setActiveTabId(tab.id)}
                      onDoubleClick={() => startRename(tab)}
                      className="max-w-36 truncate font-medium"
                      title="Double-click to rename"
                    >
                      {tab.name}
                    </button>
                  )}
                  {tabs.length > 1 && (
                    <button
                      type="button"
                      onClick={() => deleteTab(tab.id)}
                      aria-label={`Delete ${tab.name}`}
                      className="rounded p-0.5 text-stone-400 opacity-0 transition-opacity hover:bg-stone-200 hover:text-stone-700 group-hover:opacity-100 dark:hover:bg-stone-700 dark:hover:text-stone-200"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="h-3 w-3">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                  )}
                </div>
              );
            })}
            <button
              type="button"
              onClick={addTab}
              aria-label="Add tab"
              className="mb-1 shrink-0 rounded-lg p-1.5 text-stone-500 transition-colors hover:bg-stone-200/70 hover:text-stone-700 dark:text-stone-400 dark:hover:bg-stone-800/60 dark:hover:text-stone-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="h-4 w-4">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </button>
          </div>

          <div className="relative">
            <label htmlFor="paste-text" className="sr-only">
              Paste content
            </label>
            <textarea
              id="paste-text"
              placeholder="Paste your text here..."
              value={activeTab.content}
              onChange={(e) => updateActiveContent(e.target.value)}
              rows={14}
              className="w-full resize-y rounded-b-xl rounded-tr-xl border border-stone-200 bg-stone-50/50 px-4 py-3 font-mono text-sm leading-relaxed text-stone-900 placeholder-stone-400 outline-none transition-all focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-500/10 dark:border-stone-700/80 dark:bg-stone-800/50 dark:text-stone-100 dark:placeholder-stone-500 dark:focus:border-teal-500 dark:focus:bg-stone-800"
            />
            <div className="pointer-events-none absolute bottom-3 right-3 rounded-md bg-stone-100 px-2 py-0.5 font-mono text-xs text-stone-400 dark:bg-stone-700/50 dark:text-stone-500">
              {activeTab.content.length > 0 ? `${activeTab.content.length} chars` : ""}
            </div>
          </div>
        </div>

        {error && (
          <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/50 dark:text-red-400">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4 shrink-0">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="btn-press inline-flex items-center gap-2 rounded-xl bg-teal-600 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-teal-600/25 transition-all hover:bg-teal-700 hover:shadow-lg hover:shadow-teal-600/30 disabled:cursor-not-allowed disabled:opacity-60 disabled:shadow-none"
        >
          {loading ? (
            <>
              <svg className="h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Creating...
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
              </svg>
              Create New Paste
            </>
          )}
        </button>
      </form>
    </div>
  );
}
