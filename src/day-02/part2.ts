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
    const l = v.length;

    for (let j = 1; j < v.length; j++) {
      if (l % j !== 0) continue;

      const splitted = splitSeq(v, j);

      if (splitted.every((v) => v === splitted[0])) {
        result += i;
        break;
      }
    }
  }
}

function splitSeq(s: string, n: number) {
  const res: string[] = [];

  for (let i = 0; i < s.length; i += n) {
    res.push(s.slice(i, i + n));
  }

  return res;
}

console.log(result);
