export type User = {
  id: number
  todayScore: number
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
    1: string
    2: string
    3: string
    4: string
    5: string
    6: string
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
