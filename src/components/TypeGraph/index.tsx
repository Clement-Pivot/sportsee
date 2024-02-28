import './index.scss'
import * as d3 from 'd3'
import { downScale } from 'utils/helpers'
import { Performance, Dimensions } from 'utils/types'

type Props = {
  content: Performance
  dimensions: Dimensions
}

type Data = {
  axis: string
  value: number
}

export default function TypeGraph({ content, dimensions }: Props) {
  const { width, height, marginTop, marginRight, marginBottom, marginLeft } =
    dimensions
  const data: Data[] = content.data.map((item) => {
    return {
      axis: content.kind[item.kind],
      value: item.value,
    }
  })
  return <svg className="typegraph" width={width} height={height}></svg>
}
