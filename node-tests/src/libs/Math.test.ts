import * as MathLib from "./Math"

it("should sum two numbers correctly", () => {
  expect(MathLib.sum(1, 2)).toBe(3)
})

it("should subtract two numbers correctly", () => {
  expect(MathLib.sub(2, 1)).toBe(1)
  expect(MathLib.sub(1, 2)).toBe(-1)
  expect(MathLib.sub(0, 2)).toBe(-2)
  expect(MathLib.sub(2, 0)).toBe(2)
})

it("should divide two numbers correctly", () => {
  expect(MathLib.div(2, 0)).toBe(false)
  expect(MathLib.div(4, 2)).toBe(2)
})

it("should multiply two numbers correctly", () => {
  expect(MathLib.mult(2, 3)).toBe(6)
  expect(MathLib.mult(4, 0)).toBe(0)
  expect(MathLib.mult(4, -1)).toBe(-4)
})
