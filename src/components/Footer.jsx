import { nav, site } from '../data/site'
import { scrollToSection } from '../lib/smoothScroll'
import { wa } from '../lib/links'
import { asset } from '../lib/asset'
import Magnetic from './Magnetic.jsx'
import Icon from './icons.jsx'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__lead">
            <img
              className="footer__logo"
              src={asset('/img/logo-lockup.webp')}
              alt="NEXSTEG Fit Hub"
              width="240"
              height="63"
            />
            <p className="footer__eyebrow">
              <span className="dot" /> Mahboula, Kuwait
            </p>
            <h2 className="footer__title">
              Ready to <em>start?</em>
            </h2>
            <Magnetic>
              <a className="btn btn--solid btn--lg" href={wa()} target="_blank" rel="noreferrer">
                Join the hustle <Icon name="arrowUpRight" size={18} />
              </a>
            </Magnetic>
          </div>

          <nav className="footer__nav" aria-label="Footer">
            {nav.map((n) => (
              <button key={n.target} onClick={() => scrollToSection(n.target)}>
                {n.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="footer__word" aria-hidden="true">
          {site.name}
        </div>

        <div className="footer__bottom">
          <span>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </span>
          <button className="to-top" onClick={() => scrollToSection('hero')}>
            Back to top <Icon name="arrowUpRight" size={14} />
          </button>
        </div>
      </div>
    </footer>
  )
}
