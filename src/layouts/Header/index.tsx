import './index.scss'

/**
 * Header prop type
 * @typedef {Props}
 */
type Props = {
  name: string
}

/**
 * Header function component
 * @export
 * @param {Props} param0
 * @param {string} param0.name
 * @returns {JSX.Element}
 */
export default function Header({ name }: Props): JSX.Element {
  return (
    <div className="header">
      <h1 className="header__h1">
        Bonjour <p className="header__name">{name}</p>
      </h1>
      <h2 className="header__h2">
        Félicitation ! Vous avez explosé vos objectifs hier 👏
      </h2>
    </div>
  )
}
