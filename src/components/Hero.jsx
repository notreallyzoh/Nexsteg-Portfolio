import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import SplitText from '../lib/SplitText.jsx'
import Magnetic from './Magnetic.jsx'
import Icon from './icons.jsx'
import { site, testimonials } from '../data/site'
import { wa } from '../lib/links'
import { asset } from '../lib/asset'
import { scrollToSection } from '../lib/smoothScroll'

gsap.registerPlugin(ScrollTrigger)

export default function Hero({ intro }) {
  const root = useRef(null)

  useGSAP(
    () => {
      const q = gsap.utils.selector(root)

      // Hidden start state (kept until the intro plays — no flash, and
      // it stays graceful if JS never runs because there's no CSS hiding).
      gsap.set(q('.hero__title .char'), { yPercent: 115 })
      gsap.set([q('.hero__eyebrow'), q('.hero__lead'), q('.hero__proof'), q('.hero__scroll')], {
        autoAlpha: 0,
      })
      gsap.set(q('.hero__cta > *'), { autoAlpha: 0, y: 26 })
      gsap.set(q('.hero__media'), { clipPath: 'inset(100% 0 0 0)' })

      if (!intro) return

      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })
      tl.to(q('.hero__media'), { clipPath: 'inset(0% 0 0 0)', duration: 1.2, ease: 'expo.inOut' })
        .to(q('.hero__eyebrow'), { autoAlpha: 1, duration: 0.6 }, 0.15)
        .to(q('.hero__title .char'), { yPercent: 0, duration: 1.05, stagger: 0.02 }, 0.25)
        .to(q('.hero__lead'), { autoAlpha: 1, duration: 0.8 }, 0.65)
        .to(q('.hero__cta > *'), { autoAlpha: 1, y: 0, stagger: 0.12, duration: 0.7 }, 0.8)
        .to(q('.hero__proof'), { autoAlpha: 1, duration: 0.8 }, 0.95)
        .to(q('.hero__scroll'), { autoAlpha: 1, duration: 0.6 }, 1.1)

      // Parallax drift on the figure.
      gsap.to(q('.hero__img'), {
        yPercent: 12,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
      })
      // Headline lifts slightly as you scroll away.
      gsap.to(q('.hero__title'), {
        yPercent: -8,
        autoAlpha: 0.25,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'center center', end: 'bottom top', scrub: true },
      })
    },
    { dependencies: [intro], scope: root }
  )

  return (
    <section className="hero" id="hero" ref={root}>
      <div className="hero__inner">
        <div className="hero__copy">
          <p className="hero__eyebrow">
            <span className="dot" /> Mahboula, Kuwait — Est. {site.established}
          </p>

          <h1 className="hero__title">
            <SplitText text={'NEVER\nFORGET YOUR\nFIRST TIME'} />
          </h1>

          <p className="hero__lead">
            Kuwait’s relentless strength &amp; conditioning movement. Real coaching, a full
            recovery suite, and a community that drags you forward on the days you can’t.
          </p>

          <div className="hero__cta">
            <Magnetic>
              <a className="btn btn--solid btn--lg" href={wa()} target="_blank" rel="noreferrer">
                Join the hustle <Icon name="arrowUpRight" size={18} />
              </a>
            </Magnetic>
            <a
              className="btn btn--ghost btn--lg hero__watch"
              href={site.youtube}
              target="_blank"
              rel="noreferrer"
            >
              <span className="hero__watch-play">
                <Icon name="play" size={15} />
              </span>
              Watch our journey
            </a>
          </div>

          <div className="hero__proof">
            <div className="hero__avatars">
              {testimonials.map((t) => (
                <img key={t.name} src={asset(t.img)} alt="" width="40" height="40" loading="lazy" />
              ))}
            </div>
            <p>
              <strong>5.0</strong> rating — join the members already
              <br /> building the strongest version of themselves.
            </p>
          </div>
        </div>

        <div className="hero__media">
          <div className="hero__glow" aria-hidden="true" />
          <img
            className="hero__img"
            src={asset('/img/hero.webp')}
            alt="NEXSTEG athlete mid-session"
            width="900"
            height="1100"
            fetchpriority="high"
          />
        </div>
      </div>

      <button className="hero__scroll" onClick={() => scrollToSection('about')} aria-label="Scroll to about">
        <span>Scroll</span>
        <Icon name="chevronDown" size={18} />
      </button>
    </section>
  )
}
