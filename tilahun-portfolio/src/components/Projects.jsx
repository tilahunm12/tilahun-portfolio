// clean single-file implementation with subtle animations
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Modal from './Modal'
import { FaBuilding, FaShoppingCart, FaHome, FaGithub, FaExclamationCircle } from 'react-icons/fa'
// Image imports - add the PNG files to `src/assets/` with these names:
// hotel.png, supermarket.png, realestate.png
// If the files don't exist yet the app will fall back to the icon-only view.
import hotelPreview from '../assets/Hotel.png'
import supermarketPreview from '../assets/Supermarket.png'
import realestatePreview from '../assets/Realestate.png'

const localProjects = [
  { id: 'hotel', title: 'Hotel Reservation System', tech: ['Java'], category: 'Java', icon: <FaBuilding />, desc: 'Java app for hotel management.', repoUrl: 'https://github.com/tilahunm12/hotel-reservation', liveUrl: 'https://tilahunm12.github.io/hotel-reservation-demo', preview: hotelPreview },
  { id: 'supermarket', title: 'Supermarket Management', tech: ['C++', 'SQL'], category: 'C++', icon: <FaShoppingCart />, desc: 'C++ app for inventory and sales.', repoUrl: 'https://github.com/tilahunm12/supermarket-management', liveUrl: 'https://tilahunm12.github.io/supermarket-demo', preview: supermarketPreview },
  { id: 'realestate', title: 'Real Estate System', tech: ['C++'], category: 'C++', icon: <FaHome />, desc: 'Property management software.', repoUrl: 'https://github.com/tilahunm12/real-estate-system', liveUrl: 'https://tilahunm12.github.io/realestate-demo', preview: realestatePreview }
]

