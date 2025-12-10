const begin = performance.now();

const file = Bun.file("src/day-08/input.txt");
const content = await file.text();
const lines = content.split("\n").filter(Boolean);

const MAX_D2 = 200000000;

type Vec = [number, number, number];

function parseVec(s: string) {
  return s.split(",").map(Number) as Vec;
}

function connect([a, b]: Vec) {
  circuits[a]!.boxes.has(b) ||
    circuits[b]!.boxes.forEach((box) => {
      circuits[a]!.boxes.add(box);
      circuits[box] = circuits[a]!;
    });
}

function d2(a: Vec, b: Vec) {
  return (a[0] - b[0]) * (a[0] - b[0]) + (a[1] - b[1]) * (a[1] - b[1]) + (a[2] - b[2]) * (a[2] - b[2]);
}

const boxes = lines.map(parseVec);
const circuits = boxes.map((_, i) => ({ rep: i, boxes: new Set([i]) }));
const connections: [number /* a index */, number /* b index */, number /* dSquared */][] = [];

for (let a = 0; a < boxes.length - 1; a++) {
  for (let b = a + 1; b < boxes.length; b++) {
    const dSquared = d2(boxes[a]!, boxes[b]!);
    dSquared <= MAX_D2 && connections.push([a, b, dSquared]);
  }
}
connections.sort((a, b) => a[2]! - b[2]!);
connections.slice(0, boxes.length < 1000 ? 10 : 1000).forEach(connect);
const sizes = circuits
  .filter((c, i) => c.rep === i)
  .map((c) => c.boxes.size)
  .sort((a, b) => b - a);

console.log(sizes[0]! * sizes[1]! * sizes[2]!);
console.log((performance.now() - begin).toFixed(2) + "ms");
