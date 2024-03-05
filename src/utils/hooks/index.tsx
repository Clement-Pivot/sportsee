import axios from 'axios'
import { useEffect, useState } from 'react'
import {
  User,
  Activity,
  AverageSessions,
  Performance,
  isPerformance,
  isUser,
} from 'utils/types'
import { activity } from 'mock/activity'
import { average } from 'mock/average'
import { performance } from 'mock/performance'
import { user } from 'mock/user'

/**
 * Sanitize API
 * @param {*} object - an API response
 * @returns {(User | Activity | AverageSessions | Performance)}
 */
function sanitizeApi(
  object: any,
): User | Activity | AverageSessions | Performance {
  if (isUser(object) && object.todayScore) {
    object.score = object.todayScore
  }
  if (isPerformance(object)) {
    object.kind[1] = 'Cardio'
    object.kind[2] = 'Energie'
    object.kind[3] = 'Endurance'
    object.kind[4] = 'Force'
    object.kind[5] = 'Vitesse'
    object.kind[6] = 'Intensité'
  }
  return object
}

/**
 * Hook pour utiliser les données mockés.
 * @param {string} url
 * @returns {(User | Activity | AverageSessions | Performance)}
 */
export function useMock(
  url: string,
): User | Activity | AverageSessions | Performance {
  const typeOfDataURLIndex = 3

  if (url.split('/').length <= typeOfDataURLIndex) return sanitizeApi(user)

  const wanted = url.split('/')[typeOfDataURLIndex]

  switch (wanted) {
    case 'user':
      return sanitizeApi(user)
    case 'average-sessions':
      return average
    case 'performance':
      return sanitizeApi(performance)
    case 'activity':
      return activity
    default:
      throw new Error('Unknown API call.')
  }
}

/**
 * Hook pour utiliser l'API du backend.
 * @param {string} url
 * @returns {(User | Activity | AverageSessions | Performance | undefined)}
 */
export function useApi(
  url: string,
): User | Activity | AverageSessions | Performance | undefined {
  const [response, setResponse] = useState<
    User | Activity | AverageSessions | Performance
  >()
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:3000${url}`)
      .then((response) => {
        const data = sanitizeApi(response.data.data)
        setResponse(data)
      })
      .catch((error) => console.error(error))
  }, [url])
  return response
}
