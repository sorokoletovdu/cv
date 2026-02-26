import { Font } from '@react-pdf/renderer';
import path from 'path';

const ROBOTO = path.resolve(process.cwd(), 'node_modules/@fontsource/roboto/files');
const SS3 = path.resolve(process.cwd(), 'node_modules/@fontsource/source-sans-3/files');

export function registerFonts(): void {
  Font.register({
    family: 'Roboto',
    fonts: [
      { src: path.join(ROBOTO, 'roboto-latin-400-normal.woff') },
      { src: path.join(ROBOTO, 'roboto-latin-700-normal.woff'), fontWeight: 700 },
    ],
  });

  Font.register({
    family: 'Source Sans 3',
    fonts: [
      { src: path.join(SS3, 'source-sans-3-latin-300-normal.woff'), fontWeight: 300 },
      { src: path.join(SS3, 'source-sans-3-latin-300-italic.woff'), fontWeight: 300, fontStyle: 'italic' },
      { src: path.join(SS3, 'source-sans-3-latin-400-normal.woff'), fontWeight: 400 },
      { src: path.join(SS3, 'source-sans-3-latin-400-italic.woff'), fontWeight: 400, fontStyle: 'italic' },
      { src: path.join(SS3, 'source-sans-3-latin-700-normal.woff'), fontWeight: 700 },
    ],
  });

  // Disable hyphenation — keep words intact
  Font.registerHyphenationCallback((word) => [word]);
}
