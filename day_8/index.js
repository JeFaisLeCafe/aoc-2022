import { readFileSync } from "fs";
const content = readFileSync(new URL("./input", import.meta.url)).toString();
const lines = content.split("\n");
const grid = lines.map((line) =>
  line.split("").map((treeHeight) => parseInt(treeHeight))
); // grid = [[1,2,3], [4,5,6], [7,8,9]]
const gridSize = grid.length;

function isVisible(x, y, treeValue) {
  // we only need to know if it's visible on up/down/left/right; any one is fine
  // tree is visible if all before or after are smaller strictly
  // first we check in the same line
  const isVisibleFromLeft =
    grid[x].filter((v, i) => v >= treeValue && i < y).length === 0;
  const isVisibleFromRight =
    grid[x].filter((v, i) => v >= treeValue && i > y).length === 0;

  // then the column
  const column = grid.map((line) => line[y]);

  const isVisibleFromUp =
    column.filter((v, i) => v >= treeValue && i < x).length === 0;
  const isVisibleFromDown =
    column.filter((v, i) => v >= treeValue && i > x).length === 0;

  const isVisible =
    isVisibleFromDown ||
    isVisibleFromUp ||
    isVisibleFromRight ||
    isVisibleFromLeft;

  return isVisible;
}

function part1() {
  // we need to check for every inner tree, if it's visible
  let visibleTrees = 4 * gridSize - 4;
  for (let i = 1; i < gridSize - 1; i++) {
    for (let j = 1; j < gridSize - 1; j++) {
      visibleTrees += isVisible(i, j, grid[i][j]);
    }
  }

  console.log("part 1: ", visibleTrees);
  return visibleTrees;
}
part1(); // 1538

// ------

function scenicScore(x, y, treeValue) {
  // scenic score is the view distance of the 4 directions, multiplied together

  let [leftViewDistance, rightViewDistance, upViewDistance, downViewDistance] =
    [[], [], [], []];

  for (let i = 1; i < gridSize - 1; i++) {
    if (
      (grid?.[x]?.[y - i] >= 0 &&
        leftViewDistance?.[leftViewDistance.length - 1] < treeValue) ||
      (grid?.[x]?.[y - i] && leftViewDistance.length === 0)
    )
      leftViewDistance.push(grid?.[x]?.[y - i]);
    if (
      (grid?.[x]?.[y + i] >= 0 &&
        rightViewDistance?.[rightViewDistance.length - 1] < treeValue) ||
      (grid?.[x]?.[y + i] && rightViewDistance.length === 0)
    )
      rightViewDistance.push(grid?.[x]?.[y + i]);
    if (
      (grid?.[x - i]?.[y] >= 0 &&
        upViewDistance?.[upViewDistance.length - 1] < treeValue) ||
      (grid?.[x - i]?.[y] && upViewDistance.length === 0)
    )
      upViewDistance.push(grid?.[x - i]?.[y]);
    if (
      (grid?.[x + i]?.[y] >= 0 &&
        downViewDistance?.[downViewDistance.length - 1] < treeValue) ||
      (grid?.[x + i]?.[y] && downViewDistance.length === 0)
    )
      downViewDistance.push(grid?.[x + i]?.[y]);
  }

  const viewDistance =
    leftViewDistance.length *
    rightViewDistance.length *
    upViewDistance.length *
    downViewDistance.length;

  return viewDistance;
}

function part2() {
  let maxScenicScore = 0;
  for (let i = 1; i < gridSize - 1; i++) {
    for (let j = 1; j < gridSize - 1; j++) {
      const score = scenicScore(i, j, grid[i][j]);
      if (score > 0) if (score > maxScenicScore) maxScenicScore = score;
    }
  }

  console.log("part 2: ", maxScenicScore);
  return maxScenicScore;
}
part2(); // 496125
