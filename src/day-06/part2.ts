const file = Bun.file("src/day-06/input.txt");
const content = await file.text();
const lines = content.split("\n").filter(Boolean);

const numbersLines = lines.slice();
numbersLines.pop();
const operandsLine = lines[lines.length - 1]!;

const operands = operandsLine
  .split("")
  .map((v, i) => [v, i])
  .filter((v) => Boolean((v[0]! as string).trim())) as [string, number][];

let result = 0;
for (let i = operands.length - 1; i >= 0; i--) {
  const operand = operands[i]!;
  const index = operand[1];
  const next = operands.find((e) => e[1] > index);
  const maxI = next ? next[1] - 2 : operandsLine.length - 1;

  const nbrs: number[] = [];
  for (let j = maxI; j >= index; j--) {
    let curr = "";
    for (const numberLine of numbersLines) {
      curr += numberLine[j];
    }
    nbrs.push(Number(curr.trim()));
  }

  const op = operand[0];
  const calc = eval(nbrs.join(op));
  result += calc;
}

console.log(result);
