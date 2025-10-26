import React from 'react'
import Tilt from 'react-parallax-tilt'
import { motion } from 'framer-motion'
import heroImg from '../assets/heroImg.png'  // 👈 make sure this path is correct

const Hero = () => {
  return (
    <section id="home" className="hero-section">
      <div className="container hero-container">
        {/* Left side text */}
        <div className="hero-text">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Hi, I’m <span className="highlight">Tilahun Misikir</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            I’m a passionate software developer and designer who loves creating
            clean, modern, and responsive web experiences.
          </motion.p>

          <motion.a
            href="#projects"
            className="btn btn-primary"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            View My Work
          </motion.a>
        </div>

        {/* Right side photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <Tilt
            tiltMaxAngleX={10}
            tiltMaxAngleY={10}
            perspective={1000}
            scale={1.05}
            transitionSpeed={1000}
            gyroscope={true}
            className="hero-img-container"
          >
            <img
              src={heroImg}
              alt="Tilahun Misikir"
              className="hero-img"
            />
          </Tilt>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
