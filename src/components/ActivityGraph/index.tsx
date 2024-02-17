import { Activity, Dimensions } from 'utils/types'
import './index.scss'
import * as d3 from 'd3'
import { useEffect, useRef } from 'react'
import { downScale, getRange } from 'utils/helpers'
import Tooltip from 'components/Tooltip'

type Props = {
  content: Activity
  dimensions: Dimensions
}

type UpdateTooltipProps = {
  d: { kilogram: number; calories: number }
}

export default function ActivityGraph({ content, dimensions }: Props) {
  const weightMinMax: any[] = d3.extent(content.sessions.map((s) => s.kilogram))
  weightMinMax[0] = weightMinMax[0] - 1
  weightMinMax[1] = weightMinMax[1] + 1
  const weightTicks = weightMinMax[1] - weightMinMax[0]
  const weightRange = getRange(weightMinMax)

  const caloriesMinMax: any[] = d3.extent(
    content.sessions.map((s) => s.calories),
  )
  caloriesMinMax[0] = caloriesMinMax[0] - 100
  caloriesMinMax[1] = caloriesMinMax[1] + 100

  const { width, height, marginTop, marginRight, marginBottom, marginLeft } =
    dimensions

  const strokeWidth = 7,
    barOffset = 7,
    gx = useRef<SVGGElement | any>(null),
    gy = useRef<SVGGElement | any>(null),
    tooltipDiv = useRef<HTMLDivElement>(null),
    tooltipWeight = useRef<HTMLSpanElement>(null),
    tooltipCalories = useRef<HTMLSpanElement>(null),
    barsRefs = useRef<SVGGElement[]>([])

  const x = d3.scaleLinear(
    [1, content.sessions.length],
    [marginLeft, width - marginRight],
  )
  const weightYscale = d3.scaleLinear(weightMinMax, [
    height - marginBottom,
    marginTop,
  ])
  const caloriesYscale = d3.scaleLinear(caloriesMinMax, [
    height - marginBottom,
    marginTop,
  ])

  const tooltipContent = (
    <div id="activity__tooltip" ref={tooltipDiv}>
      <span id="activity__tooltip--weight" ref={tooltipWeight}></span>
      <span id="activity__tooltip--calories" ref={tooltipCalories}></span>
    </div>
  )

  useEffect(
    () =>
      void d3
        .select(gx.current)
        .call(d3.axisBottom(x).ticks(content.sessions.length)),
    [gx, x, content.sessions.length],
  )
  useEffect(
    () =>
      void d3
        .select(gy.current)
        .call(d3.axisRight(weightYscale).ticks(weightTicks)),
    [gy, weightYscale, weightTicks],
  )

  function updateTooltip({ d }: UpdateTooltipProps) {
    tooltipWeight!.current!.textContent = `${d.kilogram}kg`
    tooltipCalories!.current!.textContent = `${d.calories}Kcal`
  }

  return (
    <>
      <Tooltip content={tooltipContent} subscribers={barsRefs} />
      <svg className="activity" width={width} height={height}>
        <defs>
          <clipPath id="cut-off-bottom">
            <rect x={0} y={0} width={width} height={height - marginBottom} />
          </clipPath>
        </defs>
        <text
          className="activity__title"
          transform={`translate(${downScale(24)},${downScale(40)})`}
        >
          Activité quotidienne
        </text>
        {/* ------------------------Legend------------------------ */}
        <g
          className="activity__legend"
          transform={`translate(${downScale(500)},${downScale(32)})`}
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
        {/* -----------------------Scales-------------------------- */}
        <g
          ref={gx}
          transform={`translate(0,${height - marginBottom + downScale(15)})`}
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
          transform={`translate(${width - marginRight + downScale(30)},0)`}
          className="activity__yscale"
          key="activity__yscale"
        />
        {/* --------------------Data---------------------- */}
        <g
          fill="currentColor"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="activity__bars"
          key="activity__bars"
        >
          {content.sessions.map((d, i) => (
            <g className="activity__bars--group" key={`activity__bars-${i}`}>
              <rect
                ref={(e) => (barsRefs.current[i] = e as SVGRectElement)}
                onMouseOver={() => updateTooltip({ d })}
                className="activity__bars--background"
                x={x(i + 1) - barOffset * 3}
                y={marginTop - barOffset}
                height={height - marginBottom - marginTop + barOffset}
                width={downScale(56)}
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
