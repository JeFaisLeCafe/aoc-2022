const { part2, computeMyMove } = require("./index.js").default;
// A, B, C = rock paper scissors by the opponent (them)
// X, Y, Z = defeat equ victory by me

test("test different basic usecases for computeMyMove when you're supposed to loose", () => {
  const testlines = [
    ["A", "X", "scissors"],
    ["B", "X", "rock"],
    ["C", "X", "paper"]
  ];

  testlines.forEach((testline) => {
    expect(computeMyMove(testline)).toBe(testline[2]);
  });
});

test("test different basic usecases for computeMyMove when you're supposed to win", () => {
  const testlines = [
    ["A", "Z", "paper"],
    ["B", "Z", "scissors"],
    ["C", "Z", "rock"]
  ];

  testlines.forEach((testline) => {
    expect(computeMyMove(testline)).toBe(testline[2]);
  });
});

test("test different basic usecases for computeMyMove when you're supposed to draw", () => {
  const testlines = [
    ["A", "Y", "rock"],
    ["B", "Y", "paper"],
    ["C", "Y", "scissors"]
  ];

  testlines.forEach((testline) => {
    expect(computeMyMove(testline)).toBe(testline[2]);
  });
});
