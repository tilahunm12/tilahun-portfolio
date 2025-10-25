// src/components/Projects.jsx
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Modal from './Modal'
import { FaBuilding, FaShoppingCart, FaHome, FaGithub, FaExclamationCircle } from 'react-icons/fa'

// Local static projects
const localProjects = [
  { id: 'hotel', title: 'Hotel Reservation System', tech: ['Java'], category: 'Java', icon: <FaBuilding />, desc: 'Java app for hotel management.' },
  { id: 'supermarket', title: 'Supermarket Management', tech: ['C++', 'SQL'], category: 'C++', icon: <FaShoppingCart />, desc: 'C++ app for inventory and sales.' },
  { id: 'realestate', title: 'Real Estate System', tech: ['C++'], category: 'C++', icon: <FaHome />, desc: 'Property management software.' }
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

  // Fetch GitHub repos with pagination
  useEffect(() => {
    if (filter === 'GitHub') {
      loadRepos(page)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, page])

  const loadRepos = async (pageNum) => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(
        `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=${PER_PAGE}&page=${pageNum}`
      )
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

  const filteredProjects =
    filter === 'All'
      ? projects
      : filter === 'GitHub'
      ? []
      : projects.filter(p => p.category === filter)

  return (
    <section id="projects" className="projects">
      <div className="container">
        <h2 className="section-title">My Projects</h2>

        {/* Filter Buttons */}
        <div className="filter-buttons">
          {categories.map(cat => (
            <button
              key={cat}
              className={`filter-btn ${filter === cat ? 'active' : ''}`}
              onClick={() => {
                setFilter(cat)
                setRepos([])
                setPage(1)
                setHasMore(true)
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div layout className="projects-grid">
          <AnimatePresence>
            {/* Local Projects */}
            {filteredProjects.map(p => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.3 }}
                className="project-card"
                onClick={() => setModalData(p)}
              >
                <div className="project-image">{p.icon}</div>
                <div className="project-info">
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>
                  <div className="project-tech">
                    {p.tech.map(t => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}

            {/* GitHub Projects */}
            {filter === 'GitHub' && (
              <>
                {loading && (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="loading-spinner"
                  >
                    <div className="spinner"></div>
                    <p>Fetching your latest GitHub repositories...</p>
                  </motion.div>
                )}

                {error && (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="error-message"
                  >
                    <FaExclamationCircle /> <span>{error}</span>
                  </motion.div>
                )}

                {!loading && !error &&
                  repos.map(repo => (
                    <motion.div
                      key={repo.id}
                      className="project-card github-card"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -30 }}
                    >
                      <div className="project-image">
                        <FaGithub />
                      </div>
                      <div className="project-info">
                        <h3>{repo.name}</h3>
                        <p>{repo.description || 'No description available.'}</p>
                        <a
                          href={repo.html_url}
                          target="_blank"
                          rel="noreferrer"
                          className="btn btn-primary"
                        >
                          View Repo
                        </a>
                      </div>
                    </motion.div>
                  ))}

                {/* View More Button */}
                {!loading && !error && hasMore && (
                  <div className="view-more">
                    <button className="btn btn-secondary" onClick={handleViewMore}>
                      View More Projects
                    </button>
                  </div>
                )}

                {!hasMore && filter === 'GitHub' && repos.length > 0 && (
                  <p className="end-message">🎉 You've reached the end!</p>
                )}
              </>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Modal */}
      {modalData && <Modal data={modalData} onClose={() => setModalData(null)} />}
    </section>
  )
}

export default Projects
