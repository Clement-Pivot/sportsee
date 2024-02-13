import { Activity } from 'utils/types'
import './index.scss'
import * as d3 from 'd3'
import { useEffect, useRef } from 'react'

type Props = {
  content: Activity
}

export default function ActivityGraph({ content }: Props) {
  const weightTicks =
    d3.max(content.sessions.map((s) => s.kilogram)) -
    d3.min(content.sessions.map((s) => s.kilogram))
  const width = 702,
    height = 145,
    marginTop = 20,
    marginRight = 20,
    marginBottom = 30,
    marginLeft = 40,
    gx = useRef<any>(),
    gy = useRef<any>()

  // Declare the x (horizontal position) scale with dates from sessions.
  //   Pas besoin d'utiliser les dates -_-
  const x = d3.scaleLinear(
    [1, content.sessions.length],
    [marginLeft, width - marginRight],
  )
  // Declare the y (vertical position) scale from weight.
  const y = d3.scaleLinear(d3.extent(content.sessions.map((s) => s.kilogram)), [
    height - marginBottom,
    marginTop,
  ])

  useEffect(
    () => void d3.select(gx.current).call(d3.axisBottom(x).ticks(weightTicks)),
    [gx, x, weightTicks],
  )
  useEffect(
    () => void d3.select(gy.current).call(d3.axisRight(y).ticks(weightTicks)),
    [gy, y, weightTicks],
  )

  return (
    <svg className="activity__container" width={width} height={height}>
      <g
        ref={gx}
        transform={`translate(0,${height - marginBottom})`}
        className="activity__xscale"
      />
      <g
        className="activity__xticks"
        transform={`translate(0,${height - marginBottom - 0})`}
      />
      <g
        ref={gy}
        transform={`translate(${width - marginRight},0)`}
        className="activity__yscale"
      />
      <g fill="currentColor" stroke="none" className="activity__weightbar">
        {content.sessions.map((d, i) => (
          <circle key={i} cx={x(i + 1)} cy={y(d.kilogram as any)} r="4" />
        ))}
      </g>
      <g fill="currentColor" stroke="none" className="activity__caloriesbar">
        {content.sessions.map((d, i) => (
          <circle key={i} cx={x(i)} cy={y(d.calories)} r="4" />
        ))}
      </g>
    </svg>
  )
}
