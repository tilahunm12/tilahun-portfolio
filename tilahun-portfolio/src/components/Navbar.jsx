
// src/components/Navbar.jsx (updated)
import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-scroll'
import { FaBars, FaTimes, FaMoon, FaSun } from 'react-icons/fa'
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
        <div className="logo">Tilahun Misikir</div>
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
        <button className="hamburger" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </nav>
    </header>
  )
}

export default Navbar
