/**
 * Not sanitized User type
 * @export
 * @typedef {UnsanitizedUser}
 */
export type UnsanitizedUser = {
  id: number
  todayScore?: number
  userInfos: {
    age: number
    firstName: string
    lastName: string
  }
  keyData: {
    calorieCount: number
    carbohydrateCount: number
    lipidCount: number
    proteinCount: number
  }
}

/**
 * Sanitized User type
 * @export
 * @interface User
 * @typedef {User}
 * @extends {UnsanitizedUser}
 */
export interface User extends UnsanitizedUser {
  score: number
}

/**
 * Activity type
 * @export
 * @typedef {Activity}
 */
export type Activity = {
  userId: number
  sessions: {
    day: string
    kilogram: number
    calories: number
  }[]
}

/**
 * One session type
 * @export
 * @typedef {OneSession}
 */
export type OneSession = {
  day: number
  sessionLength: number
}

/**
 * Average sessions type
 * @export
 * @typedef {AverageSessions}
 */
export type AverageSessions = {
  userId: number
  sessions: OneSession[]
}

/**
 * Performance type
 * @export
 * @typedef {Performance}
 */
export type Performance = {
  userId: number
  kind: {
    [index: number]: string
  }
  data: {
    value: number
    kind: number
  }[]
}

/**
 * Dimensions type, for activity graph and average sessions graph
 * @export
 * @typedef {Dimensions}
 */
export type Dimensions = {
  width: number
  height: number
  marginTop: number
  marginRight: number
  marginBottom: number
  marginLeft: number
}

/**
 * Performance type guard function
 * @export
 * @param {*} obj
 * @returns {obj is Performance}
 */
export function isPerformance(obj: any): obj is Performance {
  if (
    typeof obj.userId == 'number' &&
    typeof obj.kind == 'object' &&
    typeof obj.data == 'object'
  ) {
    return true
  } else {
    return false
  }
}

/**
 * User type guard function
 * @export
 * @param {*} obj
 * @returns {obj is User}
 */
export function isUser(obj: any): obj is User {
  if (
    typeof obj.id == 'number' &&
    (typeof obj.score == 'number' || typeof obj.todayScore == 'number') &&
    typeof obj.userInfos == 'object' &&
    typeof obj.keyData == 'object'
  ) {
    return true
  } else {
    return false
  }
}
