// load fs
const fs = require("fs");
// read the file
const content = fs.readFileSync("./input").toString();
// each row is a backpack content
const data = content.split("\n");
const formattedData = data.map((line) => line.split(","));

function part1() {
  // we need to find the ranges contained in the other
  const isRangedContained = (rangeA, rangeB) => {
    // range is "12-14" for example
    const formattedA = rangeA.split("-").map((s) => parseInt(s));
    const formattedB = rangeB.split("-").map((s) => parseInt(s));
    // formatted = [12, 14]
    const isAinB =
      formattedA[0] >= formattedB[0] && formattedA[1] <= formattedB[1];
    const isBinA =
      formattedB[0] >= formattedA[0] && formattedB[1] <= formattedA[1];

    return isAinB || isBinA;
  };

  const res = formattedData.reduce(
    (acc, pair) => acc + isRangedContained(pair[0], pair[1]),
    0
  );
  console.log("res: ", res);
  return res;
}

part1(); // 556

function part2() {
  const isBetween = (x, min, max) => {
    return x >= min && x <= max;
  };

  const isRangesOverlapping = (rangeA, rangeB) => {
    // range is "12-14" for example
    const formattedA = rangeA.split("-").map((s) => parseInt(s)); // formattedA = [14, 14]
    const formattedB = rangeB.split("-").map((s) => parseInt(s)); // formattedB = [12, 14]
    // console.log("formattedB", formattedB);

    const isOverlapping =
      isBetween(formattedA[0], formattedB[0], formattedB[1]) ||
      isBetween(formattedA[1], formattedB[0], formattedB[1]) ||
      isBetween(formattedB[0], formattedA[0], formattedA[1]) ||
      isBetween(formattedB[1], formattedA[0], formattedA[1]);
    return isOverlapping;
  };

  const res = formattedData.reduce(
    (acc, pair) => acc + isRangesOverlapping(pair[0], pair[1]),
    0
  );
  console.log("res 2 part:", res);
  return res;
}
part2(); // 876
