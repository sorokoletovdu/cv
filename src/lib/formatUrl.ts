/**
 * Strips social profile URL prefixes to return the bare handle.
 * Used by both web (Header.astro) and PDF (PDFHeader.tsx) layers.
 *
 * spec://cv/data#schema
 */

/** "https://linkedin.com/in/sorokoletovdu/" → "sorokoletovdu" */
export function linkedInHandle(url: string): string {
  return url.replace(/https?:\/\/(www\.)?linkedin\.com\/in\//, '').replace(/\/$/, '');
}

/** "https://github.com/sorokoletovdu" → "sorokoletovdu" */
export function gitHubHandle(url: string): string {
  return url.replace(/https?:\/\/(www\.)?github\.com\//, '').replace(/\/$/, '');
}
