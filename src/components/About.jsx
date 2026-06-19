import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import SplitText from '../lib/SplitText.jsx'
import Icon from './icons.jsx'
import { stats } from '../data/site'
import { scrollToSection, prefersReducedMotion } from '../lib/smoothScroll'

gsap.registerPlugin(ScrollTrigger)

function Counter({ value, prefix = '', suffix = '' }) {
  const ref = useRef(null)
  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        ref.current.textContent = prefix + value + suffix
        return
      }
      const o = { v: 0 }
      gsap.to(o, {
        v: value,
        duration: 2,
        ease: 'power2.out',
        scrollTrigger: { trigger: ref.current, start: 'top 90%', once: true },
        onUpdate: () => {
          ref.current.textContent = prefix + Math.round(o.v) + suffix
        },
      })
    },
    { scope: ref }
  )
  return (
    <span ref={ref}>
      {prefix}0{suffix}
    </span>
  )
}

export default function About() {
  const root = useRef(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      gsap.from('.about__statement .word', {
        yPercent: 115,
        duration: 1,
        ease: 'expo.out',
        stagger: 0.045,
        scrollTrigger: { trigger: '.about__statement', start: 'top 82%' },
      })
    },
    { scope: root }
  )

  return (
    <section className="about section" id="about" ref={root}>
      <div className="container">
        <div className="section__head">
          <span className="section__index">01</span>
          <span className="section__eyebrow">Who we are</span>
        </div>

        <h2 className="about__statement">
          <SplitText text={'More than a gym.\nA movement.'} />
        </h2>

        <div className="about__grid">
          <div className="about__body reveal">
            <p>
              NEXSTEG was founded in 2024 with one mission — to elevate the fitness
              experience in Kuwait. Born from a passion for health, strength and community,
              we built more than a gym.
            </p>
            <p>
              Fitness here is a lifestyle, open to everyone regardless of age or ability —
              backed by expert coaching, group classes, and a full recovery suite of ice
              bath, sauna, jacuzzi and steam.
            </p>
            <button className="link-arrow" onClick={() => scrollToSection('trainers')}>
              Meet the coaches <Icon name="arrow" size={18} />
            </button>
          </div>

          <div className="stats">
            {stats.map((s) => (
              <div className="stat reveal" key={s.label}>
                <div className="stat__value">
                  <Counter value={s.value} prefix={s.prefix || ''} suffix={s.suffix || ''} />
                </div>
                <div className="stat__label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
