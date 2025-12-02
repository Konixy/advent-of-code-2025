const file = Bun.file("src/day-01/input.txt");
const content = await file.text();
const lines = content.split("\n");

let current = 50;
let zeroCount = 0;

for (const line of lines) {
  if (line === "") continue;

  const dir = line[0] === "R" ? 1 : -1;
  const steps = Number(line.slice(1)) * dir;

  current = mod(current + steps, 100);
  if (current === 0) zeroCount++;
}

function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}

console.log(zeroCount);
