import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { initSmoothScroll, prefersReducedMotion } from './lib/smoothScroll'

import Preloader from './components/Preloader.jsx'
import Cursor from './components/Cursor.jsx'
import ScrollProgress from './components/ScrollProgress.jsx'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import Marquee from './components/Marquee.jsx'
import About from './components/About.jsx'
import Services from './components/Services.jsx'
import Trainers from './components/Trainers.jsx'
import Pricing from './components/Pricing.jsx'
import Stories from './components/Stories.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export default function App() {
  const [intro, setIntro] = useState(false)
  const root = useRef(null)

  // Smooth scroll lifecycle + keep ScrollTrigger honest once fonts land.
  useEffect(() => {
    const cleanup = initSmoothScroll()
    const refresh = () => ScrollTrigger.refresh()
    if (document.fonts?.ready) document.fonts.ready.then(refresh)
    window.addEventListener('load', refresh)
    return () => {
      window.removeEventListener('load', refresh)
      cleanup?.()
    }
  }, [])

  // Global scroll reveals — set up once; elements exist from first render.
  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        gsap.set('.reveal', { autoAlpha: 1, y: 0 })
        return
      }
      gsap.utils.toArray('.reveal').forEach((el) => {
        gsap.fromTo(
          el,
          { y: 44, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.9,
            ease: 'expo.out',
            scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          }
        )
      })
    },
    { scope: root }
  )

  // Recalculate trigger positions after the preloader hands off.
  useEffect(() => {
    if (intro) ScrollTrigger.refresh()
  }, [intro])

  return (
    <div ref={root} className="app">
      <Preloader onComplete={() => setIntro(true)} />
      <Cursor />
      <ScrollProgress />
      <Nav intro={intro} />
      <main>
        <Hero intro={intro} />
        <Marquee />
        <About />
        <Services />
        <Trainers />
        <Pricing />
        <Stories />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
