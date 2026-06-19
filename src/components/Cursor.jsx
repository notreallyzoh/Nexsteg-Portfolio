import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { prefersReducedMotion } from '../lib/smoothScroll'

// Custom cursor: a snappy dot + a trailing ring that grows over
// interactive elements. Only on fine-pointer, motion-OK devices.
export default function Cursor() {
  const dot = useRef(null)
  const ring = useRef(null)

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    if (!fine || prefersReducedMotion()) return

    document.body.classList.add('has-cursor')

    const dotX = gsap.quickTo(dot.current, 'x', { duration: 0.15, ease: 'power3' })
    const dotY = gsap.quickTo(dot.current, 'y', { duration: 0.15, ease: 'power3' })
    const ringX = gsap.quickTo(ring.current, 'x', { duration: 0.5, ease: 'power3' })
    const ringY = gsap.quickTo(ring.current, 'y', { duration: 0.5, ease: 'power3' })

    let visible = false
    const move = (e) => {
      if (!visible) {
        visible = true
        gsap.to([dot.current, ring.current], { autoAlpha: 1, duration: 0.3 })
      }
      dotX(e.clientX)
      dotY(e.clientY)
      ringX(e.clientX)
      ringY(e.clientY)
    }

    const hoverOn = () => ring.current?.classList.add('is-hover')
    const hoverOff = () => ring.current?.classList.remove('is-hover')
    const downOn = () => ring.current?.classList.add('is-down')
    const downOff = () => ring.current?.classList.remove('is-down')
    const leave = () => gsap.to([dot.current, ring.current], { autoAlpha: 0, duration: 0.2 })

    const targets = () =>
      document.querySelectorAll('a, button, [data-cursor], input, textarea, .magnetic')
    const bind = () =>
      targets().forEach((el) => {
        el.addEventListener('mouseenter', hoverOn)
        el.addEventListener('mouseleave', hoverOff)
      })

    window.addEventListener('mousemove', move)
    window.addEventListener('mousedown', downOn)
    window.addEventListener('mouseup', downOff)
    document.addEventListener('mouseleave', leave)
    bind()

    // Re-bind once content/animation settles (links rendered after load).
    const t = setTimeout(bind, 1200)

    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mousedown', downOn)
      window.removeEventListener('mouseup', downOff)
      document.removeEventListener('mouseleave', leave)
      clearTimeout(t)
      document.body.classList.remove('has-cursor')
    }
  }, [])

  return (
    <>
      <div className="cursor cursor__ring" ref={ring} aria-hidden="true" />
      <div className="cursor cursor__dot" ref={dot} aria-hidden="true" />
    </>
  )
}
