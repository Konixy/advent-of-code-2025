const file = Bun.file("src/day-04/input.txt");
const content = await file.text();

const mat = content
  .split("\n")
  .filter(Boolean)
  .map((e) => e.split(""));

const copy = mat.map((e) => e.slice()).slice();

let result = 0;

for (let i = 0; i < mat.length; i++) {
  for (let j = 0; j < mat[i]!.length; j++) {
    const char = mat[i]![j];

    if (char === "@") {
      const count = countNeighbors(mat, i, j);

      if (count < 4) {
        copy[i]![j] = "x";
        result++;
      }
    }
  }
}

function countNeighbors(mat: string[][], i: number, j: number) {
  const neighbors = [
    [i - 1, j],
    [i + 1, j],
    [i, j - 1],
    [i, j + 1],
    [i - 1, j - 1],
    [i + 1, j + 1],
    [i - 1, j + 1],
    [i + 1, j - 1],
  ];
  let count = 0;

  for (const [x, y] of neighbors as [number, number][]) {
    if (x >= 0 && x < mat.length && y >= 0 && y < mat[x]!.length && mat[x]![y] === "@") count++;
  }

  return count;
}

// console.log(copy.map((e) => e.join("")).join("\n"));
console.log(result);
