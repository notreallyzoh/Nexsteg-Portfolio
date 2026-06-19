import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { prefersReducedMotion } from '../lib/smoothScroll'

gsap.registerPlugin(ScrollTrigger)

const WORDS = ['Strength', 'Discipline', 'Community', 'Results', 'Recovery', 'No excuses']

export default function Marquee() {
  const root = useRef(null)
  const track = useRef(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return

      const loop = gsap.to(track.current, {
        xPercent: -50,
        repeat: -1,
        duration: 22,
        ease: 'none',
      })

      // Skew + speed react to scroll velocity for that "alive" feel.
      const st = ScrollTrigger.create({
        onUpdate: (self) => {
          const v = self.getVelocity()
          const skew = gsap.utils.clamp(-14, 14, v / -120)
          gsap.to(root.current, { skewX: skew, duration: 0.4, ease: 'power3.out', overwrite: 'auto' })
          loop.timeScale(gsap.utils.clamp(-4, 4, 1 + v / 1200) || 1)
          gsap.to(loop, { timeScale: 1, duration: 0.8, ease: 'power2.out', overwrite: true, delay: 0.1 })
        },
      })

      return () => st.kill()
    },
    { scope: root }
  )

  const Run = () => (
    <>
      {WORDS.map((w) => (
        <span className="marquee__item" key={w}>
          {w}
          <span className="marquee__star" aria-hidden="true">
            ✳
          </span>
        </span>
      ))}
    </>
  )

  return (
    <div className="marquee" ref={root} aria-hidden="true">
      <div className="marquee__track" ref={track}>
        <Run />
        <Run />
      </div>
    </div>
  )
}
