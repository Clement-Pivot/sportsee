import { User } from 'utils/types'
import './index.scss'

type Props = {
  content: User
}

export default function ScoreGraph({ content }: Props) {
  const score = content.score || content.todayScore
  console.log(score)
  return <svg className="score"></svg>
}
