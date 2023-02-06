const hexColors: string[] = [
  "#FF8A00",
  "#ff2f96",
  "#5919E0",
  "#0F43FF",
  "#02B8F7",
  "#09E0DD",
  "#09D698",
  "#34b907",
  "#107b06",
  "#FF0A49",
  "#91409e",
  "#FF66F4",
  "#ffb700",
];

export const tagColors: Map<string, string> = new Map<string, string>();

export function setTagColors(tags: string[]) {
  for (let i = 0; i < tags.length; i++) {
    tagColors.set(tags[i], hexColors[i%hexColors.length]);
  }
}
