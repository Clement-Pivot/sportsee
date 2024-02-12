import './index.scss'
import Logo from 'components/Logo'

export default function Navbar(): JSX.Element {
  return (
    <nav className="navbar">
      <Logo />
      <p className="navbar__link">Accueil</p>
      <p className="navbar__link">Profil</p>
      <p className="navbar__link">Réglage</p>
      <p className="navbar__link">Communauté</p>
    </nav>
  )
}
