import { Activity, Dimensions } from 'utils/types'
import './index.scss'
import * as d3 from 'd3'
import { useEffect, useRef } from 'react'
import { downScale } from 'utils/helpers'

type Props = {
  content: Activity
  dimensions: Dimensions
}

type MouseOverProps = {
  d: { kilogram: number; calories: number }
  e: Event
}

export default function ActivityGraph({ content, dimensions }: Props) {
  const getRange = (range: number[]): number[] => {
    const result: number[] = []
    for (let i = range[0]; i <= range[1]; i++) {
      result.push(i)
    }
    return result
  }
  const weightMinMax: any[] = d3.extent(content.sessions.map((s) => s.kilogram))
  // weightMinMax = [76, 81]
  const caloriesMinMax: any[] = d3.extent(
    content.sessions.map((s) => s.calories),
  )
  const weightTicks =
    d3.max(content.sessions.map((s) => s.kilogram as any)) -
    d3.min(content.sessions.map((s) => s.kilogram as any))
  // weightTicks = 5
  const weightRange = getRange(weightMinMax)
  // weightRange = [76, 77, 78, 79, 80, 81]
  const { width, height, marginTop, marginRight, marginBottom, marginLeft } =
    dimensions
  const strokeWidth = 7,
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

  function mouseOver({ e, d }: MouseOverProps): void {
    const tooltip = document.getElementById('activity__tooltip')
    const weight = document.getElementById('activity__tooltip--weight')
    const calories = document.getElementById('activity__tooltip--calories')
    const rect = e?.target?.parentNode?.getElementsByClassName(
      'activity__bars--background',
    )[0]
    if (rect) {
      rect.style.opacity = 1
    }
    if (tooltip && tooltip?.style && weight && calories) {
      tooltip.style.display = 'flex'
      weight.textContent = `${d.kilogram}kg`
      calories.textContent = `${d.calories}Kcal`
    } else {
      throw new Error('No activity tooltip found !!!')
    }
  }

  function mouseMove(e: MouseEvent) {
    const tooltip = document.getElementById('activity__tooltip')
    if (tooltip && tooltip?.style) {
      tooltip.style.left = `${e.pageX + 10}px`
      tooltip.style.top = `${e.pageY - 10}px`
    }
  }

  function mouseLeave(e: MouseEvent) {
    const tooltip = document.getElementById('activity__tooltip')
    const rect = e?.target?.parentNode?.getElementsByClassName(
      'activity__bars--background',
    )[0]
    if (rect) {
      rect.style.opacity = 0
    }
    if (tooltip && tooltip?.style) {
      tooltip.style.display = 'none'
    }
  }

  return (
    <>
      <div id="activity__tooltip">
        <span id="activity__tooltip--weight"></span>
        <span id="activity__tooltip--calories"></span>
      </div>
      <svg className="activity" width={width} height={height}>
        <defs>
          <clipPath id="cut-off-bottom">
            <rect x={0} y={0} width={width} height={height - marginBottom} />
          </clipPath>
        </defs>
        <text
          className="activity__title"
          transform={`translate(${downScale(24)},${downScale(32)})`}
        >
          Activité quotidienne
        </text>
        <g
          className="activity__legend"
          transform={`translate(${downScale(532)},${downScale(28)})`}
        >
          <g>
            <circle
              className="activity__legend--weight"
              cx="0"
              cy="0"
              r="4"
              fill="currentColor"
            />
            <text
              className="activity__legend--text"
              transform="translate(8,4)"
              fill="currentColor"
              fontWeight="600"
            >
              Poids (kg)
            </text>
          </g>
          <g transform={`translate(${downScale(110)},0)`}>
            <circle
              className="activity__legend--calories"
              cx="0"
              cy="0"
              r="4"
              fill="currentColor"
            />
            <text
              className="activity__legend--text"
              transform="translate(8,4)"
              fill="currentColor"
              fontWeight="600"
            >
              Calories brûlées (kCal)
            </text>
          </g>
        </g>
        <g
          ref={gx}
          transform={`translate(0,${height - marginBottom + downScale(16)})`}
          className="activity__xscale"
        />
        <g
          className="activity__yticks"
          transform={`translate(0,${height - marginBottom})`}
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
          transform={`translate(${width - marginRight + downScale(45)},0)`}
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
            <g
              className="activity__bars--group"
              onMouseOver={(e) => mouseOver({ e, d })}
              onMouseMove={(e) => mouseMove(e)}
              onMouseLeave={(e) => mouseLeave(e)}
            >
              <rect
                className="activity__bars--background"
                x={x(i + 1) - barOffset * 3}
                y={marginTop - barOffset}
                height={height - marginBottom - marginTop + barOffset}
                width={x(1)}
                stroke="none"
                key={`activity__bars-background-${i}`}
              />
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
            </g>
          ))}
        </g>
      </svg>
    </>
  )
}
