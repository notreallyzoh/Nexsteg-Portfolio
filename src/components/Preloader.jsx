import { useRef, useState } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import SplitText from '../lib/SplitText.jsx'
import { prefersReducedMotion } from '../lib/smoothScroll'

// Counting preloader → curtain wipe. Calls onComplete when the
// site is ready to animate in.
export default function Preloader({ onComplete }) {
  const root = useRef(null)
  const [count, setCount] = useState(0)

  useGSAP(
    () => {
      const done = () => {
        document.documentElement.classList.remove('is-loading')
        onComplete?.()
      }

      if (prefersReducedMotion()) {
        setCount(100)
        gsap.set(root.current, { display: 'none' })
        done()
        return
      }

      document.documentElement.classList.add('is-loading')

      const counter = { v: 0 }
      const tl = gsap.timeline({ onComplete: done })

      tl.to(counter, {
        v: 100,
        duration: 1.9,
        ease: 'power2.inOut',
        onUpdate: () => setCount(Math.round(counter.v)),
      })
        .to('.preloader__bar', { scaleX: 1, duration: 1.9, ease: 'power2.inOut' }, 0)
        .to(
          '.preloader__brand .char',
          { yPercent: -115, stagger: 0.025, duration: 0.5, ease: 'power3.in' },
          '-=0.35'
        )
        .to('.preloader__meta', { autoAlpha: 0, duration: 0.3 }, '<')
        .to(root.current, { yPercent: -100, duration: 0.9, ease: 'expo.inOut' }, '-=0.15')
        .set(root.current, { display: 'none' })
    },
    { scope: root }
  )

  return (
    <div className="preloader" ref={root}>
      <div className="preloader__brand">
        <SplitText text="NEXSTEG" />
      </div>
      <div className="preloader__meta">
        <span className="preloader__count">{String(count).padStart(3, '0')}</span>
        <span className="preloader__label">Loading the hustle</span>
      </div>
      <div className="preloader__rail">
        <span className="preloader__bar" />
      </div>
    </div>
  )
}
