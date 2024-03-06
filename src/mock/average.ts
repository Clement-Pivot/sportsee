import { AverageSessions } from 'utils/types'

/**
 * Average sessions mocked data
 * @type {AverageSessions}
 */
export const average: AverageSessions = {
  userId: 12,
  sessions: [
    { day: 1, sessionLength: 30 },
    { day: 2, sessionLength: 23 },
    { day: 3, sessionLength: 45 },
    { day: 4, sessionLength: 50 },
    { day: 5, sessionLength: 0 },
    { day: 6, sessionLength: 0 },
    { day: 7, sessionLength: 60 },
  ],
}
