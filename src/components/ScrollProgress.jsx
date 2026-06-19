import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

// Thin progress bar pinned to the top of the viewport.
export default function ScrollProgress() {
  const bar = useRef(null)

  useGSAP(() => {
    gsap.fromTo(
      bar.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: { start: 0, end: 'max', scrub: 0.3 },
      }
    )
  })

  return <span className="scroll-progress" ref={bar} aria-hidden="true" />
}
