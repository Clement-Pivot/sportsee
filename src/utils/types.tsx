export type User = {
  id: number
  score?: number
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

export type Activity = {
  userId: number
  sessions: {
    day: string
    kilogram: number
    calories: number
  }[]
}

export type OneSession = {
  day: number
  sessionLength: number
}

export type AverageSessions = {
  userId: number
  sessions: OneSession[]
}

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

export type Dimensions = {
  width: number
  height: number
  marginTop: number
  marginRight: number
  marginBottom: number
  marginLeft: number
}

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
