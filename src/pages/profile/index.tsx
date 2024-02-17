import './index.scss'
import Header from 'layouts/Header'
import { useEffect, useState } from 'react'
import { useApi } from 'utils/hooks'
import { User, Activity, Dimensions, AverageSessions } from 'utils/types'
import { downScale } from 'utils/helpers'
import ActivityGraph from 'components/ActivityGraph'
import SessionLengthGraph from 'components/SessionLengthGraph'
import { useParams } from 'react-router-dom'

export default function Profile(): JSX.Element {
  const { id } = useParams()
  const [user, setUser] = useState<User>()
  const [activity, setActivity] = useState<Activity>()
  const [averageSessions, setAverageSessions] = useState<AverageSessions>()
  const userApi = useApi(`/user/${id}`)
  const activityApi = useApi(`/user/${id}/activity`)
  const averageSessionApi = useApi(`/user/${id}/average-sessions`)
  const activityDimensions: Dimensions = {
    width: downScale(835),
    height: downScale(320),
    marginTop: downScale(112),
    marginRight: downScale(90),
    marginBottom: downScale(62),
    marginLeft: downScale(43),
  }
  const averageSessionsDimensions: Dimensions = {
    width: downScale(258),
    height: downScale(263),
    marginTop: downScale(40),
    marginRight: downScale(0),
    marginBottom: downScale(35),
    marginLeft: downScale(20),
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

  useEffect(() => {
    if (averageSessionApi) {
      setAverageSessions(averageSessionApi as AverageSessions)
    }
  }, [averageSessionApi])

  return (
    <main className="content">
      {user && <Header name={user.userInfos.firstName} />}
      {activity && (
        <ActivityGraph content={activity} dimensions={activityDimensions} />
      )}
      {averageSessions && (
        <SessionLengthGraph
          content={averageSessions}
          dimensions={averageSessionsDimensions}
        />
      )}
    </main>
  )
}
