import { readFileSync } from "fs";
const data = readFileSync(new URL("./input", import.meta.url)).toString();
const pairs = data.split(`\n`);

const range = (start, stop) =>
  Array.from({ length: stop - start + 1 }, (_, i) => start + i);

let pairsThatMatches = 0;

pairs.forEach((pair) => {
  const elvesRange = pair.split(",");

  let arrayNumbers = [];

  elvesRange.forEach((elfRange) => {
    const rangeNumbers = elfRange.split("-");
    arrayNumbers.push(
      range(parseInt(rangeNumbers[0]), parseInt(rangeNumbers[1]))
    );
  });

  const joinNumbersElfOne = arrayNumbers[0].join(",");
  const joinNumbersElfTwo = arrayNumbers[1].join(",");

  console.log(
    "joinNumbersElfOne",
    joinNumbersElfOne,
    "joinNumbersElfTwo",
    joinNumbersElfTwo
  );

  if (joinNumbersElfOne.includes(joinNumbersElfTwo)) {
    console.log(
      "joinNumbersElfTwo included dans joinNumbersElfOne",
      joinNumbersElfOne,
      joinNumbersElfTwo
    );
    pairsThatMatches++;
  } else if (joinNumbersElfTwo.includes(joinNumbersElfOne)) {
    console.log(
      "joinNumbersElfOne included dans joinNumbersElfTwo",
      joinNumbersElfOne,
      joinNumbersElfTwo
    );
    pairsThatMatches++;
  }
});

console.log(
  "Step 1 - Number of assignment pairs that matches the range : ",
  pairsThatMatches
);
