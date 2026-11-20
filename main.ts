// Entry program for the make.fun bounty gta6-clipper-01 (Node 22, standard library only).
//
// What it does: take VIDEO.json from the repository root and copy it into the output
// directory, where the grader picks it up. VIDEO.json holds the YouTube address of the
// clip, and that address is the actual entry — the house reads the video's views from
// YouTube itself, so nothing computed here affects the score.
//
// For a local dry run outside the grader's container, point MAKEFUN_BOT_DIR at this
// repository and MAKEFUN_OUTPUT_DIR at a scratch folder:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const sourceDir = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(outputDir, { recursive: true });

try {
  copyFileSync(join(sourceDir, 'VIDEO.json'), join(outputDir, 'VIDEO.json'));
} catch (err) {
  console.error(`Could not copy VIDEO.json from ${sourceDir}: ${(err as Error).message}`);
  process.exit(1);
}
