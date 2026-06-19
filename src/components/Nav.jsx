import { useRef, useState, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { nav, site } from '../data/site'
import { scrollToSection, lockScroll, unlockScroll } from '../lib/smoothScroll'
import { wa } from '../lib/links'
import Magnetic from './Magnetic.jsx'
import Icon from './icons.jsx'

gsap.registerPlugin(ScrollTrigger)

export default function Nav({ intro }) {
  const root = useRef(null)
  const overlay = useRef(null)
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Toggle a condensed style once the hero is scrolled past.
  useGSAP(() => {
    const st = ScrollTrigger.create({
      start: 'top -90',
      onToggle: (self) => setScrolled(self.isActive),
    })
    return () => st.kill()
  })

  // Reveal the bar after the preloader hands off.
  useGSAP(
    () => {
      if (!intro) return
      gsap.from(root.current, {
        yPercent: -120,
        autoAlpha: 0,
        duration: 0.9,
        ease: 'expo.out',
        delay: 0.2,
      })
    },
    { dependencies: [intro] }
  )

  // Mobile overlay open / close choreography.
  useGSAP(
    () => {
      const links = overlay.current.querySelectorAll('.nav-overlay__link')
      if (open) {
        lockScroll()
        document.documentElement.classList.add('menu-open')
        gsap.set(overlay.current, { pointerEvents: 'auto' })
        gsap.to(overlay.current, {
          clipPath: 'inset(0% 0 0% 0)',
          duration: 0.7,
          ease: 'expo.inOut',
        })
        gsap.fromTo(
          links,
          { yPercent: 120, autoAlpha: 0 },
          { yPercent: 0, autoAlpha: 1, stagger: 0.06, delay: 0.18, duration: 0.6, ease: 'power3.out' }
        )
      } else {
        unlockScroll()
        document.documentElement.classList.remove('menu-open')
        gsap.to(overlay.current, {
          clipPath: 'inset(0% 0 100% 0)',
          duration: 0.5,
          ease: 'expo.inOut',
          onComplete: () => gsap.set(overlay.current, { pointerEvents: 'none' }),
        })
      }
    },
    { dependencies: [open] }
  )

  // Close on Escape.
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const go = (target) => {
    setOpen(false)
    unlockScroll()
    document.documentElement.classList.remove('menu-open')
    // let the overlay begin closing, then scroll
    requestAnimationFrame(() => scrollToSection(target))
  }

  return (
    <>
      <header ref={root} className={`nav ${scrolled ? 'is-scrolled' : ''}`}>
        <button className="nav__logo" onClick={() => go('hero')} aria-label="NEXSTEG — home">
          <img className="nav__logo-img" src="/img/logo-wordmark.webp" alt="NEXSTEG" width="158" height="26" />
        </button>

        <nav className="nav__links" aria-label="Primary">
          {nav.map((item) => (
            <button key={item.target} className="nav__link" onClick={() => go(item.target)}>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="nav__actions">
          <Magnetic className="nav__cta-wrap">
            <a className="btn btn--solid nav__cta" href={wa()} target="_blank" rel="noreferrer">
              Join us <Icon name="arrowUpRight" size={16} />
            </a>
          </Magnetic>
          <button
            className="nav__burger"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            <Icon name={open ? 'close' : 'menu'} size={26} />
          </button>
        </div>
      </header>

      <div className="nav-overlay" ref={overlay} aria-hidden={!open}>
        <nav className="nav-overlay__nav">
          {nav.map((item, i) => (
            <button
              key={item.target}
              className="nav-overlay__link"
              onClick={() => go(item.target)}
            >
              <span className="nav-overlay__idx">0{i + 1}</span>
              {item.label}
            </button>
          ))}
        </nav>
        <div className="nav-overlay__foot">
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <a href={wa()} target="_blank" rel="noreferrer" className="btn btn--solid">
            Join the hustle <Icon name="whatsapp" size={16} />
          </a>
        </div>
      </div>
    </>
  )
}
