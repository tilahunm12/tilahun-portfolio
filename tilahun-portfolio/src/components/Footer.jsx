// src/components/Footer.jsx
import React from 'react'
import { FaGithub, FaLinkedin, FaFilePdf } from 'react-icons/fa'

const Footer = () => (
  <footer className="footer">
    <div className="container footer-inner">
      <p>© {new Date().getFullYear()} Tilahun Misikir. All rights reserved.</p>
      {/* footer social links removed: GitHub, LinkedIn and resume icons intentionally hidden */}
    </div>
  </footer>
)

export default Footer