const Projects = () => {
  const [projects] = useState(localProjects)
  const [filter, setFilter] = useState('All')
  const [modalData, setModalData] = useState(null)
  const [repos, setRepos] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [hasMore, setHasMore] = useState(true)

  const GITHUB_USERNAME = 'TilahunMisikir'
  const PER_PAGE = 6

  useEffect(() => {
    if (filter === 'GitHub') loadRepos(page)
  }, [filter, page])

  const loadRepos = async (pageNum) => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=${PER_PAGE}&page=${pageNum}`)
      if (!res.ok) throw new Error('Failed to fetch repositories')
      const data = await res.json()
      if (data.length < PER_PAGE) setHasMore(false)
      setRepos(prev => [...prev, ...data])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleViewMore = () => setPage(prev => prev + 1)

  const categories = ['All', 'Java', 'C++', 'Web', 'GitHub']

  const filteredProjects = filter === 'All' ? projects : filter === 'GitHub' ? [] : projects.filter(p => p.category === filter)

  const overlayVariants = {
    rest: { opacity: 0, y: 10, pointerEvents: 'none' },
    hover: { opacity: 1, y: 0, pointerEvents: 'auto', transition: { duration: 0.22, ease: 'easeOut' } }
  }

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } }
  }

  const childVariants = {
    hidden: { opacity: 0, y: 22 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.42, ease: 'easeOut' } }
  }

  return (
    <section id="projects" className="projects">
      <div className="container">
        <h2 className="section-title">My Projects</h2>

        <div className="filter-buttons">
          {categories.map(cat => (
            <button key={cat} className={`filter-btn ${filter === cat ? 'active' : ''}`} onClick={() => { setFilter(cat); setRepos([]); setPage(1); setHasMore(true) }}>{cat}</button>
          ))}
        </div>

        <motion.div layout className="projects-grid" variants={containerVariants} initial="hidden" animate="visible">
          <AnimatePresence>
            {filteredProjects.map(p => (
              <motion.div
                key={p.id}
                layout
                className="project-card"
                onClick={() => setModalData(p)}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setModalData(p); } }}
                role="button"
                tabIndex={0}
                variants={childVariants}
                whileHover={{ scale: 1.04, translateY: -8 }}
                whileTap={{ scale: 0.992 }}
              >
                <div
                  className={`project-image ${p.preview ? 'has-bg' : ''}`}
                  role="img"
                  aria-label={`${p.title} icon`}
                  style={p.preview ? { backgroundImage: `url(${p.preview})`, backgroundSize: 'cover', backgroundPosition: 'center' } : undefined}
                >
                  {/* Keep the icon accessible/visible if the image isn't present or as an overlay */}
                  <span className="icon" aria-hidden="true">{p.icon}</span>
                  <span className="sr-only">{p.title} icon</span>
                </div>
                <div className="project-info">
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>
                  <div className="project-tech">{p.tech.map(t => <span key={t}>{t}</span>)}</div>
                  <div className="project-links" style={{ marginTop: '0.75rem', display: 'flex', gap: '0.5rem' }}>
                    {p.id === 'hotel' ? (
                      <a
                        href={`${import.meta.env.BASE_URL}hotel.pdf`}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-primary"
                        onClick={e => e.stopPropagation()}
                      >
                        View More
                      </a>
                    ) : p.id === 'supermarket' ? (
                      <>
                        <a
                          href={`${import.meta.env.BASE_URL}supermarket.pdf`}
                          target="_blank"
                          rel="noreferrer"
                          className="btn btn-primary"
                          onClick={e => e.stopPropagation()}
                        >
                          View More
                        </a>
                        <a
                          href={`${import.meta.env.BASE_URL}database.pdf`}
                          target="_blank"
                          rel="noreferrer"
                          className="btn btn-secondary"
                          style={{ marginLeft: '0.5rem' }}
                          onClick={e => e.stopPropagation()}
                        >
                          Database
                        </a>
                      </>
                    ) : p.id === 'realestate' ? (
                      <a
                        href={`${import.meta.env.BASE_URL}realestate.pdf`}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-primary"
                        onClick={e => e.stopPropagation()}
                      >
                        View More
                      </a>
                    ) : (
                      <>
                        {p.liveUrl && <a href={p.liveUrl} target="_blank" rel="noreferrer" className="btn btn-secondary" onClick={e => e.stopPropagation()}>Live</a>}
                        {p.repoUrl && <a href={p.repoUrl} target="_blank" rel="noreferrer" className="btn btn-primary" onClick={e => e.stopPropagation()}>Source</a>}
                      </>
                    )}
                  </div>
                </div>

                <motion.div className="project-overlay" variants={overlayVariants} initial="rest" whileHover="hover">
                  {p.preview && (
                    <img
                      src={p.preview}
                      alt={`${p.title} preview`}
                      className="preview-gif"
                      loading="lazy"
                      decoding="async"
                      width="600"
                      height="120"
                    />
                  )}
                  <div className="overlay-actions">
                    <button className="btn btn-primary" onClick={e => { e.stopPropagation(); setModalData(p) }}>Quick View</button>
                  </div>                                                                                                                                                                              
                </motion.div>
              </motion.div>
            ))}

            {filter === 'GitHub' && (
              <>
                {loading && <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="loading-spinner"><div className="spinner" /><p>Fetching your latest GitHub repositories...</p></motion.div>}
                {error && <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="error-message"><FaExclamationCircle /> <span>{error}</span></motion.div>}

                {!loading && !error && repos.map(repo => (
                  <motion.div key={repo.id} className="project-card github-card" variants={childVariants} whileHover={{ scale: 1.04, translateY: -8 }}>
                    <div className="project-image"><FaGithub /></div>
                    <div className="project-info">
                      <h3>{repo.name}</h3>
                      <p>{repo.description || 'No description available.'}</p>
                      <a href={repo.html_url} target="_blank" rel="noreferrer" className="btn btn-primary">View Repo</a>
                    </div>
                  </motion.div>
                ))}

                {!loading && !error && hasMore && <div className="view-more"><button className="btn btn-secondary" onClick={handleViewMore}>View More Projects</button></div>}
                {!hasMore && filter === 'GitHub' && repos.length > 0 && <p className="end-message">🎉 You've reached the end!</p>}
              </>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {modalData && <Modal data={modalData} onClose={() => setModalData(null)} />}
    </section>
  )
}

export default Projects
