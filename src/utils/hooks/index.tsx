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
    fetch(`http://127.0.0.1:3000${url}`)
      .then((res) => {
        if (res.ok) {
          try {
            return res.json()
          } catch (e: any) {
            throw new Error(e.message)
          }
        } else {
          return new Error('Problème acces API')
        }
      })
      .then((data) => {
        setResponse(data.data)
      })
  }, [url])
  return response
}
