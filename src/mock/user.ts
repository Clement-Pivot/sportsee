import { UnsanitizedUser } from 'utils/types'

/**
 * User mocked data (not sanitized)
 * @type {UnsanitizedUser}
 */
export const user: UnsanitizedUser = {
  id: 12,
  userInfos: { firstName: 'Karl', lastName: 'Dovineau', age: 31 },
  todayScore: 0.12,
  keyData: {
    calorieCount: 1930,
    proteinCount: 155,
    carbohydrateCount: 290,
    lipidCount: 50,
  },
}
