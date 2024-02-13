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
  const caloriesMinMax: number[] = d3.extent(
    content.sessions.map((s) => s.calories),
  )
  console.log(content.sessions)
  const weightTicks =
    d3.max(content.sessions.map((s) => s.kilogram)) -
    d3.min(content.sessions.map((s) => s.kilogram))
  // console.log(weightTicks)
  const weightRange = getRange(weightMinMax)
  const width = 702,
    height = 145,
    marginTop = 30,
    marginRight = 30,
    marginBottom = 30,
    marginLeft = 30,
    strokeWidth = 7,
    barOffset = 7,
    gx = useRef<any>(),
    gy = useRef<any>()

  console.log(weightMinMax)
  // Declare the x (horizontal position) scale with dates from sessions.
  const x = d3.scaleLinear(
    [1, content.sessions.length],
    [marginLeft, width - marginRight],
  )
  const xTicks = weightRange.map((tick) => (
    <line
      x1={marginLeft}
      x2={width - marginRight}
      y1="0"
      y2="0"
      stroke="orange"
      strokeWidth="5"
    />
  ))
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
        />
        {/* <g
          className="activity__xticks"
          transform={`translate(0,${height - marginBottom})`}
        >
          {xTicks}
        </g> */}
        <g
          ref={gy}
          transform={`translate(${width - marginRight + barOffset},0)`}
          className="activity__yscale"
        />
        <g
          fill="currentColor"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="activity__weightbar"
          key="activity__weightbar"
        >
          {content.sessions.map((d, i) => (
            <>
              <line
                key={`activity__weightbar-line-${i}`}
                x1={x(i + 1) - barOffset}
                x2={x(i + 1) - barOffset}
                y1={weightYscale(d.kilogram)}
                y2={height - marginBottom}
              />
              <circle
                key={`activity__weightbar-circle-${i}`}
                cx={x(i + 1) - barOffset}
                cy={weightYscale(d.kilogram)}
                r="0.5"
                strokeWidth={strokeWidth - 1}
                clipPath="url(#cut-off-bottom)"
              />
            </>
          ))}
        </g>
        <g
          fill="currentColor"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="activity__caloriesbar"
          key="activity__caloriesbar"
        >
          {content.sessions.map((d, i) => (
            <>
              <line
                key={`activity__caloriesbar-line-${i}`}
                x1={x(i + 1) + barOffset}
                x2={x(i + 1) + barOffset}
                y1={caloriesYscale(d.calories)}
                y2={height - marginBottom}
              />
              <circle
                key={`activity__caloriesbar-circle-${i}`}
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
