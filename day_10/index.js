import { readFileSync } from "fs";
const content = readFileSync(new URL("./input", import.meta.url)).toString();
const instructions = content.split("\n").map((line) =>
  line.split(" ").map((v, i) => {
    if (i === 1) return parseInt(v);
    return v;
  })
);

const CYCLES = 220;

function part1() {
  let register = 1;
  const signalValues = [];
  let cache = 0; // allows us to "pause" for instructions that last more that 1 cycle
  let instructionIndex = 0; // to have a easy look at which instruction line we are at

  for (let i = 1; i <= CYCLES; i++) {
    if (cache === 0) {
      cache = instructions[instructionIndex][0] === "noop" ? 1 : 2;
    }
    if (i % 40 === 20) {
      signalValues.push({ index: i, value: register });
    }
    // end of cycle effect
    // if instruction[0] === "noop" do nothing
    // else
    cache--;
    if (cache === 0) {
      if (instructions[instructionIndex][0] === "addx") {
        register += instructions[instructionIndex][1];
      }
      instructionIndex++;
    }
  }

  const signalStrength = signalValues.reduce(
    (acc, v) => acc + v.index * v.value,
    0
  );
  console.log("part1: ", signalStrength, signalValues);
}
part1(); // 12460

function updateScreen(screen, row, col, value) {
  const newScreen = JSON.parse(JSON.stringify(screen));
  newScreen[row][col] = value;
  return newScreen;
}

function formatScreen(screen) {
  return screen.map((l) => l.join(""));
}

function part2() {
  let register = 1;
  let screen = new Array(6).fill(new Array(40).fill("."));
  let cache = 0; // allows us to "pause" for instructions that last more that 1 cycle
  let instructionIndex = 0; // to have a easy look at which instruction line we are at

  function draw(spritePosition, currentPosition) {
    return spritePosition - 1 === currentPosition ||
      spritePosition === currentPosition ||
      spritePosition + 1 === currentPosition
      ? "#"
      : ".";
  }

  for (let i = 0; i < 240; i++) {
    if (cache === 0) {
      cache = instructions[instructionIndex][0] === "noop" ? 1 : 2;
    }

    //draw or not draw
    const row = Math.floor(i / 40),
      col = i % 40;
    const newValue = draw(register, i % 40);
    screen = updateScreen(screen, row, col, newValue);

    // end of cycle effect
    // if instruction[0] === "noop" do nothing
    cache--;
    if (cache === 0) {
      if (instructions[instructionIndex][0] === "addx") {
        register += instructions[instructionIndex][1];
      }
      instructionIndex++;
    }
  }

  const formattedScreen = formatScreen(screen);

  console.log("part2: ", formattedScreen);
  return formattedScreen;
}
part2(); // EZFPRAKL
