import { useState } from 'react'
import { site } from '../data/site'
import { wa } from '../lib/links'
import Icon from './icons.jsx'
import Magnetic from './Magnetic.jsx'

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', routine: '' })
  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const submit = (e) => {
    e.preventDefault()
    const { name, phone, routine } = form
    if (!name.trim() || !phone.trim()) return
    const msg = `Hi NEXSTEG! I'm ${name}. Phone: ${phone}.${routine ? ` Goal: ${routine}` : ''}`
    window.open(wa(msg), '_blank')
  }

  return (
    <section className="contact section" id="contact">
      <div className="container">
        <div className="section__head">
          <span className="section__index">06</span>
          <span className="section__eyebrow">Visit us</span>
        </div>

        <h2 className="section__title reveal">
          It’s the right moment to <em>join us.</em>
        </h2>

        <div className="contact__grid">
          <div className="contact__map reveal">
            <iframe
              src={site.mapEmbed}
              title="NEXSTEG GYM location on Google Maps"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="contact__panel reveal">
            <form className="contact__form" onSubmit={submit}>
              <div className="field">
                <label htmlFor="c-name">Name</label>
                <input
                  id="c-name"
                  value={form.name}
                  onChange={update('name')}
                  placeholder="Your name"
                  autoComplete="name"
                  required
                />
              </div>
              <div className="field">
                <label htmlFor="c-phone">Phone</label>
                <input
                  id="c-phone"
                  type="tel"
                  value={form.phone}
                  onChange={update('phone')}
                  placeholder="Your number"
                  autoComplete="tel"
                  required
                />
              </div>
              <div className="field">
                <label htmlFor="c-routine">Your goal</label>
                <textarea
                  id="c-routine"
                  rows="3"
                  value={form.routine}
                  onChange={update('routine')}
                  placeholder="What do you want to achieve?"
                />
              </div>
              <Magnetic strength={0.18} className="contact__submit-wrap">
                <button className="btn btn--solid btn--block" type="submit">
                  Send via WhatsApp <Icon name="whatsapp" size={16} />
                </button>
              </Magnetic>
            </form>

            <div className="contact__info">
              <a href={wa()} target="_blank" rel="noreferrer">
                <Icon name="whatsapp" size={18} /> {site.whatsappDisplay}
              </a>
              <a href={`mailto:${site.email}`}>
                <Icon name="mail" size={18} /> {site.email}
              </a>
              <span>
                <Icon name="pin" size={18} /> {site.location}
              </span>
            </div>

            <div className="contact__socials">
              {site.socials.map((s) => (
                <a key={s.label} href={s.href} aria-label={s.label} target="_blank" rel="noreferrer">
                  {s.short}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
