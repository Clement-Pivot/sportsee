import './index.scss'

type Props = {
  name: string
}

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
