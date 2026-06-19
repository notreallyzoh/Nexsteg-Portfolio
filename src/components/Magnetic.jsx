import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { prefersReducedMotion } from '../lib/smoothScroll'

// Wrap any element to give it a magnetic pull toward the cursor.
export default function Magnetic({ children, strength = 0.4, className = '' }) {
  const ref = useRef(null)
  const xTo = useRef(null)
  const yTo = useRef(null)

  useGSAP(
    () => {
      if (prefersReducedMotion() || !window.matchMedia('(pointer: fine)').matches) return
      xTo.current = gsap.quickTo(ref.current, 'x', { duration: 0.5, ease: 'power3.out' })
      yTo.current = gsap.quickTo(ref.current, 'y', { duration: 0.5, ease: 'power3.out' })
    },
    { scope: ref }
  )

  const onMove = (e) => {
    if (!xTo.current) return
    const r = ref.current.getBoundingClientRect()
    xTo.current((e.clientX - (r.left + r.width / 2)) * strength)
    yTo.current((e.clientY - (r.top + r.height / 2)) * strength)
  }

  const onLeave = () => {
    if (!xTo.current) return
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.4)' })
  }

  return (
    <span
      ref={ref}
      className={`magnetic ${className}`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </span>
  )
}
