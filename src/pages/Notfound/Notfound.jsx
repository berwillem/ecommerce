import { Link } from "react-router";
import "./Notfound.css";

const Notfound = () => (
  <main className="not-found">
    {/* Animated background blobs */}
    <div className="blob blob--1" aria-hidden="true" />
    <div className="blob blob--2" aria-hidden="true" />
    <div className="blob blob--3" aria-hidden="true" />

    <section className="not-found__content">
      {/* Glitch 404 */}
      <div className="not-found__glitch-wrapper" aria-hidden="true">
        <span className="not-found__glitch" data-text="404">404</span>
      </div>

      {/* Icon */}
      <div className="not-found__icon" aria-hidden="true">
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="32" cy="32" r="30" stroke="var(--primary-color)" strokeWidth="3" />
          <path d="M20 24 Q32 18 44 24" stroke="var(--secondary-color)" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="22" cy="30" r="3" fill="var(--primary-color)" />
          <circle cx="42" cy="30" r="3" fill="var(--primary-color)" />
          <path d="M22 44 Q32 38 42 44" stroke="var(--primary-color)" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      </div>

      <h1 className="not-found__title">Page introuvable</h1>

      <p className="not-found__message">
        Oups ! Cette page s'est perdue dans l'univers.
        <br />
        Revenons sur terre 🚀
      </p>

      {/* Animated dots */}
      <div className="not-found__dots" aria-hidden="true">
        <span className="dot" />
        <span className="dot" />
        <span className="dot" />
      </div>

      <div className="not-found__actions">
        <Link className="not-found__button not-found__button--primary" to="/">
          🏠 Retour à l'accueil
        </Link>
        <Link className="not-found__button not-found__button--secondary" to="/products">
          🛍️ Voir les produits
        </Link>
      </div>
    </section>
  </main>
);

export default Notfound;
