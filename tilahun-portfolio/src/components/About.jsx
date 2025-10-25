// src/components/About.jsx
import React from 'react'
import { motion } from 'framer-motion'

const About = () => {
  return (
    <section id="about" className="about">
      <div className="container">
        <motion.h2 className="section-title" initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} transition={{ duration:0.6 }}>About Me</motion.h2>
        <motion.div className="about-content" initial={{ opacity:0 }} whileInView={{ opacity:1 }} transition={{ duration:0.6 }}>
          <div className="about-text">
            <p>I'm a dedicated third-year Computer Science student with a keen interest in software engineering, databases, and full-stack development.</p>
            <p>I've developed hands-on projects in hotel reservation systems, supermarket management, and real estate listings, honing my abilities in object-oriented design and data persistence.</p>
            <div className="about-stats">
              <div className="stat"><h3>3+</h3><p>Years in CS</p></div>
              <div className="stat"><h3>5+</h3><p>Projects</p></div>
              <div className="stat"><h3>Java, C++, SQL</h3><p>Core Skills</p></div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About