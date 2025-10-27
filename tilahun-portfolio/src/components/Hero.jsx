import React from 'react'
import { motion } from 'framer-motion'

// ✅ Helper to always load from the correct base path (works on GitHub Pages)
const getImageUrl = (fileName) => `${import.meta.env.BASE_URL}${fileName}`

const Hero = () => {
  return (
    <section id="home" className="hero-section">
      <div className="container hero-container">

        {/* Text content */}
        <div className="hero-text">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Hi, I’m <span className="highlight">Tilahun Misikir</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
          >
            Passionate Software Developer — I design and build clean,
            interactive, and modern web experiences using React, Java, and C++.
          </motion.p>

          <motion.a
            href="#projects"
            className="btn btn-primary"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
          >
            View My Work
          </motion.a>
        </div>

        {/* Animated circular profile image */}
        <motion.div
          className="profile-wrapper"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
        >
          <motion.img
            src={getImageUrl('heroImg.png')}   // ✅ works in dev & GitHub Pages
            alt="Tilahun Misikir"
            className="profile-img"
            animate={{ y: [0, -10, 0] }}       // floating motion
            transition={{
              repeat: Infinity,
              duration: 4,
              ease: 'easeInOut',
            }}
          />
        </motion.div>

      </div>
    </section>
  )
}

export default Hero
