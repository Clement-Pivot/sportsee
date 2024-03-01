import { FunctionComponent } from 'react'
import './index.scss'

type Props = {
  Icon: FunctionComponent
  value: string
  type: string
}

export default function Consumption({ Icon, value, type }: Props) {
  return (
    <div className="consumption__item">
      <Icon />
      <div className="consumption__text">
        <div className="consumption__value">{value}</div>
        <div className="consumption__type">{type}</div>
      </div>
    </div>
  )
}
