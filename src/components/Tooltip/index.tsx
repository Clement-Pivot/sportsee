import './index.scss'
import { useEffect } from 'react'

type Props = {
  content: {
    key: any
    props: {
      children: Element
    }
    ref?: {
      current: HTMLElement
    }
    type: string
  }
  subscribers: {
    current: Element[]
  }
}

export default function Tooltip({ content, subscribers }: Props) {
  useEffect(() => {
    function mouseOver(sub: any): void {
      sub.style.opacity = '1'
      content!.ref!.current!.style.display = 'flex'
    }

    function mouseMove(e: MouseEvent) {
      content!.ref!.current!.style.left = `${e.pageX + 10}px`
      content!.ref!.current!.style.top = `${e.pageY - 10}px`
    }

    function mouseLeave(sub: any) {
      sub.style.opacity = '0'
      content!.ref!.current!.style.display = 'none'
    }

    subscribers.current.forEach((sub) => {
      sub.addEventListener('mouseover', () => mouseOver(sub))
      sub.addEventListener('mousemove', (e) => mouseMove(e as any))
      sub.addEventListener('mouseleave', () => mouseLeave(sub))
    })
  }, [content, subscribers])

  return <>{content}</>
}
