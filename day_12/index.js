import { readFileSync } from "fs";
const file = readFileSync(new URL("./input", import.meta.url)).toString();
const map = file.split("\n").map((line) => line.split(""));

function getDistance(a, b) {
  const x = b.x - a.x;
  const y = b.y - a.y;
  return Math.sqrt(x * x + y * y);
}

class Node {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.value =
      map[y][x] === "S"
        ? "a".charCodeAt()
        : map[y][x] === "E"
        ? "z".charCodeAt()
        : map[y][x].charCodeAt(); // need to check if start or end node
    this.weight = 0; // ration between value / distance; the more the better
    this.targetNodes = [];
    this.isVisited = false;
  }
}

const findNode = (input, nodeValue) => {
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      const v = input[i][j];
      if (v === nodeValue) {
        return new Node(j, i);
      }
    }
  }
  return new Node(-1, -1);
};

const startingNode = findNode(map, "S");
startingNode.value = "a".charCodeAt();
startingNode.isVisited = true;
const endNode = findNode(map, "E");
endNode.value = "z".charCodeAt();

function getAdjacentNodes(node) {
  let res = [];
  // left
  if (node.x - 1 >= 0) res.push(new Node(node.x - 1, node.y));
  // right
  if (node.x + 1 < map[node.y].length) res.push(new Node(node.x + 1, node.y));
  // up
  if (node.y - 1 >= 0) res.push(new Node(node.x, node.y - 1));
  // down
  if (node.y + 1 < map.length) res.push(new Node(node.x, node.y + 1));

  return res.filter((n) => getNodeName(n) !== getNodeName(startingNode)); // return everything except starting node
}

const getGraph = (sNode, graph = {}) => {
  // function returning a graph, that is the different nodes and where they point to
  // for each node, we find all next nodes,
  // need to check all 4 adjacent nodes
  let targetNodes = getAdjacentNodes(sNode)
    .filter((node) => {
      return sNode.value + 1 >= node.value;
    })
    .map((n) => {
      n.weight = n.value / getDistance(n, endNode);
      return n;
    });

  const node = new Node(sNode.x, sNode.y);
  node.weight = sNode.value / getDistance(sNode, endNode);
  node.targetNodes = targetNodes.sort((a, b) => b.weight - a.weight);
  if (
    node.targetNodes.length > 1 ||
    getNodeName(endNode) === getNodeName(sNode)
  ) {
    graph[getNodeName(sNode)] = node;
  }
  for (let tNode of targetNodes.filter(
    (node) => !Object.keys(graph).includes(getNodeName(node))
  )) {
    getGraph(tNode, graph);
  }

  return graph;
};

function getNodeName(node) {
  return `node${node.x}-${node.y}`;
}

function drawPath(path) {
  const res = map.map((line, i) => {
    return line.map((n, j) => {
      return ".";
    });
  });

  for (let i = 1; i < path.length; i++) {
    // we need to get the direction and return the appropriate sign: <, >, ^, ⌄
    const n = path[i],
      prev = path[i - 1];
    if (n.x - prev.x > 0) res[prev.y][prev.x] = ">"; // x grows we go right
    if (n.x - prev.x < 0) res[prev.y][prev.x] = "<"; // x shrinks we go left
    if (n.y - prev.y > 0) res[prev.y][prev.x] = "⌄"; // y grows we go down
    if (n.y - prev.y < 0) res[prev.y][prev.x] = "^"; // y shrinks we go up
  }
  console.log("PATH\n", res.map((l) => l.join("")).join("\n"));
  return res;
}

function part1() {
  let graph = getGraph(startingNode);
  // console.log("GRAF", graph);
  // we have the graph, now we need to create a path
  let path = [graph[getNodeName(startingNode)]]; // a serie of nodes

  const selectNextNode = (nodeName) => {
    let availableNodes = graph[nodeName].targetNodes.filter(
      (node) => !graph[getNodeName(node)]?.isVisited
    );

    if (availableNodes.length > 0) {
      // we take the first one in the list as next one
      const returnNodeName = getNodeName(availableNodes[0]);
      const returnNode = graph[returnNodeName];
      if (returnNode === undefined) {
        console.log(
          "ERROR ! : ",
          availableNodes,
          availableNodes.length > 0,
          graph[nodeName]
        );

        if (!graph[returnNodeName]) {
          graph = getGraph(returnNode, graph);
        }
      }
      returnNode.isVisited = true;

      // we update where we passed
      // that means the input targetNodes
      graph[nodeName].targetNodes = graph[nodeName].targetNodes.map((n) => {
        if (n.x === returnNode.x && n.y === returnNode.y) {
          n.isVisited = true;
          return n;
        } else {
          return n;
        }
      });

      return returnNode;
    } else {
      // we have no target, we need to go back once
      // we remove the last entry; and we try it again; but this time since we have used some nodes it should take a different path
      path.pop();

      return selectNextNode(getNodeName(path[path.length - 1]));
    }
  };

  while (
    path[path.length - 1].x !== endNode.x ||
    path[path.length - 1].y !== endNode.y
  ) {
    console.log("--------");
    const nextNode = selectNextNode(getNodeName(path[path.length - 1]));
    path.push(nextNode);
    if (
      path[path.length - 1].x === endNode.x &&
      path[path.length - 1].y === endNode.y
    )
      console.log("END OF THE GAME");
  }

  console.log("path", path);
  drawPath(path);

  const res = path.length - 1;
  console.log("PART 1: ", res);
  return res;
}
part1();
