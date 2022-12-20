import { readFileSync } from "fs";
const file = readFileSync(new URL("./input", import.meta.url)).toString();

class Voxel {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  isEqual(vox) {
    return vox.x === this.x && vox.y === this.y && vox.z === this.z;
  }
}

let voxels = [];

for (let vox of file
  .split("\n")
  .map((l) => l.split(",").map((c) => parseInt(c)))) {
  voxels.push(new Voxel(vox[0], vox[1], vox[2]));
}

function isConsecutive(x, y) {
  return x > y ? x === y + 1 : x === y - 1;
}

function isAdjacent(a, b) {
  return (
    (a.x == b.x && a.y == b.y && isConsecutive(a.z, b.z)) ||
    (a.x == b.x && a.z == b.z && isConsecutive(a.y, b.y)) ||
    (a.y == b.y && a.z == b.z && isConsecutive(a.x, b.x))
  );
}

function openFaces(voxel, all) {
  const otherVoxels = all.filter(
    (v) => v.x !== voxel.x || v.y !== voxel.y || v.z !== voxel.z
  ); // remove the voxel itself from the list of voxels
  let openFaces = 6; // if it's not connected, it has 6 open faces
  for (const vox of all) {
    // if 2 coord are identic (=if they are adjacents), then remove 1 open face
    if (isAdjacent(vox, voxel)) openFaces -= 1;
  }
  return openFaces;
}

function part1() {
  let res = 0;
  for (let voxel of voxels) {
    res += openFaces(voxel, voxels);
  }
  return res;
}
console.log("part1:", part1()); // 4302

function getAdjacentVoxels(voxel) {
  // return the 6 adjacent voxels from a voxel
  const { x, y, z } = voxel;
  let res = [
    new Voxel(x + 1, y, z),
    new Voxel(x - 1, y, z),
    new Voxel(x, y - 1, z),
    new Voxel(x, y + 1, z),
    new Voxel(x, y, z - 1),
    new Voxel(x, y, z + 1)
  ];

  return res;
}

function isAnAirBubble(v) {
  const adjVoxs = getAdjacentVoxels(v);
  if (v.isEqual(new Voxel(2, 2, 2))) console.log("adj", adjVoxs);
  // if all adjVoxs are lava (= part of voxes) then return true; false otherwise
  for (const vox of adjVoxs) {
    // for each adjacent, we check if we can find it in voxels; if not, return false;
    const match = voxels.some((a) => a.isEqual(vox));
    if (v.isEqual(new Voxel(2, 2, 2)))
      console.log("match", match, "with ", vox);
    if (!match) return false;
  }
  return voxels.some((e) => e.isEqual(v));
}

function findAirBubbles() {
  const airBubbles = [];
  for (const v of voxels) {
    // for each voxel, we check all adjacent ones, and see if they are "surronded"
    for (let vox of getAdjacentVoxels(v))
      if (isAnAirBubble(vox)) airBubbles.push(vox);
  }
  return airBubbles;
}

function part2() {
  const airBubbles = findAirBubbles();
  console.log("airBubbles", airBubbles);
  const vox = [...voxels, ...airBubbles];
  console.log("vox", vox);
  let res = 0;

  for (let voxel of vox) {
    res += openFaces(voxel, vox);
  }
  return res;
}
console.log("part2:", part2());
