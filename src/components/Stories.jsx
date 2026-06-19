import { transformation, testimonials } from '../data/site'
import Icon from './icons.jsx'

export default function Stories() {
  return (
    <section className="stories section" id="stories">
      <div className="container">
        <div className="section__head">
          <span className="section__index">05</span>
          <span className="section__eyebrow">Real results</span>
        </div>

        <h2 className="section__title reveal">
          Transformation <em>stories.</em>
        </h2>

        <article className="transform reveal">
          <div className="transform__media">
            <img src={transformation.img} alt={`${transformation.name} transformation`} loading="lazy" />
            <span className="transform__result">{transformation.result}</span>
          </div>
          <div className="transform__body">
            <blockquote className="transform__quote">“{transformation.quote}”</blockquote>
            <div className="transform__who">
              <strong>{transformation.name}</strong>
              <span>Coached by {transformation.coach}</span>
            </div>
            <dl className="transform__meta">
              <div>
                <dt>Goal</dt>
                <dd>{transformation.goal}</dd>
              </div>
              <div>
                <dt>Timeframe</dt>
                <dd>{transformation.timeframe}</dd>
              </div>
              <div>
                <dt>Plan</dt>
                <dd>{transformation.plan}</dd>
              </div>
              <div>
                <dt>Result</dt>
                <dd>{transformation.result}</dd>
              </div>
            </dl>
          </div>
        </article>

        <div className="tcards">
          {testimonials.map((t) => (
            <figure className="tcard reveal" key={t.name}>
              <div className="tcard__stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Icon key={i} name="star" size={14} />
                ))}
              </div>
              <blockquote>“{t.quote}”</blockquote>
              <figcaption>
                <img src={t.img} alt="" width="44" height="44" loading="lazy" />
                <span>{t.name}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
