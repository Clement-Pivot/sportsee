import { useEffect, useState } from 'react'

export function useApi(url: string) {
  const [response, setResponse] = useState()
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
        setResponse(data)
      })
  }, [url])
  return response
}
