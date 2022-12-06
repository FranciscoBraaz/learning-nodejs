import * as MathLib from "./Math"

it("should sum two numbers correctly", () => {
  expect(MathLib.sum(1, 2)).toBe(3)
})

it("should subtract two numbers correctly", () => {
  expect(MathLib.sub(5, 2)).toBe(3)
})
