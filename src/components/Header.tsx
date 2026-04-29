import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <nav className="border-b border-stone-200/80 bg-white/80 backdrop-blur-md dark:border-stone-800/60 dark:bg-[#0f1117]/80">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" aria-label="Go to homepage" className="flex items-center gap-2.5 group">
          {/* Clipboard icon */}
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-600 shadow-sm shadow-teal-600/25 transition-transform group-hover:scale-105">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
              <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
            </svg>
          </div>
          <span className="font-mono text-lg font-bold tracking-tight text-stone-800 dark:text-stone-100">
            Paste<span className="text-teal-600">Pad</span>
          </span>
        </Link>
        <div className="flex items-center gap-2">
          <Link
            href="/"
            aria-label="Create new paste"
            className="btn-press rounded-lg bg-teal-600 px-4 py-1.5 text-sm font-semibold text-white shadow-sm shadow-teal-600/25 transition-all hover:bg-teal-700 hover:shadow-md hover:shadow-teal-600/20"
          >
            + New
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
