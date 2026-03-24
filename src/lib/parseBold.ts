/**
 * Parses a string containing **bold** markdown into text segments.
 * Used by the PDF layer where HTML is not available.
 */
export interface TextSegment {
  text: string;
  bold: boolean;
}

export function parseBold(input: string): TextSegment[] {
  const segments: TextSegment[] = [];
  const re = /\*\*(.+?)\*\*/g;
  let last = 0;
  let match: RegExpExecArray | null;

  while ((match = re.exec(input)) !== null) {
    if (match.index > last) {
      segments.push({ text: input.slice(last, match.index), bold: false });
    }
    segments.push({ text: match[1], bold: true });
    last = match.index + match[0].length;
  }

  if (last < input.length) {
    segments.push({ text: input.slice(last), bold: false });
  }

  return segments;
}
