const file = Bun.file("src/day-07/input.txt");
const content = await file.text();
const lines = content
  .split("\n")
  .filter(Boolean)
  .map((e) => e.split(""));

let result = 0;

for (let i = 1; i < lines.length; i++) {
  const line = lines[i]!;
  for (let j = 0; j < line.length; j++) {
    const aboveChar = lines[i - 1]![j]!;
    const neighborsChars = [-1, 1].map((e) => lines[i]![j + e]);
    const char = line[j]!;

    if (char === ".") {
      if (aboveChar === "S" || aboveChar === "|") {
        lines[i]![j] = "|";
      } else if (neighborsChars.includes("^")) {
        lines[i]![j] = "|";
      }
    } else if (char === "^" && aboveChar === "|") {
      result++;
    }
  }
}

// console.log(lines.map((e) => e.join("")).join("\n"));
console.log(result);
