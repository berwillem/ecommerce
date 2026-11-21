import { useEffect, useState } from "react";
import "animate.css";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  ShieldCheck,
  Camera,
  ThumbsUp,
  Play,
} from "lucide-react";
import "./Contact.css";

const initialForm = {
  name: "",
  email: "",
  subject: "product",
  model: "",
  message: "",
};

const MAX_MESSAGE = 300;

const STORE_POSITION = [36.7538, 3.0588]; // Algiers, replace with your exact location

const storeIcon = L.divIcon({
  className: "store-marker",
  html: "<span></span>",
  iconSize: [24, 24],
  iconAnchor: [12, 12],
  popupAnchor: [0, -14],
});

const infoItems = [
  { icon: MapPin, text: "12 Rue Didouche Mourad, Algiers" },
  { icon: Phone, text: "+213 555 00 00 00" },
  { icon: Mail, text: "help@motoguard.dz" },
  { icon: Clock, text: "Sat to Thu, 9:00 to 18:00" },
];

const typingWords = ["Secure your ride.", "Protect your bike.", "Lock it down."];

const particles = [
  { left: "8%", delay: "0s", size: 14 },
  { left: "22%", delay: "2s", size: 10 },
  { left: "41%", delay: "1s", size: 18 },
  { left: "63%", delay: "3s", size: 12 },
  { left: "78%", delay: "0.5s", size: 16 },
  { left: "92%", delay: "2.5s", size: 10 },
];

