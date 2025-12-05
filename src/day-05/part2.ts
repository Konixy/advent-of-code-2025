const file = Bun.file("src/day-05/input.txt");
const content = await file.text();
const ranges = content
  .split("\n\n")[0]!
  .split("\n")
  .map((e) => e.split("-").map((v) => Number(v)) as [number, number]);

const sorted = ranges.toSorted((a, b) => a[0] - b[0]);

const merged: [number, number][] = [];
for (const [start, end] of sorted) {
  const last = merged.at(-1);
  if (last && start <= last[1] + 1) {
    last[1] = Math.max(last[1], end);
  } else {
    merged.push([start, end]);
  }
}

const total = merged.reduce((sum, [start, end]) => sum + (end - start + 1), 0);

console.log(total);
