import './index.scss'
import Header from 'components/Header'
import { useEffect, useState } from 'react'
import { useApi } from 'utils/hooks'
import { User, Activity } from 'utils/types'
import ActivityGraph from 'components/ActivityGraph'

export default function Profile(): JSX.Element {
  const [user, setUser] = useState<User>()
  const [activity, setActivity] = useState<Activity>()
  const userApi = useApi('/user/12')
  const activityApi = useApi('/user/12/activity')

  useEffect(() => {
    if (userApi) {
      setUser(userApi as User)
    }
  }, [userApi])

  useEffect(() => {
    if (activityApi) {
      setActivity(activityApi as Activity)
    }
  }, [activityApi])

  return (
    <main className="content">
      {user && <Header name={user.userInfos.firstName} />}
      {activity && <ActivityGraph content={activity} />}
    </main>
  )
}
