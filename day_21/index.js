import { readFileSync } from "fs";
const file = readFileSync(new URL("./input", import.meta.url)).toString();
const monkeys = file.split("\n").map((l) => {
  return l.split(": ");
});

let parsedMonkeys = {};
function compute() {
  monkeys.forEach((l) => {
    // l = ["aavv", "12"] or ["okpk", "qqcb + blkl"];
    // if ["aavv", "12"]
    if (!parsedMonkeys?.[l[0]] && parsedMonkeys?.[l[0]] !== "root")
      parsedMonkeys[l[0]] = getValue(l[1]);
  });
  return parsedMonkeys;
}

function getValue(v) {
  // v = "12" or "qqcb + blkl"
  if (parseInt(v)) {
    return parseInt(v);
  } else if (!v) {
    // console.log("ERROR", v);
  } else {
    // if  "qqcb + blkl"

    let [a, sign, b] = v.split(" ");
    // console.log({ a, sign, b });
    if (!findLineFromCode(b) || !findLineFromCode(a)) {
      console.log("ERROR: ", v, a, b, findLineFromCode(a), findLineFromCode(b));
    }
    if (!parsedMonkeys?.[a]) {
      //   console.log("findLineFromCode(a)", findLineFromCode(a));
      const r = getValue(findLineFromCode(a)[1]);
      parsedMonkeys[a] = r;
    }
    if (!parsedMonkeys?.[b]) {
      //   console.log("findLineFromCode(b)", findLineFromCode(b));
      const r = getValue(findLineFromCode(b)[1]);
      parsedMonkeys[b] = r;
    }
    // console.log("eval str", parsedMonkeys[a], sign, parsedMonkeys[b]);
    const str = `${parsedMonkeys[a]} ${sign} ${parsedMonkeys[b]}`;
    return eval(str);
  }
}

function findLineFromCode(code) {
  return monkeys.find((l) => l[0] === code);
}

function part1() {
  const arr = compute();
  return arr["root"];
}
console.log("PART 1:", part1()); // 21208142603224

function clear(v) {
  // clear the values of parsedMonkeys
  parsedMonkeys = { humn: v };
}

function part2() {
  // now we need to change value of key "humn" so that "bzrn" === "gvhs"
  // value of "humn" is now what we want (and need to find)
  // we can try to brutforce this, by adding 1 to the value of "humn" until it equald the other part of the equality of root
  //   const [left, right] = findLineFromCode("root")[1].split(" + ");
  //   console.log({ left, right });
  const left = "bzrn",
    right = "gvhs";

  parsedMonkeys["humn"] = 3_882_224_466_122; // found by rough trial and error estimations

  while (parsedMonkeys[left] !== parsedMonkeys[right]) {
    const v = parsedMonkeys["humn"] + 1;
    clear(v);
    compute();
    console.log(
      "humn",
      parsedMonkeys["humn"],
      parsedMonkeys[left] - parsedMonkeys[right]
    );
    getValue(findLineFromCode("root")[1]);
  }
  return parsedMonkeys["humn"];
}
console.log("PART 2:", part2()); // 3882224466191
