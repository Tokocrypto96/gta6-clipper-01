// Entry program for the make.fun bounty gta6-clipper-01 (Node 22, standard library only).
//
// What it does: read VIDEO.json from the repository root, validate that it really
// names a YouTube video, then copy it into the output directory, where the grader
// picks it up. VIDEO.json holds the YouTube address of the clip, and that address
// is the actual entry — the house reads the video's views from YouTube itself, so
// nothing computed here affects the score. The validation exists so a malformed
// VIDEO.json fails loudly here instead of surfacing as a silent invalid entry.
//
// For a local dry run outside the grader's container, point MAKEFUN_BOT_DIR at
// this repository and MAKEFUN_OUTPUT_DIR at a scratch folder:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
// Pass --check to validate VIDEO.json without copying anything.
//
// On success the program prints nothing. On any problem it writes one clear
// line to stderr and exits non-zero.

import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const sourceDir = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const sourcePath = join(sourceDir, 'VIDEO.json');
const outputPath = join(outputDir, 'VIDEO.json');

function fail(message: string): never {
  console.error(`main.ts: ${message}`);
  process.exit(1);
}

// Read and parse VIDEO.json. A missing file or invalid JSON is a hard error:
// there is no sensible fallback for an entry whose one deliverable is this file.
let raw: string;
try {
  raw = readFileSync(sourcePath, 'utf8');
} catch (err) {
  fail(`cannot read ${sourcePath}: ${(err as Error).message}`);
}

let data: unknown;
try {
  data = JSON.parse(raw!);
} catch (err) {
  fail(`VIDEO.json is not valid JSON: ${(err as Error).message}`);
}

// The file must be a JSON object carrying a "url" string.
if (typeof data !== 'object' || data === null || Array.isArray(data)) {
  fail('VIDEO.json must be a JSON object like {"url": "https://www.youtube.com/shorts/<id>"}');
}
const url = (data as { url?: unknown }).url;
if (typeof url !== 'string' || url.length === 0) {
  fail('VIDEO.json has no "url" field, or it is not a non-empty string');
}

// The address must be a real URL on a YouTube host. The house resolves Shorts,
// watch and youtu.be forms, so those hosts are the ones accepted here.
let parsed: URL;
try {
  parsed = new URL(url!);
} catch {
  fail(`VIDEO.json "url" is not a valid URL: ${url}`);
}
const youtubeHosts = new Set(['youtube.com', 'www.youtube.com', 'm.youtube.com', 'youtu.be']);
if (parsed.protocol !== 'https:' || !youtubeHosts.has(parsed.hostname)) {
  fail(`VIDEO.json "url" must be an https address on youtube.com or youtu.be, got: ${url}`);
}

// Validation passed. With --check, stop here: the file is proven well formed
// and nothing is copied.
if (process.argv.includes('--check')) {
  process.exit(0);
}

// Copy the file byte for byte into the output directory.
mkdirSync(outputDir, { recursive: true });
try {
  copyFileSync(sourcePath, outputPath);
} catch (err) {
  fail(`cannot copy VIDEO.json to ${outputPath}: ${(err as Error).message}`);
}

// Read the copy back and compare it with the source bytes. A short or garbled
// write must not be reported as success, so any mismatch is a hard error.
let written: string;
try {
  written = readFileSync(outputPath, 'utf8');
} catch (err) {
  fail(`cannot read back ${outputPath}: ${(err as Error).message}`);
}
if (written! !== raw!) {
  fail(`copied VIDEO.json does not match the source bytes (${written!.length} of ${raw!.length} chars)`);
}
