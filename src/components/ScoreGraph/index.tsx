import { User } from 'utils/types'
import './index.scss'
import { downScale } from 'utils/helpers'
import * as d3 from 'd3'

type Props = {
  content: User
  dimensions: {
    size: number
  }
}

export default function ScoreGraph({ content, dimensions }: Props) {
  const score = content.score || content.todayScore || 0
  const arc = d3.arc().cornerRadius(10)

  //   console.log(score)

  return (
    <svg className="score" width={dimensions.size} height={dimensions.size}>
      <g
        className="score__legend"
        transform={`translate(${downScale(30)},${downScale(34)})`}
      >
        <text>Score</text>
      </g>
      <g
        className="score__bar"
        transform={`translate(${dimensions.size / 2},${dimensions.size / 2})`}
      >
        <path
          d={
            arc({
              innerRadius: 50,
              outerRadius: 60,
              startAngle: 0,
              endAngle: -(Math.PI * 2 * score),
            }) || ''
          }
          fill="currentColor"
        />
      </g>
      <g
        className="score__value"
        transform={`translate(${dimensions.size / 2},${dimensions.size / 2 - 20})`}
        fill="currentColor"
        textAnchor="middle"
        dominantBaseline="middle"
      >
        <text>{score * 100}%</text>
      </g>
      <g
        className="score__description"
        transform={`translate(${dimensions.size / 2}, ${dimensions.size / 2 + 5})`}
        textAnchor="middle"
        dominantBaseline="middle"
        fill="currentColor"
      >
        <text>de votre</text>
        <text transform="translate(0,24)">objectif</text>
      </g>
    </svg>
  )
}
