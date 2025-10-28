// src/components/Contact.jsx
import React, { useState } from 'react'
import { FaEnvelope, FaPhone, FaLinkedin, FaFacebook, FaClipboard, FaCalendarAlt } from 'react-icons/fa'

const Contact = () => {
  const [status, setStatus] = useState(null) // Changed to object: { type: 'success' | 'error', message: string }

  const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID || ''

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
        setStatus({ type: 'success', message: "Thanks — I'll get back to you soon!" })
        e.target.reset()
      } else {
        setStatus({ type: 'error', message: 'Oops — something went wrong. Try emailing me directly:' })
      }
    } catch (e) {
      setStatus({ type: 'error', message: 'Network error — try emailing me directly:' })
    }
  }

  const copyEmail = async () => {
    const email = 'tilahunm569@gmail.com'
    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(email)
        setStatus({ type: 'success', message: 'Email copied to clipboard — paste it into your mail client.' })
        return
      } catch (err) {
        // Fallback below
      }
    }
    // Fallback: Create temp input
    const textArea = document.createElement('textarea')
    textArea.value = email
    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()
    try {
      document.execCommand('copy')
      setStatus({ type: 'success', message: 'Email copied to clipboard — paste it into your mail client.' })
    } catch (err) {
      setStatus({ type: 'error', message: 'Could not copy email. Please use the link to open your mail client.' })
    }
    document.body.removeChild(textArea)
  }

  const renderStatus = () => {
    if (!status) return null
    const isError = status.type === 'error'
    return (
      <p className="form-status" role="status">
        {status.message}{' '}
        {isError && (
          <a href="mailto:tilahunm569@gmail.com" className="contact-link">Email me</a>
        )}
      </p>
    )
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
              <p>
                <a 
                  href="https://www.linkedin.com/in" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="contact-link" 
                  title="LinkedIn"
                  aria-label="My LinkedIn profile"
                >
                  LinkedIn
                </a>
              </p>
            </div>

            <div className="contact-item">
              <FaFacebook aria-hidden="true" />
              <p>
                <a 
                  href="https://www.facebook.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="contact-link" 
                  title="Facebook"
                  aria-label="My Facebook profile"
                >
                  Facebook
                </a>
              </p>
            </div>
          </div>
          <form
            className="contact-form"
            onSubmit={handleSubmit}
            aria-live="polite"
            name="contact"
            method="POST"
            data-netlify={FORMSPREE_ID ? undefined : 'true'}
          >
            {/* Netlify: required hidden inputs for static form handling */}
            {!FORMSPREE_ID && <input type="hidden" name="form-name" value="contact" />}
            {/* Honeypot: improved for better bot detection */}
            <input type="text" name="bot-field" className="honeypot" style={{ display: 'none' }} />
            <label className="sr-only" htmlFor="name">Name</label>
            <input id="name" name="name" type="text" placeholder="Your Name" required />

            <label className="sr-only" htmlFor="email">Email</label>
            <input id="email" name="email" type="email" placeholder="Your Email" required />

            <label className="sr-only" htmlFor="message">Message</label>
            <textarea id="message" name="message" placeholder="Your Message" rows="5" required></textarea>

            <button type="submit" className="btn btn-primary">Send Message</button>
            {renderStatus()}
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact