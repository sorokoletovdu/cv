/** @jsxImportSource react */
import { renderToFile } from '@react-pdf/renderer';
import matter from 'gray-matter';
import { readFileSync, mkdirSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { registerFonts } from '../src/pdf/fonts.js';
import { ResumePDF } from '../src/pdf/ResumePDF.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const MD_PATH = path.join(root, 'src/content/resume/resume.md');
const OUT_PATH = path.join(root, 'dist/Dmitrii_Sorokoletov_CV.pdf');

async function main() {
  const raw = readFileSync(MD_PATH, 'utf-8');
  const { data } = matter(raw);

  registerFonts();

  mkdirSync(path.dirname(OUT_PATH), { recursive: true });

  await renderToFile(<ResumePDF data={data as never} />, OUT_PATH);

  console.log(`✓ PDF written to ${OUT_PATH}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
