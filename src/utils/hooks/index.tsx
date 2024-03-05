import axios from 'axios'
import { useEffect, useState } from 'react'
import { User, Activity, AverageSessions, Performance } from 'utils/types'
import { activity } from 'mock/activity'
import { average } from 'mock/average'
import { performance } from 'mock/performance'
import { user } from 'mock/user'

export function useMock(
  url: string,
): User | Activity | AverageSessions | Performance {
  const typeOfDataURLIndex = 3

  if (url.split('/').length <= typeOfDataURLIndex) return user

  const wanted = url.split('/')[typeOfDataURLIndex]

  switch (wanted) {
    case 'user':
      return user
    case 'average-sessions':
      return average
    case 'performance':
      return performance
    case 'activity':
      return activity
    default:
      throw new Error('Unknown API call.')
  }
}

export function useApi(
  url: string,
): User | Activity | AverageSessions | Performance | undefined {
  const [response, setResponse] = useState<
    User | Activity | AverageSessions | Performance
  >()
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:3000${url}`)
      .then((response) => setResponse(response.data.data))
      .catch((error) => console.error(error))
  }, [url])
  return response
}
