export interface PasteTab {
  id: string;
  name: string;
  content: string;
}

const TABS_FORMAT = "pastepad-tabs-v1";

interface SerializedTabs {
  __format: typeof TABS_FORMAT;
  tabs: { name: string; content: string }[];
}

export function serializeTabs(tabs: PasteTab[]): string {
  const payload: SerializedTabs = {
    __format: TABS_FORMAT,
    tabs: tabs.map(({ name, content }) => ({ name, content })),
  };
  return JSON.stringify(payload);
}

export function parseTabs(text: string): PasteTab[] | null {
  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    return null;
  }

  if (
    !parsed ||
    typeof parsed !== "object" ||
    (parsed as SerializedTabs).__format !== TABS_FORMAT ||
    !Array.isArray((parsed as SerializedTabs).tabs) ||
    (parsed as SerializedTabs).tabs.length === 0
  ) {
    return null;
  }

  return (parsed as SerializedTabs).tabs.map((tab, index) => ({
    id: `tab-${index}`,
    name: typeof tab.name === "string" && tab.name.trim() ? tab.name : `Tab ${index + 1}`,
    content: typeof tab.content === "string" ? tab.content : "",
  }));
}

/** Plain-text preview for use in metadata/OG descriptions, where raw tab JSON would be unreadable. */
export function getPlainTextPreview(text: string): string {
  const tabs = parseTabs(text);
  if (!tabs) return text;
  return tabs.map((t) => t.content).join(" ").trim() || text;
}
