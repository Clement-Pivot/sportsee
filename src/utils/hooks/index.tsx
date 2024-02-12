import { useEffect, useState } from 'react'
import { User, Activity, AverageSessions, Performance } from '/src/utils/types'

export function useApi(
  url: string,
): User | Activity | AverageSessions | Performance {
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
