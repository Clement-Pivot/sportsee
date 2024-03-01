import './index.scss'
import * as d3 from 'd3'
import { Performance } from 'utils/types'

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
  const scaleLines: Array<LineData>[] = []
  for (var i = 0; i <= 3; i++) {
    scaleLines.push([])
    for (var j = 1; j <= content.data.length; j++) {
      scaleLines[i].push({ value: i > 0 ? 100 * i : 50, kind: j })
    }
  }
  const legendRadius = (size - margin) / 1.6
  const getLegendPosition = (index: number) => {
    return `${-Math.cos(angle * (index - 1.5)) * legendRadius},${Math.sin(angle * (index - 1.5)) * legendRadius}`
  }

  const area = d3
    .lineRadial<LineData>()
    .radius((d) => (d.value * (size - margin)) / 2 / performanceMinMax[1])
    .angle((d) => angle * -d.kind)

  return (
    <svg className="typegraph" width={size} height={size}>
      <g
        transform={`translate(${size / 2},${size / 2})`}
        className="typegraph__legend"
        fill="currentColor"
      >
        {content.data.map((d) => (
          <text
            dominantBaseline="middle"
            textAnchor="middle"
            transform={`translate(${getLegendPosition(d.kind)})`}
            key={`typegraph__legend--${d.kind}`}
          >
            {content.kind[d.kind]}
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
