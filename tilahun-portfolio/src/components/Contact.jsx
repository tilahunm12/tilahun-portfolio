// src/components/Contact.jsx
import React, { useState } from 'react'
import { FaEnvelope, FaPhone, FaLinkedin, FaFacebook, FaClipboard, FaCalendarAlt } from 'react-icons/fa'

const Contact = () => {
  const [status, setStatus] = useState('')

  const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID || ''
  const CALENDLY_URL = import.meta.env.VITE_CALENDLY_URL || 'https://calendly.com/yourname'

  const handleSubmit = async (e) => {
    // If a Formspree ID is configured, handle via JS fetch so we can show inline feedback.
    if (!FORMSPREE_ID) {
      // No Formspree ID: let the form submit normally (Netlify or static hosting will capture it if configured).
      return
    }

    e.preventDefault()
    const form = new FormData(e.target)

    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: form
      })

      if (res.ok) {
        setStatus("Thanks — I'll get back to you soon!")
        e.target.reset()
      } else {
        setStatus('Oops — something went wrong. Try emailing me directly at ')
      }
    } catch (e) {
      void e
      setStatus('Network error — try emailing me at ')
    }
  }

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText('tilahunm569@gmail.com')
      setStatus('Email copied to clipboard — paste it into your mail client.')
    } catch (e) {
      void e
      setStatus('Could not copy email. Please use the link to open your mail client.')
    }
  }

  return (
    <section id="contact" className="contact">
      <div className="container">
        <h2 className="section-title">Get In Touch</h2>
        <div className="contact-content">
          <div className="contact-info">
            <div className="contact-item">
              <FaEnvelope aria-hidden="true" />
              <p>
                <a href="mailto:tilahunm569@gmail.com?subject=Portfolio%20Inquiry" className="contact-link">tilahunm569@gmail.com</a>
                <button type="button" className="icon-btn" onClick={copyEmail} aria-label="Copy email to clipboard"><FaClipboard /></button>
              </p>
            </div>

            <div className="contact-item">
              <FaPhone aria-hidden="true" />
              <p><a href="tel:+251930222188" className="contact-link">+251-930-222188</a></p>
            </div>

            <div className="contact-item">
              <FaLinkedin aria-hidden="true" />
              <p><a href="https://www.linkedin.com/feed/" target="_blank" rel="noreferrer" className="contact-link" title="LinkedIn">LinkedIn</a></p>
            </div>

            <div className="contact-item">
              <FaFacebook aria-hidden="true" />
              <p><a href="https://web.facebook.com/" target="_blank" rel="noreferrer" className="contact-link" title="Facebook">Facebook</a></p>
            </div>

            <div className="contact-item">
              <FaCalendarAlt aria-hidden="true" />
              <p><a href={CALENDLY_URL} target="_blank" rel="noreferrer" className="contact-link" title="Schedule a call">Schedule a call</a></p>
            </div>
          </div>

          <form
            className="contact-form"
            onSubmit={handleSubmit}
            aria-live="polite"
            name="contact"
            method={FORMSPREE_ID ? 'POST' : 'POST'}
            data-netlify={FORMSPREE_ID ? undefined : 'true'}
            data-netlify-honeypot="bot-field"
          >
            {/* Netlify: required hidden inputs for static form handling */}
            {!FORMSPREE_ID && <input type="hidden" name="form-name" value="contact" />}
            {!FORMSPREE_ID && <input type="hidden" name="bot-field" />}
            <label className="sr-only" htmlFor="name">Name</label>
            <input id="name" name="name" type="text" placeholder="Your Name" required />

            <label className="sr-only" htmlFor="email">Email</label>
            <input id="email" name="email" type="email" placeholder="Your Email" required />

            <label className="sr-only" htmlFor="message">Message</label>
            <textarea id="message" name="message" placeholder="Your Message" rows="5" required></textarea>

            <button type="submit" className="btn btn-primary">Send Message</button>
            {status && <p className="form-status" role="status">{status} {status && (<a href="mailto:tilahunm569@gmail.com" className="contact-link">Email me</a>)}</p>}
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact
