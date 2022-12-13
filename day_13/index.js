import { readFileSync } from "fs";
const file = readFileSync(new URL("./input", import.meta.url)).toString();
const pairs = file
  .split("\n\n")
  .map((pair) => pair.split("\n").map((v) => JSON.parse(v)));

/* CheckValue(a,b)
 	compares a and b
 	returns integer, representing a-b
    positive : wrong order
    0 : equal
 	negative : right order
 */
function checkValue(a, b) {
  let res;
  if (!Array.isArray(a) && !Array.isArray(b))
    return a - b; // both int values, return diff
  else {
    //one at least is array
    if (!Array.isArray(a)) a = [a]; // a wasn't array, now it is
    if (!Array.isArray(b)) b = [b]; // b wasn't array, now it is
    for (var i = 0; i < Math.min(a.length, b.length); i++) {
      // Both array, iterates it
      if ((res = checkValue(a[i], b[i])) != 0) return res; //a and b not equal, stop there
    }
    return a.length - b.length; // both sublist are equal, comparing length
  }
}

function compareValues(v1, v2) {
  // takes 2 values (can be integer or int[]) and returns true if in the right order, false otherwise
  if (!Array.isArray(v1)) v1 = [v1];
  if (!Array.isArray(v2)) v2 = [v2];
  // v1, v2 are arrays
  if (v1.length === 0) return true; // edge case
  if (v1.length > 0 && v2.length === 0) return false;
  // we need to compare the values of the array
  for (let i = 0; i < Math.min(a.length, b.length); i++) {
    // for each item, v1[i] should be <= v2[i]; if one is an array, then we need to go deeper
    if (Array.isArray(v1[i]) || Array.isArray(v2[i])) {
      return compareValues(v1[i], v2[i]);
    }
    if (v1[i] > v2[i] || !v2[i]) return false;
  }

  return true;
}

function comparePair(pair) {
  // takes a pair and return true if in right order, false otherwise
  return checkValue(pair[0], pair[1]);
}

function part1() {
  const resArr = pairs.map((pair) => {
    return comparePair(pair);
  });

  const res = resArr.reduce((acc, v, i) => acc + (i + 1) * (v > 0 ? 0 : 1), 0);
  console.log("part 1: ", res);
  return res;
}
part1(); // 6101

function part2() {
  pairs.push([[[2]], [[6]]]); //add the diviser elements

  let res = pairs
    .flat()
    .sort((a, b) => checkValue(a, b))
    .map((x) => x.toString()); //sort according to checkValue rules
  console.log("PART 2:", (res.indexOf("2") + 1) * (res.indexOf("6") + 1));

  return res;
}
part2();
