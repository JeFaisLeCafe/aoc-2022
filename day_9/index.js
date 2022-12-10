import { readFileSync } from "fs";
const content = readFileSync(new URL("./input", import.meta.url)).toString();
const instructions = content.split("\n").map((line) =>
  line.split(" ").map((v, i) => {
    if (i === 1) return parseInt(v);
    return v;
  })
);
const startingPosition = { x: 0, y: 0 };
const DIRECTIONS = {
  U: { x: 0, y: 1 },
  D: { x: 0, y: -1 },
  L: { x: -1, y: 0 },
  R: { x: 1, y: 0 }
};

function getDistance(a, b) {
  const x = b.x - a.x;
  const y = b.y - a.y;
  return Math.sqrt(x * x + y * y);
}

function computeNextIncrement(headPosition, tailPosition, direction) {
  // position : {x, y}
  // direction = "U"
  // return {newHeadPosition, newTailPosition}
  const newHeadPosition = {
    x: headPosition.x + DIRECTIONS[direction].x,
    y: headPosition.y + DIRECTIONS[direction].y
  };
  let newTailPosition;
  const distance = getDistance(newHeadPosition, tailPosition);
  if (distance < 2) {
    newTailPosition = {
      x: tailPosition.x,
      y: tailPosition.y
    };
  } else {
    newTailPosition = { x: headPosition.x, y: headPosition.y };
  }

  return { newHeadPosition, newTailPosition };
}
function are2pointsEqual(a, b) {
  return a.x === b.x && a.y === b.y;
}
function part1() {
  let visitedTailPositions = [startingPosition];
  let headPosition = { ...startingPosition },
    tailPosition = { ...startingPosition };
  for (let instruction of instructions) {
    for (let i = 1; i <= instruction[1]; i++) {
      const { newTailPosition, newHeadPosition } = computeNextIncrement(
        headPosition,
        tailPosition,
        instruction[0]
      );
      headPosition = newHeadPosition;
      tailPosition = newTailPosition;
      if (
        !visitedTailPositions.find((pos) => are2pointsEqual(pos, tailPosition))
      ) {
        visitedTailPositions.push({ ...newTailPosition });
      }
    }
  }
  console.log("part1: ", visitedTailPositions, visitedTailPositions.length);
  return visitedTailPositions.length;
}
// part1(); // 5683

function computeNewTailPosition(
  newHeadPosition,
  formerHeadPosition,
  formerTail
) {
  // this is not correct, as show by the second example of part2 (step2)
  // but I can't figure out how to correct it
  let newTailPosition;
  const distance = getDistance(newHeadPosition, formerTail);
  if (distance < 2) {
    // on bouge pas
    newTailPosition = {
      ...formerTail
    };
  } else {
    newTailPosition = { ...formerHeadPosition };
  }

  return newTailPosition;
}

function computeAllNextIncrement(positions, direction) {
  // position : [{x, y}]
  // direction = "U"
  // return [positions]
  let newPositions = [...positions];

  const newHeadPosition = {
    x: positions[0].x + DIRECTIONS[direction].x,
    y: positions[0].y + DIRECTIONS[direction].y
  };

  newPositions[0] = newHeadPosition;

  for (let i = 1; i < positions.length; i++) {
    // for each of the following nodes, we want to check if it has to move, according to newTailPosition behaviour
    const newTailPosition = computeNewTailPosition(
      newPositions[i - 1],
      positions[i - 1],
      positions[i]
    );
    newPositions[i] = newTailPosition;
  }

  return newPositions;
}

function part2() {
  let positions = new Array(10).fill(startingPosition);
  let visitedTailPositions = [startingPosition];

  // we'll keep track of each node position with this array
  for (let instruction of instructions) {
    console.log("instruction", instruction);
    for (let i = 1; i <= instruction[1]; i++) {
      const newPositions = computeAllNextIncrement(positions, instruction[0]);
      positions = [...newPositions];

      console.log("positions", positions);

      // now we want to update only the array of unique tail position (if i = 9)
      if (
        !visitedTailPositions.find((pos) =>
          are2pointsEqual(pos, newPositions[9])
        )
      ) {
        visitedTailPositions.push(newPositions[9]);
      }
    }
  }

  console.log("part2: ", visitedTailPositions, visitedTailPositions.length);
  return visitedTailPositions.length;
}
part2();
