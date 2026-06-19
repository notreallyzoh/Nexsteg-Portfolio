import { services } from '../data/site'
import Icon from './icons.jsx'

export default function Services() {
  return (
    <section className="services section" id="services">
      <div className="container">
        <div className="section__head">
          <span className="section__index">02</span>
          <span className="section__eyebrow">What we offer</span>
        </div>

        <h2 className="section__title reveal">
          Train. Recover. <em>Repeat.</em>
        </h2>

        <div className="services__grid">
          {services.map((s, i) => (
            <article className="svc reveal" key={s.title}>
              <span className="svc__index">{String(i + 1).padStart(2, '0')}</span>
              <span className="svc__icon">
                <Icon name={s.icon} size={26} />
              </span>
              <h3 className="svc__title">{s.title}</h3>
              <p className="svc__text">{s.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
