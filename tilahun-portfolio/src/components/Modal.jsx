
import React from 'react'
import { motion } from 'framer-motion'

const Modal = ({ data, onClose }) => {
  return (
    <div className="modal" onClick={onClose}>
      <motion.div className="modal-content" onClick={(e)=>e.stopPropagation()} initial={{ scale:0.9, opacity:0 }} animate={{ scale:1, opacity:1 }} transition={{ duration:0.25 }}>
        <button className="close" onClick={onClose}>&times;</button>
        <h2>{data.title}</h2>
        <p>{data.desc}</p>
        <h3>Technologies Used:</h3>
        <ul>{data.tech.map(t => <li key={t}>{t}</li>)}</ul>
        <p><strong>Source Code:</strong> Available upon request.</p>
      </motion.div>
    </div>
  )
}

export default Modal
