import './index.scss'
import { AverageSessions, Dimensions } from 'utils/types'
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

  const gx = useRef<SVGGElement | any>(null)
  const tooltipRef = useRef(null),
    dotsRef = useRef<Element[]>([])

  const tooltipData = (
    <div ref={tooltipRef} className="sessions__tooltip">
      tooltip
    </div>
  )

  const x = d3.scaleLinear(
    [0, sessions.length],
    [marginLeft, width - marginRight],
  )

  function updateTooltip(time: number): void {
    const tooltipDOM = tooltipRef.current! as HTMLElement
    tooltipDOM.textContent = `${time} min`
  }

  console.log(content)

  useEffect(() => {
    const days = ['L', 'M', 'M', 'J', 'V', 'S', 'D']
    const xTicks = [...Array(sessions.length).keys()]
    // console.log(xTicks)
    void d3.select(gx.current).call(
      d3
        .axisBottom(x)
        .tickValues(xTicks)
        .tickFormat((d, i) => {
          console.log(days[i])
          return days[i]
        }),
    )
  }, [gx, x, sessions.length])

  return (
    <>
      <Tooltip content={tooltipData} subscribers={dotsRef} />
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
        <g
          ref={gx}
          transform={`translate(${downScale(14)},${height - marginBottom - 10})`}
          className="sessions__scale"
        />
        <g>
          <circle
            ref={(e) => (dotsRef.current[0] = e as Element)}
            r="5"
            onMouseOver={() => updateTooltip(5)}
          />
        </g>
      </svg>
    </>
  )
}
