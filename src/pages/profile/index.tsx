import './index.scss'
import Header from 'components/Header'
import { useEffect, useState } from 'react'
import { useApi } from 'utils/hooks'
import { User } from 'utils/types'

export default function Profile(): JSX.Element {
  const [user, setUser] = useState<User>()
  const data = useApi('/user/12')

  useEffect(() => {
    if (data) {
      setUser(data)
    }
  }, [data])
  console.log(user)
  return (
    <main className="content">
      {user && <Header name={user.userInfos.firstName} />}
    </main>
  )
}
