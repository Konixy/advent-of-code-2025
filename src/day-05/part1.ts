const file = Bun.file("src/day-05/input.txt");
const content = await file.text();

const ranges = content.split("\n\n")[0]!.split("\n");
let ids = content.split("\n\n")[1]!.split("\n");

ids = ids.filter((e) =>
  ranges.find((v) => {
    const range = v.split("-").map((vv) => Number(vv)) as [number, number];
    const n = Number(e);
    return n >= range[0] && n <= range[1];
  })
);

console.log(ids.length);
