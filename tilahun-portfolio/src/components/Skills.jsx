// src/components/Skills.jsx
import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const skills = [
  { name: 'Java', level: '85%' },
  { name: 'C++', level: '80%' },
  { name: 'SQL', level: '75%' },
  { name: 'HTML/CSS/JS', level: '60%' },
];

const Skills = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const bars = entry.target.querySelectorAll('.skill-progress');
            bars.forEach((bar, i) => {
              bar.style.width = skills[i].level;
              bar.classList.add('filled');
            });
          }
        });
      },
      { threshold: 0.5 }
    );

    if (containerRef.current) observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="skills"
      className="skills"
      style={{
        backgroundImage: `url(${import.meta.env.BASE_URL}skill.png)`,
      }}
    >
      {/* Dark overlay – theme-aware via CSS */}
      <div className="skills-overlay" />

      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Skills
        </motion.h2>

        <div className="skills-grid" ref={containerRef}>
          {skills.map((s) => (
            <div className="skill-item" key={s.name}>
              <i className="icon-placeholder" />
              <h3>{s.name}</h3>
              <div className="skill-bar">
                <div
                  className="skill-progress"
                  data-width={s.level}
                  style={{ width: 0 }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;