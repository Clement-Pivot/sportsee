import './index.scss'
import LogoSVG from '/src/assets/Logo.svg?react'

/**
 * Logo function component
 * @export
 * @returns {JSX.Element}
 */
export default function Logo(): JSX.Element {
  return (
    <div className="logo">
      <LogoSVG />
      SportSee
    </div>
  )
}
