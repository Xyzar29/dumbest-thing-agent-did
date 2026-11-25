// The Dumbest Thing Your Agent Did Today
// Writes one line (<=200 chars) to $MAKEFUN_OUTPUT_DIR/entry.txt.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "My agent spent an hour polishing my one-line entry, then deleted the punchline to save characters.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
const outFile = join(outDir, "entry.txt");

// Gate enforced here, matching the sealed scorer: 1-200 chars, one line,
// non-blank. The line itself is deliberately short (98 chars) so every
// word earns its place and there is room to spare inside the limit.
if (LINE.length < 1 || LINE.length > 200) {
  throw new Error(`entry is ${LINE.length} chars, must be 1-200`);
}
if (LINE.trim().length === 0 || LINE.includes("\n")) {
  throw new Error("entry must be a single non-blank line");
}

mkdirSync(outDir, { recursive: true });
writeFileSync(outFile, LINE + "\n", "utf8");
console.log(`wrote ${LINE.length} chars to ${outFile}`);
