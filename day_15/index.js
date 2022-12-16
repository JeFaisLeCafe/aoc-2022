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
function getYSize() {
  // returns xMin, xMax
  let yMin = sensors[0][0][1],
    yMax = sensors[0][0][1];

  for (const sensor of sensors) {
    if (sensor[0][1] > yMax) yMax = sensor[0][1];
    if (sensor[1][1] > yMax) yMax = sensor[1][1];
    if (sensor[0][1] < yMin) yMin = sensor[0][1];
    if (sensor[1][1] < yMin) yMin = sensor[1][1];
  }
  return { yMin, yMax: Math.max(4_000_000, yMax) };
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
function isNDetected(a, n) {
  let detected = 0;
  for (const sensor of sensors) {
    if (isInRange(a, sensor)) detected++;
    if (detected === n) return true;
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
// part1(); // 5125700

function getTuning(node) {
  return node[0] * 4000000 + node[1];
}

function part2() {
  // this method DOESN'T WORK IN OUR LIFETIME
  let res = [];
  const { xMin, xMax } = getXSize();
  const { yMin, yMax } = getYSize();

  for (let i = yMin; i <= yMax; i++) {
    // for each row, we do the same (but opposite) as part 1
    for (let j = xMin; j <= xMax; j++) {
      // we need to remove the beacons in the row from the res
      if (
        !isDetected([i, j]) &&
        sensors.filter((v) => v[1][0] === i && v[1][1] === j).length === 0
      ) {
        res.push([i, j]);
        console.log("part2", res, getTuning(res[0]));
        return res;
      }
    }
  }
  console.log("part2", res.length, res);
  return res;
}
// part2();

function getOutsideNodes(sensor) {
  // return all the coord of the nodes on the outside + 1 from the sensor
  let res = [];
  let i = 0;
  // on commence en bas, et on tourne clockwise ?
  const x = sensor[0][0],
    y = sensor[0][1],
    d = sensor[2] + 1;
  const startX = x,
    startY = y + d; // en bas
  const startX2 = x + d,
    startY2 = y; // à droite
  const startX3 = x,
    startY3 = y - d; // en haut
  const startX4 = x - d,
    startY4 = y; // à gauche
  while (startX + i !== startX2 && startY - i !== startY2) {
    res.push([startX + i, startY - i]);
    i++;
  } // bas to droite
  i = 0;
  while (startX2 - i !== startX3 && startY2 - i !== startY3) {
    res.push([startX - i, startY - i]);
    i++;
  } // droite to haut
  i = 0;
  while (startX3 - i !== startX4 && startY3 + i !== startY2) {
    res.push([startX - i, startY + i]);
    i++;
  } // haut to gauche
  i = 0;
  while (startX4 + i !== startX && startY4 + i !== startY) {
    res.push([startX + i, startY + i]);
    i++;
  } // gauche to bas
  return res;
}

function part2bis() {
  // new idea
  // since what we are looking for is hiddenn between all the covered areas, then it should be the only node "inside" the covered area that isn't covered
  // which means that it is on the border of the distance (sensor-beacon) + 1
  // so we take all these nodes, and we check if the are already covered
  // if not, we got our node ?
  for (let sensor of sensors) {
    const outsideNodes = getOutsideNodes(sensor);
    for (let node of outsideNodes) {
      if (
        !isDetected(node) &&
        sensors.filter((v) => v[1][0] === node[0] && v[1][1] === node[1])
          .length === 0
      ) {
        if (
          0 < node[0] &&
          node[0] < 4_000_000 &&
          0 < node[1] &&
          node[1] < 4_000_000
        ) {
          return node;
        }
      }
    }
  }
}
const part2Res = part2bis();
console.log("part2", part2Res, getTuning(part2Res));
