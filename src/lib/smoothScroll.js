import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

let lenis = null
let rafId = null

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Start Lenis smooth scroll and drive it from GSAP's ticker so
// ScrollTrigger stays perfectly in sync. Returns a cleanup fn.
export function initSmoothScroll() {
  if (prefersReducedMotion()) {
    ScrollTrigger.refresh()
    return () => {}
  }

  lenis = new Lenis({
    duration: 1.15,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo out
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 1.8,
  })

  lenis.on('scroll', ScrollTrigger.update)

  // Dev-only handle so tooling can drive scroll position.
  if (import.meta.env?.DEV) window.__lenis = lenis

  rafId = (time) => lenis.raf(time * 1000)
  gsap.ticker.add(rafId)
  gsap.ticker.lagSmoothing(0)

  ScrollTrigger.refresh()

  return () => {
    if (rafId) gsap.ticker.remove(rafId)
    lenis?.destroy()
    lenis = null
    rafId = null
  }
}

export function scrollToSection(target) {
  const el = typeof target === 'string' ? document.getElementById(target) : target
  if (!el) return
  if (lenis) lenis.scrollTo(el, { duration: 1.25 })
  else el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
}

export const lockScroll = () => lenis?.stop()
export const unlockScroll = () => lenis?.start()
