const file = Bun.file("src/day-01/input.txt");
const content = await file.text();
const lines = content.split("\n");

let current = 50;
let zeroCount = 0;

for (const line of lines) {
  if (line === "") continue;

  const dir = line[0];
  const steps = Number(line.slice(1));

  const firstZero = dir === "L" ? (current === 0 ? 100 : current) : current === 0 ? 100 : 100 - current;

  if (steps >= firstZero) {
    zeroCount += Math.floor((steps - firstZero) / 100) + 1;
  }

  if (dir === "L") {
    current = (((current - steps) % 100) + 100) % 100;
  } else {
    current = (current + steps) % 100;
  }
}

console.log(zeroCount);
