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
    day: Date
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
