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
