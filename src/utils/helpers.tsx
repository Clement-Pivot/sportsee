export function downScale(
  length: number,
  originalLength: number = 1440,
): number {
  const width = document.body.getBoundingClientRect().width
  return (length * width) / originalLength
}

export function getRange(min: number, max: number, step: number = 1): number[] {
  const result: number[] = []
  for (let i = min; i <= max; i += step) {
    result.push(i)
  }
  return result
}
