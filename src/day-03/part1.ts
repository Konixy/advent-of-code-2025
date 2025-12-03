const file = Bun.file("src/day-03/input.txt");
const content = await file.text();

const lines = content.split("\n").filter(Boolean);

let result = 0;

for (const line of lines) {
  const list = line.split("").map((e) => Number(e));

  const largest = Math.max(...list.slice(0, -1));
  const index = list.indexOf(largest);

  const secondLargest = Math.max(...list.slice(index + 1));

  const joltage = largest * 10 + secondLargest;
  result += joltage;
}

console.log(result);
