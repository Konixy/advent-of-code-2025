const file = Bun.file("src/day-02/input.txt");
const content = await file.text();

const ranges = content
  .split("\n")[0]!
  .split(",")
  .map((r) => r.split("-").map((v) => Number(v))) as [number, number][];

let result = 0;

for (const range of ranges) {
  for (let i = range[0]; i <= range[1]; i++) {
    const v = String(i);
    if (v.length % 2 !== 0) continue;
    const firstHalf = v.slice(0, v.length / 2);
    const secondHalf = v.slice(v.length / 2);
    if (firstHalf === secondHalf) result += i;
  }
}

console.log(result);
