import { FunctionComponent } from 'react'
import './index.scss'

/**
 * Consumption prop type
 * @typedef {Props}
 */
type Props = {
  Icon: FunctionComponent
  value: string
  type: string
}

/**
 * Consumption function component
 * @export
 * @param {Props} param0
 * @param {FunctionComponent} param0.Icon
 * @param {string} param0.value
 * @param {string} param0.type
 * @returns {JSX.Element}
 */
export default function Consumption({ Icon, value, type }: Props): JSX.Element {
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
