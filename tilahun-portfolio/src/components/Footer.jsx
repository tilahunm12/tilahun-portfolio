// src/components/Footer.jsx
import React from 'react'
import { FaGithub, FaLinkedin, FaFilePdf } from 'react-icons/fa'

const Footer = () => (
  <footer className="footer">
    <div className="container footer-inner">
      <p>© {new Date().getFullYear()} Tilahun Misikir. All rights reserved.</p>
      <div className="footer-social">
        <a href="https://github.com/tilahunm12" target="_blank" rel="noreferrer" aria-label="Tilahun on GitHub" className="icon-link"><FaGithub /></a>
        <a href="https://www.linkedin.com/in/tilahunmisikir" target="_blank" rel="noreferrer" aria-label="Tilahun on LinkedIn" className="icon-link"><FaLinkedin /></a>
        <a href="/tilahun_resume.pdf" target="_blank" rel="noreferrer" aria-label="Download résumé" className="icon-link"><FaFilePdf /></a>
      </div>
    </div>
  </footer>
)

export default Footer