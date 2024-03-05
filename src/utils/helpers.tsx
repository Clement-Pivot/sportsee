export function downScale(
  length: number,
  originalLength: number = 1440,
): number {
  const width = document.body.getBoundingClientRect().width
  return (length * width) / originalLength
}

export function getRange(range: number[]): number[] {
  const result: number[] = []
  for (let i = range[0]; i <= range[1]; i++) {
    result.push(i)
  }
  return result
}
