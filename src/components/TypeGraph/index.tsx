import './index.scss'
import * as d3 from 'd3'
import { useEffect, useRef } from 'react'
import { downScale } from 'utils/helpers'
import { Performance, Dimensions } from 'utils/types'

type Props = {
  content: Performance
  dimensions: {
    size: number
    margin: number
  }
}

type LineData = {
  value: number
  kind: number
}

export default function TypeGraph({ content, dimensions }: Props) {
  const { size, margin } = dimensions

  const performanceMinMax = [0, 300]
  const angle = (Math.PI * 2) / content.data.length
  const scaleLines = []
  for (var i = 0; i <= 3; i++) {
    scaleLines.push(
      content.data.map((d) => ({ value: i > 0 ? 100 * i : 50, kind: d.kind })),
    )
  }
  const legendRadius = size / 2
  const getLegendPosition = (index: number) => {
    return `${Math.cos((Math.PI / 6) * index) * legendRadius},${Math.sin((Math.PI / 6) * index) * legendRadius}`
  }
  // console.log(content.data)
  // console.log(getLegendPosition(3))

  const area = d3
    .lineRadial<LineData>()
    .radius((d) => (d.value * (size - margin)) / 2 / performanceMinMax[1])
    .angle((d) => angle * d.kind)

  return (
    <svg className="typegraph" width={size} height={size}>
      <g
        transform={`translate(${size / 2},${size / 2})`}
        className="typegraph__legend"
        fill="currentColor"
      >
        {' '}
        {content.data.map((d) => (
          <text
            transform={`translate(${getLegendPosition(d.kind)})`}
            key={`typegraph__legend--${d.kind}`}
          >
            {/* {content.kind[d.kind]} */}
          </text>
        ))}
      </g>
      <g transform={`translate(${size / 2},${size / 2})`}>
        {scaleLines.map((scale) => (
          <path
            className="typegraph__scale"
            d={area([...scale, scale[0]]) || ''}
            stroke="currentColor"
            strokeWidth="1"
            fill="none"
            key={`typegraph__scale--${scale[0].value}`}
          />
        ))}
      </g>
      <g transform={`translate(${size / 2},${size / 2})`}>
        <path
          className="typegraph__area"
          d={area([...content.data, content.data[0]]) || ''}
          stroke="none"
          fill="currentColor"
        />
      </g>
    </svg>
  )
}
