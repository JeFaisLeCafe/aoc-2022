import { readFileSync } from "fs";
const file = readFileSync(new URL("./input", import.meta.url)).toString();

const sensors = file
  .split("\n")
  .map((l) => {
    return l.match(/-?[0-9]+/g).map((c) => {
      return parseInt(c);
    });
  })
  .map((z) => {
    return [
      [z[0], z[1]],
      [z[2], z[3]],
      getDistance([z[0], z[1]], [z[2], z[3]])
    ];
  });

/*
[
  [ [ 2, 18 ], [ 2, 15 ], 13 ],
  [ [ 9, 16 ], [ 10, 16 ], 15 ],
]
*/

function getXSize() {
  // returns xMin, xMax
  let xMin = sensors[0][0][0],
    xMax = sensors[0][0][0];

  for (const sensor of sensors) {
    if (sensor[0][0] > xMax) xMax = sensor[0][0];
    if (sensor[1][0] > xMax) xMax = sensor[1][0];
    if (sensor[0][0] < xMin) xMin = sensor[0][0];
    if (sensor[1][0] < xMin) xMin = sensor[1][0];
  }
  return { xMin: xMin - xMax, xMax: 2 * xMax };
}

function getDistance(a, b) {
  return Math.abs(b[0] - a[0]) + Math.abs(b[1] - a[1]);
}
function isInRange(coord, sensor) {
  // return true if coord is in distance of sensor, false otherwise
  return getDistance(coord, sensor[0]) <= sensor[2];
}
function isDetected(a) {
  // return true if the coordonates are detected, false otherwise;
  for (const sensor of sensors) {
    if (isInRange(a, sensor)) return true;
  }
  return false;
}

function part1() {
  // first we only care about y = 2_000_000
  const Y = 2000000;
  let res = []; // array of positions not
  const { xMin, xMax } = getXSize();

  for (let i = xMin; i <= xMax; i++) {
    // we need to remove the beacons in the row from the res
    if (
      isDetected([i, Y]) &&
      sensors.filter((v) => v[1][0] === i && v[1][1] === Y).length === 0
    )
      res.push([i, Y]);
  }

  console.log("part1: ", res.length);
  return res.length;
}
part1(); // 5125700
