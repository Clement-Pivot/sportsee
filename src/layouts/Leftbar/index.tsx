import './index.scss'
import Yoga from '/src/assets/Yoga.svg?react'
import Swim from '/src/assets/Swim.svg?react'
import Bike from '/src/assets/Bike.svg?react'
import Dumbbell from '/src/assets/Dumbbell.svg?react'

export default function Leftbar(): JSX.Element {
  return (
    <aside className="leftbar">
      <div className="leftbar__icons">
        <Yoga className="leftbar__icon" width={45} />
        <Swim className="leftbar__icon" width={45} />
        <Bike className="leftbar__icon" width={45} />
        <Dumbbell className="leftbar__icon" width={45} />
      </div>
      <p className="leftbar__copyright">Copyright, SportSee 2020</p>
    </aside>
  )
}
