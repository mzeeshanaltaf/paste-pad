import type { Metadata } from "next";
import { DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import Header from "@/components/Header";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const description = "A simple and modern pastebin for sharing text snippets instantly. Create, share, and view text pastes with a unique URL.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Paste Pad", template: "%s | Paste Pad" },
  description,
  icons: { icon: "/paste.png" },
  alternates: { canonical: siteUrl },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    siteName: "Paste Pad",
    url: siteUrl,
    title: "Paste Pad",
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Paste Pad",
    description,
  },
  other: {
    "theme-color": "#ffffff",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${dmSans.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <Providers>
          <div className="dot-grid min-h-screen bg-stone-50 text-stone-900 dark:bg-[#0f1117] dark:text-stone-100">
            <Header />
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
