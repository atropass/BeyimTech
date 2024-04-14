const sectionColors = {
  Listening: "#4361EE",
  Speaking: "#B4ADEA",
  Writing: "#F39C6B",
  Reading: "#06D6A0",
  Overall: "#FF3864",
};

export function getSectionColor(section: string): string {
  return sectionColors[section as keyof typeof sectionColors];
}
