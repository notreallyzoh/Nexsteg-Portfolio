import { trainers } from '../data/site'
import { asset } from '../lib/asset'

export default function Trainers() {
  return (
    <section className="trainers section" id="trainers">
      <div className="container">
        <div className="section__head">
          <span className="section__index">03</span>
          <span className="section__eyebrow">The coaches</span>
        </div>

        <h2 className="section__title reveal">
          Partners in <em>progress.</em>
        </h2>
        <p className="section__lead reveal">
          The experts behind your transformation — passionate, certified, and always pushing
          limits alongside you.
        </p>

        <div className="trainers__grid">
          {trainers.map((t, i) => (
            <article className="coach reveal" key={t.name}>
              <div className="coach__media">
                <span className="coach__index">{String(i + 1).padStart(2, '0')}</span>
                <img src={asset(t.img)} alt={t.name} loading="lazy" />
              </div>
              <div className="coach__info">
                <h3 className="coach__name">{t.name}</h3>
                <p className="coach__role">{t.role}</p>
                <p className="coach__bio">{t.bio}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
