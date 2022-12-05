const startingStacks = [
  "QFLSR",
  "TPGQZN",
  "BQMS",
  "QBCHJZGT",
  "SFNBMHP",
  "GVLSNQCP",
  "FCW",
  "MPVWZGHQ",
  "RNCLDZG"
];

// load fs
const fs = require("fs");
// read the file
const content = fs.readFileSync("./input").toString();
// each row is a backpack content
const data = content.split("\n");
const moveList = data.map((line) => {
  const l = line.replace(/[A-z]/g, "");
  return l
    .split(" ")
    .filter((c) => c)
    .map((c) => parseInt(c));
});
// formattedData = [[ '1', '2', '6' ],  [ '3', '7', '9' ]]

function part1() {
  // formattedData[0] is how many crate must be moved
  // formattedData[1] is from, formattedData[2] is where to

  function moveCrate(stacks, seq) {
    const formattedSeq = [seq[0], seq[1] - 1, seq[2] - 1];

    const moving = stacks[formattedSeq[1]].slice(0, formattedSeq[0]);
    stacks[formattedSeq[1]] = stacks[formattedSeq[1]].slice(formattedSeq[0]);
    stacks[formattedSeq[2]] =
      moving.split("").reverse().join("") + stacks[formattedSeq[2]];
    return stacks;
  }

  let final = [...startingStacks];
  for (let move of moveList) {
    final = moveCrate(final, move);
  }
  console.log("final", final);

  const topCrates = final.reduce((acc, stack) => acc + stack[0], "");
  console.log("topCrates", topCrates);
  return topCrates;
}
part1();

function part2() {
  function moveCrate(stacks, seq) {
    const formattedSeq = [seq[0], seq[1] - 1, seq[2] - 1];

    const moving = stacks[formattedSeq[1]].slice(0, formattedSeq[0]);
    stacks[formattedSeq[1]] = stacks[formattedSeq[1]].slice(formattedSeq[0]);
    stacks[formattedSeq[2]] = moving + stacks[formattedSeq[2]];
    return stacks;
  }

  let final = [...startingStacks];
  for (let move of moveList) {
    final = moveCrate(final, move);
  }
  console.log("final", final);

  const topCrates = final.reduce((acc, stack) => acc + stack[0], "");
  console.log("part 2 topCrates", topCrates);
  return topCrates;
}

part2();
