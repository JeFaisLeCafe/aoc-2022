// load fs
const fs = require("fs");
// read the file
const content = fs.readFileSync("./input").toString();
// each row is a backpack content
const data = content.split("\n");

// cancer mais nécessaire
let customAscii = {
  a: 1,
  b: 2,
  c: 3,
  d: 4,
  e: 5,
  f: 6,
  g: 7,
  h: 8,
  i: 9,
  j: 10,
  k: 11,
  l: 12,
  m: 13,
  n: 14,
  o: 15,
  p: 16,
  q: 17,
  r: 18,
  s: 19,
  t: 20,
  u: 21,
  v: 22,
  w: 23,
  x: 24,
  y: 25,
  z: 26,

  A: 27,
  B: 28,
  C: 29,
  D: 30,
  E: 31,
  F: 32,
  G: 33,
  H: 34,
  I: 35,
  J: 36,
  K: 37,
  L: 38,
  M: 39,
  N: 40,
  O: 41,
  P: 42,
  Q: 43,
  R: 44,
  S: 45,
  T: 46,
  U: 47,
  V: 48,
  W: 49,
  X: 50,
  Y: 51,
  Z: 52
};

function part1() {
  // now we need to again split each line in half
  const formattedData = data.map((row) => {
    const half = Math.ceil(row.length / 2);
    return [
      row.split("").splice(0, half).join(""),
      row.split("").splice(-half).join("")
    ];
  });

  // fn to return the character that is present in both half
  function getSameChar(str1, str2) {
    let char = 0;
    const obj = str2.split("");
    for (c of str1) {
      let idx = obj.findIndex((s) => s === c);
      if (idx >= 0) {
        char = c;
        return char;
      }
    }
    return char;
  }

  let sum = 0;

  for (let bag of formattedData) {
    // find the common character
    const sameC = getSameChar(bag[0], bag[1]);
    sum += customAscii[sameC];
  }

  console.log("sum", sum);
  // 7990
}
part1();

// ---------

function part2() {
  // same but with 3 bags instead of 2

  let sum = 0;

  // fn to return the character that is present in all of the str
  function getSameChar(str1, str2, str3) {
    const arr1 = str1.split(""),
      arr2 = str2.split(""),
      arr3 = str3.split("");
    for (let c of arr1) {
      if (arr2.includes(c) && arr3.includes(c)) {
        return c;
      }
    }
  }
  // need to format the data in arrays of 3 strings
  let formattedData = [];
  for (let i = 0; i < data.length - 2; i += 3) {
    formattedData.push([data[i], data[i + 1], data[i + 2]]);
  }

  for (let group of formattedData) {
    // now getting the result
    const commonChar = getSameChar(group[0], group[1], group[2]);
    sum += customAscii[commonChar];
  }

  console.log("part 2 sum", sum);
}
part2();
