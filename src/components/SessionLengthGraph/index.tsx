import './index.scss'
import { AverageSessions, Dimensions } from 'utils/types'
import { downScale } from 'utils/helpers'
import d3 from 'd3'
import { useRef } from 'react'

type Props = {
  content: AverageSessions
  dimensions: Dimensions
}

export default function SessionLengthGraph({ content, dimensions }: Props) {
  const { width, height, marginTop, marginRight, marginBottom, marginLeft } =
    dimensions
  const gx = useRef<SVGGElement>(null)
  const days = ['L', 'M', 'M', 'J', 'V', 'S', 'D']

  console.log(content)

  return (
    <svg className="sessions" width={width} height={height}>
      <text
        className="sessions__title"
        fill="currentColor"
        transform={`translate(15,25)`}
      >
        Durée moyenne
      </text>
      <text
        className="sessions__title"
        fill="currentColor"
        transform={`translate(15,45)`}
      >
        des sessions
      </text>
      <rect
        className="sessions__weekend"
        width={(width * 2) / 7}
        height={height}
        transform={`translate(${(width * 5) / 7},0)`}
        fill="currentColor"
      />
      <g ref={gx} transform={`translate(0,0)`} className="sessions__scale" />
    </svg>
  )
}
