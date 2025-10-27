// src/components/Skills.jsx
import React, { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

const skills = [
  { name: 'Java', level: '85%' },
  { name: 'C++', level: '80%' },
  { name: 'SQL', level: '75%' },
  { name: 'HTML/CSS/JS', level: '60%' }
]

const Skills = () => {
  const ref = useRef()

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bars = entry.target.querySelectorAll('.skill-progress')
          bars.forEach((b, i) => b.style.width = skills[i].level)
        }
      })
    }, { threshold: 0.5 })

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="skills"
      className="skills"
      // public/ image renamed to lowercase 'skill.png' for consistency and portability
      style={{ backgroundImage: `url(${import.meta.env.BASE_URL}skill.png)` }}
    >
      <div className="container">
        <motion.h2 className="section-title" initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}>Skills</motion.h2>
        <div className="skills-grid" ref={ref}>
          {skills.map(s => (
            <div className="skill-item" key={s.name}>
              <i className="icon-placeholder" />
              <h3>{s.name}</h3>
              <div className="skill-bar"><div className="skill-progress" data-width={s.level}></div></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
