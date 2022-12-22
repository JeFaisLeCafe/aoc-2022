import { readFileSync } from "fs";
const file = readFileSync(new URL("./input", import.meta.url)).toString();
const map = file.split("\n");

String.prototype.replaceAt = function (index, char) {
  var a = this.split("");
  a[index] = char;
  return a.join("");
};

const instructions = readFileSync(new URL("./instructions", import.meta.url))
  .toString()
  .replaceAll("L", " L ")
  .replaceAll("R", " R ")
  .split(" ");

// should not forget to add 1 to X and Y for code computation
const startingY = 0;
const startingX = map[startingY].split("").indexOf(".");

const moveSign = { 0: ">", 90: "^", 180: "<", 270: "⌄" };

const globalRowSize = map.reduce((acc, v) => Math.max(acc, v.length), 0), // max x
  globalColSize = map.length; // max y

function draw() {
  console.log(map);
  console.log("--------------");
}

function move(direction, distance, startX, startY) {
  // return the end position of the movement {finalX, finalY}
  let finalX = startX,
    finalY = startY;
  console.log("starting point of movement:", { finalX, finalY });
  const directionMovement = {
    x: direction === 0 ? 1 : direction === 180 ? -1 : 0,
    y: direction === 90 ? -1 : direction === 270 ? 1 : 0
  };
  for (let i = 0; i < distance; i++) {
    // we look ahead to check if movement possible
    // different cases: normal, wrap, or blocked
    // for the wrapping we need to get the actual row/col size
    finalX = startX + i * directionMovement.x;
    finalY = startY + i * directionMovement.y;
    if (!map?.[finalY]?.[finalX]) {
      let m = 0;
      // we might need to wrap around
      // we need to look up what's next and find if the next tile is a wall or not
      while (map?.[finalY]?.[finalX] === "") {
        // we keep looking for what's next
        finalY = (finalY + m * directionMovement.y) % globalColSize;
        finalX = (finalX + m * directionMovement.x) % globalRowSize;
        m++;
      }
    } else if (map[finalY][finalX] === "#") {
      // we hit a wall
      return {
        finalX: finalX - directionMovement.x,
        finalY: finalY - directionMovement.y
      };
    }
    map[finalY] = map[finalY].replaceAt(finalX, moveSign[direction]);
    console.log("added ", moveSign[direction], " at position ", {
      finalX,
      finalY
    });
    draw();
  }
  return { finalX, finalY };
}

const facingChange = { R: 270, L: 90 };

function part1() {
  draw();
  let x = startingX,
    y = startingY,
    facing = 0;
  // facing: 0 = right, 90 = up, 180 = left, 270 = down; facing should be % 360
  for (const instruction of instructions) {
    console.log(
      "instruction:",
      instruction,
      "facing",
      facing,
      moveSign[facing]
    );
    // either a facing change or a move
    if (!parseInt(instruction)) {
      // facing change
      facing += facingChange[instruction];
      facing = facing % 360;
    } else {
      const res = move(facing, parseInt(instruction), x, y);
      x = res.finalX;
      y = res.finalY;
    }
    console.log({ x, y });
  }
  return (x + 1) * 4 + (y + 1) * 1000 + facing / 90;
}
console.log("PART1:", part1());
