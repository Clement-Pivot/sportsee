import { User } from 'utils/types'
import './index.scss'
import { downScale } from 'utils/helpers'
import * as d3 from 'd3'

/**
 * Score graph prop type
 * @typedef {Props}
 */
type Props = {
  content: User
  dimensions: {
    size: number
  }
}

/**
 * Score graph function component
 * @export
 * @param {Props} param0
 * @param {User} param0.content
 * @param {{ size: number; }} param0.dimensions
 * @returns {JSX.Element}
 */
export default function ScoreGraph({
  content,
  dimensions,
}: Props): JSX.Element {
  const score = content.score
  const arc = d3.arc().cornerRadius(10)

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
              innerRadius: 57,
              outerRadius: 67,
              startAngle: 0,
              endAngle: -(Math.PI * 2 * score),
            }) || ''
          }
          fill="currentColor"
        />
      </g>
      <circle
        cx={dimensions.size / 2}
        cy={dimensions.size / 2}
        r={57}
        fill="currentColor"
        className="score__disc"
      />
      <g
        className="score__value"
        transform={`translate(${dimensions.size / 2},${dimensions.size / 2 - 15})`}
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
        <text transform="translate(0,16)">objectif</text>
      </g>
    </svg>
  )
}
