const file = Bun.file("src/day-03/input.txt");
const content = await file.text();

const lines = content.split("\n").filter(Boolean);

let result = 0;

for (const line of lines) {
  const list = line.split("").map((e) => Number(e));

  const largest: number[] = [];
  let cutOff = -1;

  for (let i = 11; i >= 0; i--) {
    const subList = list.slice(cutOff + 1, i > 0 ? -i : undefined);
    const max = Math.max(...subList);
    largest.push(max);
    cutOff = list.indexOf(max, cutOff + 1);
  }

  const joltage = largest.reduce((p, c) => p * 10 + c);
  result += joltage;
}

console.log(result);
