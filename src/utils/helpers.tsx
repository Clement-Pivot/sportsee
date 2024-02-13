export function downScale(length: number): number {
  const width = document.body.getBoundingClientRect().width
  const originalWidth = 1440
  return (length * width) / originalWidth
}
