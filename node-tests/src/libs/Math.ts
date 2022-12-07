export function sum(n1: number, n2: number) {
  return n1 + n2
}

export function sub(n1: number, n2: number) {
  return n1 - n2
}

export function div(n1: number, n2: number) {
  if (n2 === 0) return false

  return n1 / n2
}

export function mult(n1: number, n2: number) {
  return n1 * n2
}

export function equalObj(
  obj1: { a: number; b: number },
  obj2: { a: number; b: number },
) {
  return { a: obj1.a + obj2.a, b: obj1.b + obj2.b }
}
