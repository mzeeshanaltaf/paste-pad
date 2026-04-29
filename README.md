# Paste Pad

A simple, modern pastebin for sharing text snippets instantly. Built with Next.js, backed by n8n webhooks — no database required.

## Features

- Create pastes with an optional title and text
- Each paste gets a unique URL: `/<paste_code>`
- Dark / light theme toggle with persistent preference
- Copy-to-clipboard on paste view
- Server-side rendering for paste pages (fast loads, good link previews)
- SEO-ready: Open Graph / Twitter Card metadata, per-paste `generateMetadata`, JSON-LD structured data, `robots.txt`, `sitemap.xml`, and a dynamic OG image
- API key never exposed to the browser

## Tech Stack

- **Next.js 16** (App Router, TypeScript)
- **Tailwind CSS v4**
- **next-themes** — dark/light mode
- **n8n** — webhook backend for creating and retrieving pastes

## Getting Started

### 1. Clone the repo

```bash
git clone <your-repo-url>
cd paste-pad
npm install
```

### 2. Configure environment variables

Create a `.env.local` file in the project root:

```env
N8N_API_KEY=your_api_key_here
N8N_WEBHOOK_URL=https://your-n8n-instance/webhook/your-webhook-id
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

| Variable | Description |
|---|---|
| `N8N_API_KEY` | API key sent as `x-api-key` header to the n8n webhook |
| `N8N_WEBHOOK_URL` | Your n8n webhook endpoint URL |
| `NEXT_PUBLIC_SITE_URL` | Your production domain (used to construct paste URLs for retrieval) |

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## n8n Webhook API

The app communicates with a single n8n webhook endpoint using two event types.

### Create a Paste

```json
POST <N8N_WEBHOOK_URL>
Headers: { "x-api-key": "<N8N_API_KEY>" }

{
  "event_type": "create_paste",
  "paste_title": "My Title",
  "paste_text": "Hello, world!"
}
```

### Get a Paste

```json
POST <N8N_WEBHOOK_URL>
Headers: { "x-api-key": "<N8N_API_KEY>" }

{
  "event_type": "get_paste",
  "paste_url": "https://your-domain.com/<paste_code>"
}
```

Both endpoints return an array containing the paste object:

```json
[
  {
    "id": "1",
    "paste_code": "abc123xy",
    "paste_title": "My Title",
    "paste_text": "Hello, world!",
    "paste_url": "https://your-domain.com/abc123xy",
    "created_at": "2026-03-17T10:23:19.582Z",
    "updated_at": "2026-03-17T10:23:19.591Z"
  }
]
```

## Project Structure

```
src/
  app/
    page.tsx                  # Home page (paste creation form)
    layout.tsx                # Root layout with metadata + theme provider
    globals.css               # Tailwind + custom styles
    opengraph-image.tsx       # Edge-rendered branded OG image (1200×630)
    robots.ts                 # robots.txt generation
    sitemap.ts                # sitemap.xml (homepage only)
    [pasteCode]/
      page.tsx                # SSR paste view with generateMetadata + JSON-LD
      not-found.tsx           # 404 for invalid paste codes
    api/paste/
      route.ts                # POST proxy to n8n (keeps API key server-side)
  components/
    Header.tsx                # Navigation bar
    ThemeToggle.tsx           # Dark/light toggle button
    PasteForm.tsx             # Create paste form
    PasteView.tsx             # Display paste content
    Providers.tsx             # ThemeProvider wrapper
  lib/
    types.ts                  # Paste TypeScript interface
    webhook.ts                # n8n webhook helpers (server-only)
```

## Deployment

Deploy to any platform that supports Next.js (Vercel, Railway, etc.). Set the three environment variables in your deployment settings.

> **Important:** Set `NEXT_PUBLIC_SITE_URL` to your production domain. This value is used to construct paste URLs when fetching pastes from n8n.
