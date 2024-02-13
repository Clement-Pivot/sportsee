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
  console.log(content.sessions)
  const weightTicks =
    d3.max(content.sessions.map((s) => s.kilogram)) -
    d3.min(content.sessions.map((s) => s.kilogram))
  // console.log(weightTicks)
  const weightRange = getRange(weightMinMax)
  const width = 702,
    height = 145,
    marginTop = 20,
    marginRight = 20,
    marginBottom = 20,
    marginLeft = 20,
    gx = useRef<any>(),
    gy = useRef<any>()

  console.log(weightMinMax)
  // Declare the x (horizontal position) scale with dates from sessions.
  //   Pas besoin d'utiliser les dates -_-
  // const xAxis = d3.svg.axis()
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
  const y = d3.scaleLinear(weightMinMax, [height - marginBottom, marginTop])

  useEffect(
    () => void d3.select(gx.current).call(d3.axisBottom(x).ticks(weightTicks)),
    [gx, x, weightTicks],
  )
  useEffect(
    () => void d3.select(gy.current).call(d3.axisRight(y).ticks(weightTicks)),
    [gy, y, weightTicks],
  )

  return (
    <>
      <svg className="activity__container" width={width} height={height}>
        <g
          ref={gx}
          transform={`translate(0,${height - marginBottom})`}
          className="activity__xscale"
        />
        <g
          className="activity__xticks"
          transform={`translate(0,${height - marginBottom - 0})`}
        >
          {/* {xTicks} */}
        </g>
        <g
          ref={gy}
          transform={`translate(${width - marginRight},0)`}
          className="activity__yscale"
        />
        <g
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="7"
          className="activity__weightbar"
        >
          {content.sessions.map((d, i) => (
            <line
              key={`activity__weightbar--${i}`}
              x1={x(i + 1)}
              x2={x(i + 1)}
              y1={y(d.kilogram)}
              y2={height - marginBottom}
            />
          ))}
        </g>
        <g
          fill="currentColor"
          stroke="currentColor"
          // strokeWidth="7"
          className="activity__caloriesbar"
        >
          {content.sessions.map((d, i) => (
            <line
              key={`activity__caloriesbar--${i}`}
              x1={x(i + 1)}
              x2={x(i + 1)}
              y1={y(d.calories)}
              y2={height - marginBottom}
            />
          ))}
        </g>
      </svg>
    </>
  )
}
