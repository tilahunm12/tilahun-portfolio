
// src/components/Navbar.jsx (updated)
import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-scroll'
import { FaBars, FaTimes, FaMoon, FaSun, FaGithub, FaLinkedin, FaFilePdf } from 'react-icons/fa'
import { ThemeContext } from '../context/ThemeContext'

const Navbar = () => {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { theme, toggleTheme } = useContext(ThemeContext)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navClass = scrolled ? 'header header-scrolled' : 'header'

  return (
    <header className={navClass}>
      <nav className="nav-container">
        <div className="logo">
          <img
            src={import.meta.env.BASE_URL + 'tilahun_logo.svg'}
            alt="Tilahun Misikir logo"
            className="logo-img"
            width={40}
            height={40}
          />
          <span className="brand-text">Tilahun Misikir</span>
        </div>
        <div className="header-actions">
          <a href="https://github.com/tilahunm12" target="_blank" rel="noreferrer" aria-label="Tilahun on GitHub" className="icon-link"><FaGithub /></a>
          <a href="https://www.linkedin.com/in/tilahunmisikir" target="_blank" rel="noreferrer" aria-label="Tilahun on LinkedIn" className="icon-link"><FaLinkedin /></a>
          <a href="/tilahun_resume.pdf" target="_blank" rel="noreferrer" aria-label="Download résumé" className="icon-link"><FaFilePdf /></a>
        </div>
        <ul className={open ? 'nav-menu active' : 'nav-menu'}>
          {['home','about','projects','skills','contact'].map(section => (
            <li key={section} className="nav-item">
              <Link to={section} smooth duration={500} spy offset={-70} onClick={() => setOpen(false)} className="nav-link">
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </Link>
            </li>
          ))}
          <li>
            <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle theme">
              {theme === 'light' ? <FaMoon /> : <FaSun />}
            </button>
          </li>
        </ul>
        <button className="hamburger" onClick={() => setOpen(!open)} aria-label="Toggle menu" aria-expanded={open}>
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </nav>
    </header>
  )
}

export default Navbar
