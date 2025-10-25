// src/components/Hero.jsx
import React from 'react'
import { motion } from 'framer-motion'

const Hero = () => {
  return (
    <section id="home" className="hero">
      <div className="container hero-container">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="hero-title">Hi, I'm <span className="highlight">Tilahun Misikir</span></h1>
          <p className="hero-subtitle">Third-Year Computer Science Student | Passionate Developer</p>
          <p className="hero-description">Building innovative software solutions with a focus on backend systems and database management.</p>
          <div className="hero-buttons">
            <a href="#projects" className="btn btn-primary">View Projects</a>
            <a href="#contact" className="btn btn-secondary">Get In Touch</a>
          </div>
        </motion.div>

        <motion.div
          className="hero-image"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9 }}
        >
          <div className="image-placeholder">
            <img src="/heroImg.png" alt="Tilahun" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
