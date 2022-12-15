import { readFileSync } from "fs";
const file = readFileSync(new URL("./input", import.meta.url)).toString();

class Node {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.type = ".";
  }
}

const rockPaths = file.split("\n").map((l) =>
  l.split(" -> ").map((c) => {
    const ccs = c.split(",").map((z) => parseInt(z));
    const node = new Node(ccs[0], ccs[1]);
    node.type = "#";
    return node;
  })
);

function getSize(rkPath) {
  // return the size of the grid
  let minX = rkPath[0].x,
    maxX = rkPath[0].x,
    minY = 0,
    maxY = rkPath[0].y;

  for (const path of rkPath) {
    if (path.x < minX) minX = path.x;
    if (path.x > maxX) maxX = path.x;
    // if (path.y < minY) minY = path.Y;
    if (path.y > maxY) maxY = path.y;
  }

  const res = {
    cols: maxX - minX,
    rows: maxY - minY,
    minX,
    maxX,
    minY,
    maxY
  };
  return res;
}

function getNodesBetween(node, nextNode) {
  // takes [[0,0], [2,0]] and returns [[1,0]]
  let res = [];
  const xDiff = nextNode.x - node.x; // if > 0, nextNode on right, if < 0, nextNode on left, else same row
  const yDiff = nextNode.y - node.y;
  // then we add all nodes to go from node to nextNode
  if (xDiff !== 0) {
    const lowend = xDiff > 0 ? node.x : nextNode.x;
    for (let i = 1; i < Math.abs(xDiff); i++) {
      const n = new Node(lowend + i, node.y);
      n.type = "#";
      res.push(n);
    }
  }
  if (yDiff !== 0) {
    const lowend = yDiff > 0 ? node.y : nextNode.y;
    for (let i = 1; i < Math.abs(yDiff); i++) {
      const n = new Node(node.x, lowend + i);
      n.type = "#";
      res.push(n);
    }
  }
  return res;
}

function getRockNodesInPath(rockPath) {
  // takes [[0,0], [2,0], [2, 2]] and returns [[0,0], [1,0], [2,0], [2,1], [2,2]]
  let allNodes = rockPath.flat(); // we add the nodes from rockPath
  for (let i = 0; i < rockPath.length - 1; i++) {
    const inBetweenNodes = getNodesBetween(rockPath[i], rockPath[i + 1]);
    for (const n of inBetweenNodes) {
      if (!allNodes.includes((v) => v.x === n.x && v.y === n.y))
        allNodes.push(n);
    }
  }

  return allNodes;
}

function getAllRockNodes() {
  let res = [];
  for (const rockPath of rockPaths) {
    const nodesInPath = getRockNodesInPath(rockPath);
    for (const n of nodesInPath) {
      res.push(n);
    }
  }
  return res;
}

function getType(node, rockNodes) {
  // returns "#" if rock, "." if empty, "o" if sand and "+" if sand spawn
  if (node.x === 500 && node.y === 0) return "+";
  if (rockNodes.find((v) => v.x === node.x && v.y === node.y)) return "#";
  return ".";
}

function getGrid() {
  // returns the grid, with "#" if rock, "." if empty, "o" if sand and "+" if sand spawn
  let grid = [];
  let rockNodes = getAllRockNodes();

  const { minX, maxX, minY, maxY } = getSize(rockNodes);
  for (let i = minY; i <= maxY; i++) {
    const row = [];
    for (let j = minX; j <= maxX; j++) {
      const n = new Node(j, i);
      n.type = getType(n, rockNodes);
      row.push(n);
    }
    grid.push(row);
  }
  return grid;
}

function sandFall(grid, sandNode) {
  // return next position
  // first falls vertically
}

function spawnSand(grid) {
  // if flaws out return false
  // else return grid;
}

function part1() {
  const grid = getGrid();
  //   console.log("gri", grid);
}
part1();
