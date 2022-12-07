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

it.only("should multiply  two numbers correctly", () => {
  expect(MathLib.mult(2, 3)).toBe(6)
  expect(MathLib.mult(4, 0)).toBe(0)
  expect(MathLib.mult(4, -1)).toBe(-4)
})

it("should compare object", () => {
  const obj1 = { a: 4, b: 2 }
  const obj2 = { a: 6, b: 2 }

  expect(MathLib.equalObj(obj1, obj2)).toStrictEqual({ a: 10, b: 4 })
})

it("verify property", () => {
  const obj = {
    email: "teste@gmail.com",
    id: "123@323",
  }

  expect(obj).toHaveProperty("email")
})

it("verify error", () => {
  function throwError() {
    throw new Error("Erro")
  }

  expect(() => throwError()).toThrow(new Error("Erro"))
})
