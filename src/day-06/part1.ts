const file = Bun.file("src/day-06/input.txt");
const content = await file.text();
const lines = content.split("\n").filter(Boolean);

const operands = lines[lines.length - 1]!.split(" ").filter(Boolean);

const numbersInput = lines.slice();
numbersInput.pop();
const nbrs = numbersInput.map((line) =>
  line
    .split(" ")
    .filter(Boolean)
    .map((e) => Number(e))
);

let result = 0;

for (let i = 0; i < nbrs[0]!.length; i++) {
  const inputs: number[] = [];
  let operand = "";
  for (let j = 0; j < nbrs.length; j++) {
    inputs.push(nbrs[j]![i]!);
    operand = operands[i]!;
  }

  result += eval(inputs.join(operand));
}

console.log(result);
