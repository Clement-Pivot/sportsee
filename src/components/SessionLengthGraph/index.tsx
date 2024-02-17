import './index.scss'
import { AverageSessions, Dimensions, OneSession } from 'utils/types'
import { downScale } from 'utils/helpers'
import * as d3 from 'd3'
import { useEffect, useRef } from 'react'
import Tooltip from 'components/Tooltip'

type Props = {
  content: AverageSessions
  dimensions: Dimensions
}

export default function SessionLengthGraph({ content, dimensions }: Props) {
  const { width, height, marginTop, marginRight, marginBottom, marginLeft } =
    dimensions
  const sessions = content.sessions

  const gx = useRef<SVGGElement | any>(null),
    gy = useRef<SVGGElement | any>(null)
  const tooltipRef = useRef<HTMLDivElement>(null),
    dotsRef = useRef<Element[]>([])

  const tooltipData = (
    <div ref={tooltipRef} className="sessions__tooltip">
      tooltip
    </div>
  )

  const sessionsMinMax = d3.extent(sessions.map((s) => s.sessionLength))
  const x = d3.scaleLinear(
    [0, sessions.length - 1],
    [marginLeft, width - marginRight - marginLeft],
  )
  const y = d3.scaleLinear(sessionsMinMax as any, [
    height - marginBottom - marginTop * 2,
    marginTop,
  ])

  function updateTooltip(time: number): void {
    const tooltipDOM = tooltipRef.current! as HTMLElement
    tooltipDOM.textContent = `${time} min`
  }

  useEffect(() => {
    const days = ['L', 'M', 'M', 'J', 'V', 'S', 'D']
    const xTicks = [...Array(sessions.length).keys()]
    void d3.select(gx.current).call(
      d3
        .axisBottom(x)
        .tickValues(xTicks)
        .tickFormat((d, i) => {
          return days[i]
        }),
    )
  }, [gx, x, sessions.length])

  useEffect(() => {
    void d3.select(gy.current).call(d3.axisLeft(y).ticks(sessions.length))
  }, [gy, y, sessions])

  //   line generator
  const line = d3
    .line<OneSession>()
    .x((d) => x(d.day - 1))
    .y((d) => y(d.sessionLength))
    .curve(d3.curveCatmullRom.alpha(0.5))

  return (
    <>
      <Tooltip content={tooltipData} subscribers={dotsRef} />
      <svg className="sessions" width={width} height={height}>
        <defs>
          <linearGradient id="gradient">
            <stop offset="0" stopColor="white" stopOpacity="0.2" />
            <stop offset="1" stopColor="white" stopOpacity="1" />
          </linearGradient>
          <mask id="mask">
            <rect
              x="0"
              y="0"
              width={width}
              height={height}
              fill="url(#gradient)"
            />
          </mask>
        </defs>
        <g
          className="sessions__title"
          fill="currentColor"
          transform={`translate(${marginLeft},${marginTop})`}
        >
          <text transform={`translate(0,0)`}>Durée moyenne</text>
          <text transform={`translate(0,20)`}>des sessions</text>
        </g>
        <rect
          className="sessions__weekend"
          width={(width * 2) / 7}
          height={height}
          transform={`translate(${(width * 5) / 7},0)`}
          fill="currentColor"
        />
        <g
          ref={gx}
          transform={`translate(${downScale(0)},${height - marginBottom})`}
          className="sessions__scale"
        />
        <g
          className="sessions__line"
          transform={`scale(1.19,1), translate(-15,${marginTop + 10})`}
        >
          <path
            d={line(sessions) || ''}
            stroke="currentColor"
            fill="none"
            strokeWidth="1.5"
            mask="url(#mask)"
          />
          {sessions.map((s) => (
            <g
              key={`session-dot-group-${s.day}`}
              ref={(e) => (dotsRef.current[s.day - 1] = e as Element)}
              opacity={0}
            >
              <rect
                fill="white"
                opacity="0"
                onMouseOver={() => updateTooltip(s.sessionLength)}
                x={x(s.day - 1)}
                width={(width - marginLeft - marginRight) / 7}
                y={0}
                height={height}
                transform={`translate(${-10},${-10})`}
              />
              <circle
                cx={x(s.day - 1)}
                cy={y(s.sessionLength)}
                fill="currentColor"
                className="dot--wide"
                r="5"
                key={`session-dot-wide-${s.day}`}
              />
              <circle
                cx={x(s.day - 1)}
                cy={y(s.sessionLength)}
                fill="currentColor"
                className="dot--small"
                r="2.5"
                key={`session-dot-small-${s.day}`}
              />
            </g>
          ))}
        </g>
      </svg>
    </>
  )
}
