import { Activity } from 'utils/types'
import './index.scss'
import * as d3 from 'd3'
import { useEffect, useRef } from 'react'

type Props = {
  content: Activity
}

export default function ActivityGraph({ content }: Props) {
  const getRange = (range: number[]): number[] => {
    const result: number[] = []
    for (let i = range[0]; i <= range[1]; i++) {
      result.push(i)
    }
    return result
  }
  const weightMinMax: number[] = d3.extent(
    content.sessions.map((s) => s.kilogram),
  )
  // weightMinMax = [76, 81]
  const caloriesMinMax: number[] = d3.extent(
    content.sessions.map((s) => s.calories),
  )
  const weightTicks =
    d3.max(content.sessions.map((s) => s.kilogram)) -
    d3.min(content.sessions.map((s) => s.kilogram))
  // weightTicks = 5
  const weightRange = getRange(weightMinMax)
  // weightRange = [76, 77, 78, 79, 80, 81]
  const width = 835,
    height = 320,
    marginTop = 112,
    marginRight = 90,
    marginBottom = 62,
    marginLeft = 43,
    strokeWidth = 7,
    barOffset = 7,
    gx = useRef<any>(),
    gy = useRef<any>()

  // Declare the x (horizontal position) scale with dates from sessions.
  const x = d3.scaleLinear(
    [1, content.sessions.length],
    [marginLeft, width - marginRight],
  )
  // Declare the y (vertical position) scale from weight.
  const weightYscale = d3.scaleLinear(weightMinMax, [
    height - marginBottom,
    marginTop,
  ])

  const caloriesYscale = d3.scaleLinear(caloriesMinMax, [
    height - marginBottom,
    marginTop,
  ])

  useEffect(
    () => void d3.select(gx.current).call(d3.axisBottom(x).ticks(weightTicks)),
    [gx, x, weightTicks],
  )
  useEffect(
    () =>
      void d3
        .select(gy.current)
        .call(d3.axisRight(weightYscale).ticks(weightTicks)),
    [gy, weightYscale, weightTicks],
  )

  return (
    <>
      <svg className="activity" width={width} height={height}>
        <defs>
          <clipPath id="cut-off-bottom">
            <rect x={0} y={0} width={width} height={height - marginBottom} />
          </clipPath>
        </defs>
        <g
          ref={gx}
          transform={`translate(0,${height - marginBottom})`}
          className="activity__xscale"
          // key="activity__xscale"
        />
        <g
          className="activity__yticks"
          transform={`translate(0,${height - marginBottom})`}
          // key="activity__yticks"
        >
          <line
            x1={marginLeft - strokeWidth - barOffset / 2}
            x2={width - marginRight + strokeWidth + barOffset / 2}
            y1="0"
            y2="0"
            stroke="currentColor"
            strokeWidth="1"
            key={`yAxis-tick-0`}
          />
          {weightRange.map((tick) => (
            <line
              x1={marginLeft - strokeWidth - barOffset / 2}
              x2={width - marginRight + strokeWidth + barOffset / 2}
              y1={-weightYscale(tick) + marginTop}
              y2={-weightYscale(tick) + marginTop}
              stroke="currentColor"
              strokeWidth="1"
              strokeDasharray="2"
              key={`yAxis-tick-${tick}`}
            />
          ))}
        </g>
        <g
          ref={gy}
          transform={`translate(${width - marginRight + barOffset},0)`}
          className="activity__yscale"
          key="activity__yscale"
        />
        <g
          fill="currentColor"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="activity__bars"
          key="activity__bars"
        >
          {content.sessions.map((d, i) => (
            <>
              <line
                key={`activity__weightbar-line-${i}`}
                className="activity__weightbar"
                x1={x(i + 1) - barOffset}
                x2={x(i + 1) - barOffset}
                y1={weightYscale(d.kilogram)}
                y2={height - marginBottom}
              />
              <circle
                key={`activity__weightbar-circle-${i}`}
                className="activity__weightbar"
                cx={x(i + 1) - barOffset}
                cy={weightYscale(d.kilogram)}
                r="0.5"
                strokeWidth={strokeWidth - 1}
                clipPath="url(#cut-off-bottom)"
              />
              <line
                key={`activity__caloriesbar-line-${i}`}
                className="activity__caloriesbar"
                x1={x(i + 1) + barOffset}
                x2={x(i + 1) + barOffset}
                y1={caloriesYscale(d.calories)}
                y2={height - marginBottom}
              />
              <circle
                key={`activity__caloriesbar-circle-${i}`}
                className="activity__caloriesbar"
                cx={x(i + 1) + barOffset}
                cy={caloriesYscale(d.calories)}
                r="0.5"
                strokeWidth={strokeWidth - 1}
                clipPath="url(#cut-off-bottom)"
              />
            </>
          ))}
        </g>
      </svg>
    </>
  )
}
