// load fs
const fs = require("fs");
// read the file
const content = fs.readFileSync("./input").toString();

const data = content.split("\n\n");

const summedData = [];

for (let elf of data) {
  // can be 1 or more lines of number string
  const sum = elf.split("\n").reduce((a, b) => a + parseInt(b), 0);
  summedData.push(sum);
}
console.log("MAX", Math.max(...summedData));
// MAX 71934
console.log(
  "MAX 3",
  summedData
    .sort((a, b) => a - b)
    .splice(summedData.length - 3, summedData.length - 1)
    .reduce((a, b) => a + b, 0)
);
// MAX 3 211447
