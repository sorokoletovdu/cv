import { Font } from '@react-pdf/renderer';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OS = path.resolve(__dirname, '../../node_modules/@fontsource/open-sans/files');

let registered = false;

export function registerFonts(): void {
  if (registered) return;
  registered = true;

  Font.register({
    family: 'Open Sans',
    fonts: [
      { src: path.join(OS, 'open-sans-latin-300-normal.woff'), fontWeight: 300 },
      { src: path.join(OS, 'open-sans-latin-300-italic.woff'), fontWeight: 300, fontStyle: 'italic' },
      { src: path.join(OS, 'open-sans-latin-400-normal.woff'), fontWeight: 400 },
      { src: path.join(OS, 'open-sans-latin-400-italic.woff'), fontWeight: 400, fontStyle: 'italic' },
      { src: path.join(OS, 'open-sans-latin-600-normal.woff'), fontWeight: 600 },
      { src: path.join(OS, 'open-sans-latin-700-normal.woff'), fontWeight: 700 },
    ],
  });

  // Disable hyphenation — keep words intact
  Font.registerHyphenationCallback((word) => [word]);
}
