/**
 * Calculate new length with proportion
 * @param {number} length
 * @param {number} [originalLength=1440]
 * @returns {number}
 */
export function downScale(
  length: number,
  originalLength: number = 1440,
): number {
  const width = document.body.getBoundingClientRect().width
  return (length * width) / originalLength
}

/**
 * Create an array from range[0] to range[1]
 * @param {number} min
 * @param {number} max
 * @param {number} [step=1]
 * @returns {number[]}
 */
export function getRange(min: number, max: number, step: number = 1): number[] {
  const result: number[] = []
  for (let i = min; i <= max; i += step) {
    result.push(i)
  }
  return result
}
