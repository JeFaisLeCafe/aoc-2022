import { readFileSync } from "fs";
const content = readFileSync(new URL("./input", import.meta.url)).toString();
const lines = content.split("\n");

// idea: reconstruire l'input data sous une forme lisible
// array of arrays ? semble ok
// objets ? plus simple je pense
// chaque dossier est une clé
/*
{
    path: size,
    path2: size2
}
*/

const dirs = {};
const parserPath = []; // ["/", "abcd", "sz"] => current path is "//abcd/sz"

for (const line of lines) {
  // for each line, we want either:
  // - to add a "path - size" in dirs
  // - to add or remove an item of the current path in parserPath, which is the path we are currently, in an array form
  if (/\d+\s\w+/.test(line)) {
    const fileSize = Number(line.match(/\d+/)[0]);

    const path = [];

    parserPath.forEach((dir) => {
      path.push(dir);

      const dirTotal = dirs[path.join("/")] ?? 0;
      dirs[path.join("/")] = dirTotal + fileSize;
    });
  } else if (/\$ cd/.test(line)) {
    const [_, _command, param] = line.split(" ");

    param === ".." ? parserPath.pop() : parserPath.push(param);
  }
}

function part1() {
  const res = Object.values(dirs).reduce(
    (total, dirSize) => (dirSize <= 100000 ? total + dirSize : total),
    0
  );

  console.log("part1: ", res);
  return res;
}
part1(); // 2031851

function part2() {
  // looking for the smallest directory over cutoff
  const sizeToFree = dirs["/"] + 30_000_000 - 70_000_000;
  let res = Infinity;

  for (const value of Object.values(dirs)) {
    if (value > sizeToFree && value < res) {
      res = value;
    }
  }
  console.log("part2: ", res);
  return res;
}
part2(); // 2568781
