import './index.scss'
import Header from 'layouts/Header'
import { useEffect, useState } from 'react'
import { useApi } from 'utils/hooks'
import { User, Activity, Dimensions } from 'utils/types'
import { downScale } from 'utils/helpers'
import ActivityGraph from 'components/ActivityGraph'
import { useParams } from 'react-router-dom'

export default function Profile(): JSX.Element {
  const { id } = useParams()
  const [user, setUser] = useState<User>()
  const [activity, setActivity] = useState<Activity>()
  const userApi = useApi(`/user/${id}`)
  const activityApi = useApi(`/user/${id}/activity`)
  const activityDimensions: Dimensions = {
    width: downScale(835),
    height: downScale(320),
    marginTop: downScale(112),
    marginRight: downScale(90),
    marginBottom: downScale(62),
    marginLeft: downScale(43),
  }

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
      {activity && (
        <ActivityGraph content={activity} dimensions={activityDimensions} />
      )}
    </main>
  )
}
