import { readFileSync } from "fs";
const file = readFileSync(new URL("./input", import.meta.url)).toString();
const sequence = file.split("\n").map((v) => parseInt(v));

function arrayMove(arr, fromIndex, toIndex) {
  var element = arr[fromIndex];
  arr.splice(fromIndex, 1);
  arr.splice(toIndex, 0, element);
}

// [1, 2, -3, 3, -2, 0, 4]
function getNewIndex(index, v) {
  if ((index + v) % (sequence.length - 1) < 0) {
    return ((index + v) % (sequence.length - 1)) + sequence.length - 1;
  } else {
    return (index + v) % (sequence.length - 1);
  }
}

function getValue(arr) {
  // we want the 1000th, 2000th, and 3000th value after 0, wrapping
  const id0 = arr.findIndex((v) => v.value === 0);
  const v1000th = arr[(id0 + 1000) % arr.length].value;
  const v2000th = arr[(id0 + 2000) % arr.length].value;
  const v3000th = arr[(id0 + 3000) % arr.length].value;

  console.log("Value", id0, v1000th, v2000th, v3000th);

  return v1000th + v2000th + v3000th;
}
function hasDuplicates(arr) {
  const seen = new Set();
  const duplicates = arr.filter((n) => seen.size === seen.add(n).size);
  return duplicates;
}

function part1() {
  let res = [...sequence];
  if (hasDuplicates(sequence).length > 0)
    console.log("has Duplicates !!!", hasDuplicates(sequence).length);
  // first implem had an assumption that no duplicates; it does :sweatsmile:
  res = res.map((v) => {
    return { value: v };
  });
  const initialOrder = [...res];

  for (let v of initialOrder) {
    const instantIndex = res.indexOf(v);
    const targetIndex = getNewIndex(instantIndex, v.value);
    arrayMove(res, instantIndex, targetIndex);
  }

  return getValue(res);
}
console.log("part1:", part1()); // 8028

function part2() {
  const initialOrder = sequence.map((v) => {
    return { value: v * 811589153 };
  });
  let res = [...initialOrder];
  Array(10)
    .fill()
    .map(() => {
      for (let v of initialOrder) {
        const instantIndex = res.indexOf(v);
        const targetIndex = getNewIndex(instantIndex, v.value);
        arrayMove(res, instantIndex, targetIndex);
      }
    });
  return getValue(res);
}
console.log("part2:", part2()); // 8798438007673