function useTypewriter(words) {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[index];
    let timeout;

    if (!deleting && text === current) {
      timeout = setTimeout(() => setDeleting(true), 1500);
    } else if (deleting && text === "") {
      setDeleting(false);
      setIndex((i) => (i + 1) % words.length);
    } else {
      timeout = setTimeout(() => {
        setText(
          deleting
            ? current.slice(0, text.length - 1)
            : current.slice(0, text.length + 1)
        );
      }, deleting ? 40 : 90);
    }

    return () => clearTimeout(timeout);
  }, [text, deleting, index, words]);

  return text;
}

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const typed = useTypewriter(typingWords);

  const validate = (values) => {
    const newErrors = {};
    if (!values.name.trim()) newErrors.name = "Please enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(values.email))
      newErrors.email = "Please enter a valid email address.";
    if (values.message.trim().length < 10)
      newErrors.message = "Message should be at least 10 characters.";
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "message" && value.length > MAX_MESSAGE) return;
    setForm({ ...form, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: undefined });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate(form);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setAttempt((n) => n + 1);
      return;
    }

    setIsSending(true);
    // Replace with a real request (EmailJS or your Express endpoint)
    setTimeout(() => {
      console.log("Form submitted:", form);
      setIsSending(false);
      setSubmitted(true);
      setForm(initialForm);
    }, 1200);
  };

  const resetForm = () => {
    setSubmitted(false);
    setErrors({});
  };

  return (
    <div className="contact-page">
      <main className="contact">
        <section className="contact__hero">
          <div className="contact__particles" aria-hidden="true">
            {particles.map((p, i) => (
              <span
                key={i}
                className="particle"
                style={{
                  left: p.left,
                  width: p.size,
                  height: p.size,
                  animationDelay: p.delay,
                }}
              />
            ))}
          </div>

          <span className="status-badge animate__animated animate__fadeInDown">
            <span className="status-badge__dot" />
            Support online now
          </span>

          <ShieldCheck
            className="contact__hero-icon animate__animated animate__pulse animate__infinite"
            size={40}
            aria-hidden="true"
          />

          <h1 className="contact__title animate__animated animate__fadeInDown">
            <span className="typed">{typed}</span>
            <span className="cursor" aria-hidden="true">|</span>
          </h1>

          <p
            className="animate__animated animate__fadeIn"
            style={{ "--animate-delay": "0.4s" }}
          >
            Need help securing your ride? Our team replies within 24 hours on
            business days.
          </p>
        </section>

        <div className="contact__grid">
          <section className="contact__card animate__animated animate__fadeInLeft">
            {submitted ? (
              <div
                className="contact__success animate__animated animate__bounceIn"
                role="status"
              >
                <div className="success-icon">
                  <ShieldCheck size={36} aria-hidden="true" />
                </div>
                <h2>Thanks for reaching out</h2>
                <p>We received your message and will reply soon.</p>
                <button className="btn btn--primary" onClick={resetForm}>
                  Send another message
                </button>
              </div>
            ) : (
              <form className="contact__form" onSubmit={handleSubmit} noValidate>
                <div className="field-row">
                  <div
                    className="field animate__animated animate__fadeInUp"
                    style={{ "--animate-delay": "0.3s" }}
                  >
                    <label htmlFor="name">Full name</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Youcef Benali"
                      aria-invalid={!!errors.name}
                    />
                    {errors.name && (
                      <span
                        key={`name-${attempt}`}
                        className="error animate__animated animate__headShake"
                      >
                        {errors.name}
                      </span>
                    )}
                  </div>

                  <div
                    className="field animate__animated animate__fadeInUp"
                    style={{ "--animate-delay": "0.4s" }}
                  >
                    <label htmlFor="email">Email</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="name@example.com"
                      aria-invalid={!!errors.email}
                    />
                    {errors.email && (
                      <span
                        key={`email-${attempt}`}
                        className="error animate__animated animate__headShake"
                      >
                        {errors.email}
                      </span>
                    )}
                  </div>
                </div>

                <div
                  className="field animate__animated animate__fadeInUp"
                  style={{ "--animate-delay": "0.5s" }}
                >
                  <label htmlFor="subject">Subject</label>
                  <select
                    id="subject"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                  >
                    <option value="product">Product advice</option>
                    <option value="order">Order question</option>
                    <option value="installation">Installation service</option>
                    <option value="returns">Returns</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div
                  className="field animate__animated animate__fadeInUp"
                  style={{ "--animate-delay": "0.6s" }}
                >
                  <label htmlFor="model">Motorcycle model (optional)</label>
                  <input
                    id="model"
                    name="model"
                    type="text"
                    value={form.model}
                    onChange={handleChange}
                    placeholder="Yamaha MT-07 2022"
                  />
                </div>

                <div
                  className="field animate__animated animate__fadeInUp"
                  style={{ "--animate-delay": "0.7s" }}
                >
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us what you need"
                    aria-invalid={!!errors.message}
                  />
                  <div className="field-meta">
                    {errors.message ? (
                      <span
                        key={`message-${attempt}`}
                        className="error animate__animated animate__headShake"
                      >
                        {errors.message}
                      </span>
                    ) : (
                      <span />
                    )}
                    <span
                      className={`counter ${
                        form.message.length > MAX_MESSAGE * 0.9
                          ? "counter--warn"
                          : ""
                      }`}
                    >
                      {form.message.length}/{MAX_MESSAGE}
                    </span>
                  </div>
                </div>

                <div
                  className="contact__actions animate__animated animate__fadeInUp"
                  style={{ "--animate-delay": "0.8s" }}
                >
                  <span className="contact__note">
                    We only use your details to reply.
                  </span>
                  <button
                    type="submit"
                    className={`btn btn--primary ${isSending ? "btn--loading" : ""}`}
                    disabled={isSending}
                  >
                    Send message
                  </button>
                </div>
              </form>
            )}
          </section>

          <aside className="contact__info animate__animated animate__fadeInRight">
            <ul className="info-list">
              {infoItems.map(({ icon: Icon, text }, i) => (
                <li
                  key={text}
                  className="animate__animated animate__fadeInRight"
                  style={{ "--animate-delay": `${0.5 + i * 0.1}s` }}
                >
                  <Icon size={18} aria-hidden="true" />
                  <span>{text}</span>
                </li>
              ))}
            </ul>

            <div
              className="map-frame animate__animated animate__zoomIn"
              style={{ "--animate-delay": "0.9s" }}
            >
              <MapContainer
                center={STORE_POSITION}
                zoom={14}
                scrollWheelZoom={false}
                className="map"
              >
                <TileLayer
                  url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
                />
                <Marker position={STORE_POSITION} icon={storeIcon}>
                  <Popup>MotoGuard, 12 Rue Didouche Mourad</Popup>
                </Marker>
              </MapContainer>
            </div>

            <div
              className="faq animate__animated animate__fadeInUp"
              style={{ "--animate-delay": "1s" }}
            >
              <h3>Quick answers</h3>
              <p>Shipping takes 2 to 4 business days.</p>
              <p>Locks come with a 12-month warranty.</p>
            </div>
          </aside>
        </div>
      </main>

      <footer className="footer">
        <div className="footer__inner">
          <div className="footer__brand">
            <div className="footer__logo">
              <ShieldCheck size={22} aria-hidden="true" />
              <span>MotoGuard</span>
            </div>
            <p>Locks, alarms, and security gear built for riders.</p>
          </div>

          <nav className="footer__links" aria-label="Footer">
            <h4>Explore</h4>
            <a href="#">Shop</a>
            <a href="#">Installation</a>
            <a href="#">Warranty</a>
            <a href="#">Returns</a>
          </nav>

          <div className="footer__links">
            <h4>Contact</h4>
            <a href="mailto:help@motoguard.dz">help@motoguard.dz</a>
            <a href="tel:+213555000000">+213 555 00 00 00</a>
            <span>Algiers, Algeria</span>
          </div>

          <div className="footer__social">
            <h4>Follow us</h4>
            <div className="social-icons">
              <a href="#" aria-label="Instagram" className="social-icon">
                <Camera size={18} />
              </a>
              <a href="#" aria-label="Facebook" className="social-icon">
                <ThumbsUp size={18} />
              </a>
              <a href="#" aria-label="YouTube" className="social-icon">
                <Play size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <span>© {new Date().getFullYear()} MotoGuard. All rights reserved.</span>
          <span>Built for riders who take security seriously.</span>
        </div>
      </footer>
    </div>
  );
}