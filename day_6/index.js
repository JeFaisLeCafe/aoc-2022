// load fs
const fs = require("fs");
// read the file
const content = fs.readFileSync("./input").toString();
// each row is a backpack content
const data = content.split("");

const length = data.length;

function findMarkerIndex(markerSize) {
  for (let i = markerSize; i < length; i++) {
    const marker = data.slice(i - markerSize, i);
    const setMarker = [...new Set(marker)];

    if (setMarker.length === markerSize) return i;
  }
  return -1;
}

function part1() {
  const res = findMarkerIndex(4);
  console.log("res1: ", res);
}

part1();

function part2() {
  const res = findMarkerIndex(14);
  console.log("res2: ", res);
}
part2();
