import { plans } from '../data/site'
import { wa } from '../lib/links'
import Icon from './icons.jsx'
import Magnetic from './Magnetic.jsx'

export default function Pricing() {
  return (
    <section className="pricing section" id="pricing">
      <div className="container">
        <div className="section__head">
          <span className="section__index">04</span>
          <span className="section__eyebrow">Membership</span>
        </div>

        <div className="pricing__intro">
          <h2 className="section__title reveal">
            Choose your <em>commitment.</em>
          </h2>
          <p className="section__lead reveal">
            Every membership includes personal training. The longer you commit, the more you
            unlock.
          </p>
        </div>

        <div className="plans">
          {plans.map((p) => (
            <article className={`plan reveal ${p.featured ? 'plan--featured' : ''}`} key={p.term}>
              {p.featured && <span className="plan__badge">Best value</span>}
              <div className="plan__head">
                <span className="plan__note">{p.note}</span>
                <h3 className="plan__term">{p.term}</h3>
              </div>
              <div className="plan__price">
                <span className="plan__amt">{p.price}</span>
                <span className="plan__cur">KWD</span>
              </div>
              <ul className="plan__perks">
                {p.perks.map((perk) => (
                  <li key={perk}>
                    <Icon name="check" size={16} /> {perk}
                  </li>
                ))}
              </ul>
              <Magnetic className="plan__cta-wrap" strength={0.25}>
                <a
                  className={`btn ${p.featured ? 'btn--solid' : 'btn--ghost'} plan__cta`}
                  href={wa(`Hi NEXSTEG — I'd like the ${p.term} membership (${p.price} KWD). What's next?`)}
                  target="_blank"
                  rel="noreferrer"
                >
                  Join now <Icon name="arrowUpRight" size={16} />
                </a>
              </Magnetic>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
