// load fs
import { readFileSync } from "fs";
// read the file
const content = readFileSync(new URL("./input", import.meta.url)).toString();
// each row is a backpack content
const data = content.split("\n");
const formattedData = data.map((line) => line.split(" "));

const options = ["rock", "paper", "scissors"];
const modulo = options.length;

function part1() {
  let score = 0;
  const values = { X: 1, Y: 2, Z: 3, A: 1, B: 2, C: 3 };

  function computeScore(line) {
    // takes ["A", "Y"] as input
    const score = values[line[1]] + hasWon(line);
    return score;
  }

  function hasWon(line) {
    // could do with lots of switches
    // or could do with cool modulo
    let me = values[line[1]],
      them = values[line[0]];

    if (them % modulo === me - 1) {
      return 6;
    } else if (me % modulo === them - 1) {
      return 0;
    } else {
      return 3;
    }
  }

  for (let game of formattedData) {
    score += computeScore(game);
  }

  console.log("part1: ", score);
  return score;
}
part1();
// part1:  13682

const values = {
  A: 1,
  B: 2,
  C: 3,
  X: 0,
  Y: 3,
  Z: 6,
  rock: 1,
  paper: 2,
  scissors: 3
};

function computeMyMove(line) {
  // since in part 2 we don't have our move but the end result expected, we need to figure out which move we have to play
  // return "paper", "rock", or "scissors"
  let move = 0;

  let result = values[line[1]],
    them = values[line[0]];

  if (result === 0) {
    move = (them + 1) % modulo;
  } else if (result === 6) {
    move = them % modulo;
  } else {
    move = them - 1; // we need the index, we have index+1 with them
  }
  return options[move];
}

function part2(inputData) {
  let score = 0;

  function computeScore(line) {
    const score = values[line[1]] + values[computeMyMove(line)];
    return score;
  }

  for (let game of inputData) {
    score += computeScore(game);
  }

  console.log("part2: ", score);
  return score;
}

part2(formattedData);
// part2: 12881

export default { part1, part2, computeMyMove };
