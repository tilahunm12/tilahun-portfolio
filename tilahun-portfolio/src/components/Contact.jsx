// src/components/Contact.jsx
import React, { useState } from 'react'

const Contact = () => {
  const [status, setStatus] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const form = new FormData(e.target)

    // Example: submit to Formspree - replace YOUR_FORMSPREE_ID
    const res = await fetch('https://formspree.io/f/YOUR_FORMSPREE_ID', {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: form
    })

    if (res.ok) {
      setStatus('Thanks — I\'ll get back to you soon!')
      e.target.reset()
    } else {
      setStatus('Oops — something went wrong. Try emailing me at tilahunm569@gmail.com')
    }
  }

  return (
    <section id="contact" className="contact">
      <div className="container">
        <h2 className="section-title">Get In Touch</h2>
        <div className="contact-content">
          <div className="contact-info">
            <div className="contact-item"><i className="fas fa-envelope" /> <p>tilahunm569@gmail.com</p></div>
            <div className="contact-item"><i className="fas fa-phone" /> <p>+251-930-222188</p></div>
            <div className="contact-item"><i className="fab fa-linkedin" /> <p>linkedin.com/in/tilahun-misikir</p></div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <input name="name" type="text" placeholder="Your Name" required />
            <input name="email" type="email" placeholder="Your Email" required />
            <textarea name="message" placeholder="Your Message" rows="5" required></textarea>
            <button type="submit" className="btn btn-primary">Send Message</button>
            {status && <p className="form-status">{status}</p>}
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact
