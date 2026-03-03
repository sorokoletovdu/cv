import 'dotenv/config';
import Anthropic from '@anthropic-ai/sdk';
import { readFileSync, writeFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const MD_PATH = path.join(root, 'src/content/resume/resume.md');
const REPORT_PATH = path.join(root, 'ats-report.md');

async function readJD(): Promise<string> {
  const arg = process.argv[2];

  if (!arg) {
    if (process.stdin.isTTY) {
      console.error(
        'Usage: tsx scripts/ats-check.ts docs/JOB-DESCRIPTION-EXAMPLE.md\n' +
        '       tsx scripts/ats-check.ts <jd-file.md>\n' +
        '       tsx scripts/ats-check.ts "Paste JD text here"\n' +
        '       echo "JD text" | tsx scripts/ats-check.ts',
      );
      process.exit(1);
    }
    // Read from piped stdin
    const chunks: Buffer[] = [];
    for await (const chunk of process.stdin) {
      chunks.push(chunk as Buffer);
    }
    return Buffer.concat(chunks).toString('utf-8').trim();
  }

  // File path?
  const resolved = path.resolve(process.cwd(), arg);
  try {
    return readFileSync(resolved, 'utf-8').trim();
  } catch (err: unknown) {
    if ((err as NodeJS.ErrnoException).code !== 'ENOENT') throw err;
  }

  // Raw text argument
  return arg.trim();
}

async function main() {
  if (!process.env.ANTHROPIC_API_KEY) {
    console.error('Error: ANTHROPIC_API_KEY environment variable is required.');
    process.exit(1);
  }

  const resumeText = readFileSync(MD_PATH, 'utf-8');
  const jd = await readJD();

  if (!jd) {
    console.error('Error: Job description is empty.');
    process.exit(1);
  }

  const client = new Anthropic({ maxRetries: 5 });
  const today = new Date().toISOString().split('T')[0];

  console.error('Analyzing resume against job description...\n');

  const stream = client.messages.stream({
    model: 'claude-opus-4-6',
    max_tokens: 4096,
    thinking: { type: 'adaptive' },
    system: [
      'You are an expert ATS (Applicant Tracking System) specialist and senior technical recruiter',
      'with 10+ years of experience in QA Engineering and Software Testing roles.',
      'You provide detailed, actionable resume feedback comparable to ResumeWorded.',
      '',
      'Your analysis must be:',
      '- Specific to QA/Testing/SDET roles (understand Playwright, TypeScript, CI/CD, test automation)',
      '- Honest: flag real weaknesses, not only positives',
      '- Actionable: every section ends with concrete next steps or rewrites',
      '- Formatted as clean Markdown ready to commit as ats-report.md',
      '',
      'Return ONLY the Markdown report, no preamble or explanation outside the report.',
    ].join('\n'),
    messages: [
      {
        role: 'user',
        content: [
          `Analyze the resume below against the job description and produce a comprehensive ATS report.`,
          `Report date: ${today}`,
          '',
          '<resume>',
          resumeText,
          '</resume>',
          '',
          '<job_description>',
          jd,
          '</job_description>',
          '',
          'Structure the report with exactly these sections in order:',
          '',
          '# ATS Analysis Report',
          '> Generated: ' + today,
          '',
          '## 1. ATS Match Score',
          'Give a score from 0–100 with a one-paragraph breakdown covering keyword match,',
          'formatting suitability, experience relevance, and skills alignment.',
          '',
          '## 2. Missing Keywords',
          'Markdown table: | Keyword / Phrase | Context in JD | Priority (High/Med/Low) |',
          'List every important JD term not present in the resume.',
          '',
          '## 3. Weak Action Verbs',
          'Markdown table: | Current Verb / Phrase | Stronger Alternative |',
          'Flag passive constructions and overused words (e.g. "responsible for", "worked on").',
          '',
          '## 4. Bullets Missing Metrics',
          'Bulleted list of resume bullets that lack quantifiable impact.',
          'For each, note what metric would strengthen it (%, count, time saved, etc.).',
          '',
          '## 5. Section Feedback',
          'Sub-sections: ### Experience | ### Skills | ### Education',
          'Provide 2–4 specific, actionable feedback points per section.',
          '',
          '## 6. Top Bullet Rewrites',
          'Show 3–5 rewrites in this format:',
          '**Original:** [exact bullet text]',
          '**Rewritten:** [improved version with metrics/stronger verb]',
          '**Why:** [one sentence explaining the improvement]',
        ].join('\n'),
      },
    ],
  });

  // Stream text to stdout so the user sees progress
  for await (const event of stream) {
    if (
      event.type === 'content_block_delta' &&
      event.delta.type === 'text_delta'
    ) {
      process.stdout.write(event.delta.text);
    }
  }

  const finalMessage = await stream.finalMessage();

  const reportText = finalMessage.content
    .filter((b): b is Anthropic.Messages.TextBlock => b.type === 'text')
    .map((b) => b.text)
    .join('');

  process.stdout.write('\n');

  writeFileSync(REPORT_PATH, reportText, 'utf-8');

  console.error(`\n✓ Report written to ${REPORT_PATH}`);
  console.error(
    `  Tokens: ${finalMessage.usage.input_tokens} in / ${finalMessage.usage.output_tokens} out`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
