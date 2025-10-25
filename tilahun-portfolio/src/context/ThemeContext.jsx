// src/context/ThemeContext.jsx
import React, { createContext, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'


export const ThemeContext = createContext()


export const ThemeProvider = ({ children }) => {
const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light')
const [animating, setAnimating] = useState(false)


useEffect(() => {
document.body.setAttribute('data-theme', theme)
localStorage.setItem('theme', theme)
}, [theme])


const toggleTheme = () => {
setAnimating(true)
setTimeout(() => {
setTheme(theme === 'light' ? 'dark' : 'light')
setAnimating(false)
}, 250)
}


return (
<ThemeContext.Provider value={{ theme, toggleTheme }}>
<AnimatePresence>
{animating && (
<motion.div
key="fade"
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
exit={{ opacity: 0 }}
transition={{ duration: 0.4 }}
className="theme-transition"
/>
)}
</AnimatePresence>
{children}
</ThemeContext.Provider>
)
}