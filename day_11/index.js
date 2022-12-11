import { readFileSync } from "fs";
const content = readFileSync(new URL("./input", import.meta.url)).toString();

class Monkey {
  constructor(monkeyId, items, stressLevelOperation, passToMonkey) {
    this.monkeyId = monkeyId;
    this.items = items; // top item is the first (id: 0 ), last is the last
    this.stressLevelOperation = stressLevelOperation; // function returning a number: (stressLevel) => newStressLevel
    this.passToMonkey = passToMonkey; // function returning a monkeyId: (stressLevel) => 1/0
    this.itemsInspected = 0;
  }
  inspectItem(inspectedItem, worried = false) {
    // what does a Monkey do ?
    // he does weird shit, and throws items to other monkeys
    this.itemsInspected++;
    let stressLevel = this.stressLevelOperation(inspectedItem);
    if (!worried) stressLevel = Math.floor(stressLevel / 3);
    return { monkeyDestinationId: this.passToMonkey(stressLevel), stressLevel };
  }
  receiveItem(item) {
    this.items.push(item);
    return this.items;
  }
}
function getMonkeys() {
  return content.split("\n\n").map((monkey) => {
    const formatted = monkey.split("\n");
    const id = parseInt(formatted[0].match(/[0-9]+/g));
    const items = formatted[1].match(/[0-9]+/g).map((item) => parseInt(item));
    const stressLevelOperation = new Function(
      "old",
      `return ${formatted[2].split("=")[1]}`
    );

    const passToMonkey = (stressLvl) =>
      stressLvl % parseInt(formatted[3].match(/[0-9]+/g)) === 0
        ? parseInt(formatted[4].match(/[0-9]+/g))
        : parseInt(formatted[5].match(/[0-9]+/g));

    return new Monkey(id, items, stressLevelOperation, passToMonkey);
  });
}

function findBestMonkey(monkeys) {
  return monkeys.reduce((acc, value) =>
    value.itemsInspected > acc.itemsInspected ? value : acc
  );
}

function playARound(monkeys, worried = false) {
  // we need to play ROUNDS rounds, one monkey at a time

  for (let monkey of monkeys) {
    for (let item of monkey.items) {
      const { monkeyDestinationId, stressLevel } = monkey.inspectItem(
        item,
        worried
      );
      monkeys[monkeyDestinationId].receiveItem(stressLevel);
    }
    monkey.items = [];
  }
  return monkeys;
}

function getMonkeyBusiness(monkeys) {
  let best = findBestMonkey(monkeys);
  monkeys.splice(best.monkeyId, 1);
  let second = findBestMonkey(monkeys);
  console.log({ best, second });

  const monkeyBusiness = best.itemsInspected * second.itemsInspected;
  return monkeyBusiness;
}

function part1() {
  const ROUNDS = 20;
  let monkeys = getMonkeys();

  for (let i = 1; i <= ROUNDS; i++) {
    monkeys = playARound(monkeys);
  }
  // now we have the "final" state of the game
  // we need to find the 2 with the most inspected items, and return these numbers multiplied
  return getMonkeyBusiness(monkeys);
}

console.log("PART 1:", part1()); // 117640

function part2() {
  const ROUNDS = 10_000;
  let monkeys = getMonkeys();

  for (let i = 1; i <= ROUNDS; i++) {
    monkeys = playARound(monkeys, true);
  }
  // now we have the "final" state of the game
  // we need to find the 2 with the most inspected items, and return these numbers multiplied
  return getMonkeyBusiness(monkeys);
}
console.log("PART 2:", part2()); //
