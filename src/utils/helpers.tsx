export function downScale(length: number): number {
  const width = document.body.getBoundingClientRect().width
  const originalWidth = 1440
  return (length * width) / originalWidth
}

export function getRange(range: number[]): number[] {
  const result: number[] = []
  for (let i = range[0]; i <= range[1]; i++) {
    result.push(i)
  }
  return result
}
