// Have been helped with ai for this one (only for optimization, my implemetation worked but was way too slow (a few hour to solve))

const file = Bun.file("src/day-07/input.txt");
const content = await file.text();
const lines = content
  .split("\n")
  .filter(Boolean)
  .map((e) => e.split(""));

const height = lines.length;
const width = lines[0]!.length;

// Convert to numeric grid for faster access (0 = ".", 1 = "|", 2 = "^", 3 = "S")
const EMPTY = 0,
  PIPE = 1,
  SPLIT = 2,
  SOURCE = 3;
const charMap: Record<string, number> = { ".": EMPTY, "|": PIPE, "^": SPLIT, S: SOURCE };
const grid = new Uint8Array(height * width);
for (let i = 0; i < height; i++) {
  for (let j = 0; j < width; j++) {
    grid[i * width + j] = charMap[lines[i]![j]!] ?? EMPTY;
  }
}

// Memoization cache: key = position where we hit a branch, value = count
const cache = new Map<number, number>();

// Global modification stack (flat array for speed)
const modStack: number[] = [];

const time = performance.now();
let leafCount = 0;

function walk(initI: number, initJ: number, dir: number): number {
  const modStart = modStack.length;

  for (let i = initI; i < height; i++) {
    const rowOffset = i * width;
    const aboveRowOffset = (i - 1) * width;

    for (let j = initJ; j < width; j++) {
      const idx = rowOffset + j;
      const aboveIdx = aboveRowOffset + j;
      const char = grid[idx]!;
      const aboveChar = grid[aboveIdx]!;

      if (char === EMPTY) {
        if (aboveChar === SOURCE || aboveChar === PIPE) {
          grid[idx] = PIPE;
          modStack.push(idx);
        } else if (dir !== 0) {
          const neighborIdx = idx + dir;
          const aboveNeighborIdx = aboveIdx + dir;
          if (grid[neighborIdx] === SPLIT && grid[aboveNeighborIdx] === PIPE) {
            grid[idx] = PIPE;
            modStack.push(idx);
            dir = 0;
          }
        }
      } else if (char === SPLIT && aboveChar === PIPE) {
        if (dir === 0 && grid[idx - 1] === EMPTY && grid[idx + 1] === EMPTY) {
          // Check cache for this branch point
          const cacheKey = idx;
          const cached = cache.get(cacheKey);
          if (cached !== undefined) {
            // Restore modifications and return cached result
            for (let k = modStack.length - 1; k >= modStart; k--) {
              grid[modStack[k]!] = EMPTY;
            }
            modStack.length = modStart;
            return cached;
          }

          // Explore both branches
          const count1 = walk(i, j - 1, 1);
          const count2 = walk(i, j - 1, -1);
          const total = count1 + count2;

          // Cache the result for this branch point
          cache.set(cacheKey, total);

          // Restore modifications
          for (let k = modStack.length - 1; k >= modStart; k--) {
            grid[modStack[k]!] = EMPTY;
          }
          modStack.length = modStart;

          return total;
        }
      }
    }
    initJ = 0;
  }

  // Restore modifications
  for (let k = modStack.length - 1; k >= modStart; k--) {
    grid[modStack[k]!] = EMPTY;
  }
  modStack.length = modStart;

  leafCount++;
  return 1;
}

const result = walk(1, 0, 0);
console.log("result", result, "time", performance.now() - time);
