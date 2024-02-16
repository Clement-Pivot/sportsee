import { AverageSessions } from 'utils/types'
import './index.scss'

type Props = {
  content: AverageSessions
}

export default function SessionLengthGraph({ content }: Props) {
  return <div className="sessionLengthGraph"></div>
}
