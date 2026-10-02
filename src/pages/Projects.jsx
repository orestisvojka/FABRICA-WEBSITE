import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../data/projects';
import { Search, ChevronDown, X } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import ContactSection from '../components/ContactSection';
import { getProjectLogo } from '../components/ProjectLogos';

export default function Projects() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const categories = ['All', 'Web Design', 'Branding', 'Development', 'SEO & Growth'];

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredProjects = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return projects.filter((project) => {
      const matchesSearch =
        !q ||
        project.title.toLowerCase().includes(q) ||
        project.description.toLowerCase().includes(q) ||
        project.client.toLowerCase().includes(q) ||
        project.category.toLowerCase().includes(q) ||
        (project.industry && project.industry.toLowerCase().includes(q)) ||
        (project.tagline && project.tagline.toLowerCase().includes(q));

      const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.65,
        ease: [0.25, 1, 0.5, 1]
      }
    }
  };

  return (
    <div className="projects-page-outer">
      <SEOHead
        title="Projects & Portfolio | QuolyTech"
        description="Explore 14 live web applications, e-commerce flagships, developer platforms, and digital systems engineered by QuolyTech."
        canonicalPath="/projects/"
      />
      {/* Header Section */}
      <section className="projects-hero-section">
        <div className="projects-container">
          <motion.div
            className="projects-header-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.05 }}
          >
            {/* Left Title */}
            <motion.div variants={itemVariants} className="projects-title-box">
              <h1 className="projects-main-title">Projects.</h1>
            </motion.div>

            {/* Right Subtext & Stamp */}
            <motion.div variants={itemVariants} className="projects-text-box">
              <span className="projects-year-stamp">(2024-26©)</span>
              <p className="projects-subtext">
                We've helped businesses across various industries engineer world-class digital products. Here are 14 of our active production projects.
              </p>

              {/* Filter & Search Controls */}
              <div className="projects-controls-row">
                <div className="projects-search-box">
                  <Search size={16} className="projects-search-icon" />
                  <input
                    type="text"
                    placeholder="Search projects..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="projects-search-input"
                  />
                  {searchQuery && (
                    <button onClick={() => setSearchQuery('')} className="projects-clear-btn" aria-label="Clear search">
                      <X size={14} />
                    </button>
                  )}
                </div>

                {/* Custom Interactive Dropdown Card */}
                <div className="custom-filter-dropdown-container" ref={dropdownRef}>
                  <button 
                    className="custom-filter-trigger-btn"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    type="button"
                    aria-expanded={isDropdownOpen}
                  >
                    <span>Category: <strong>{selectedCategory}</strong></span>
                    <motion.span 
                      animate={{ rotate: isDropdownOpen ? 180 : 0 }} 
                      transition={{ duration: 0.2 }}
                      className="custom-filter-chevron"
                    >
                      <ChevronDown size={15} />
                    </motion.span>
                  </button>

                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div
                        className="custom-filter-dropdown-card"
                        initial={{ opacity: 0, y: -8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.96 }}
                        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                      >
                        {categories.map((cat) => {
                          const isSelected = selectedCategory === cat;
                          return (
                            <div
                              key={cat}
                              className={`custom-filter-item ${isSelected ? 'is-selected' : ''}`}
                              onClick={() => {
                                setSelectedCategory(cat);
                                setIsDropdownOpen(false);
                              }}
                            >
                              <span>Category: {cat}</span>
                              {isSelected && <span className="custom-filter-check">✓</span>}
                            </div>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Projects Cards Grid */}
          <motion.div
            className="projects-replica-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.05 }}
          >
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  variants={itemVariants}
                  className="project-replica-card"
                  onClick={() => navigate(`/projects/${project.slug}`)}
                  whileHover="hover"
                >
                  {/* Top Metadata Bar with direct Live Access Button */}
                  <div className="project-card-top-bar">
                    <div className="project-card-title-group">
                      <span className="project-card-title">{project.title}</span>
                      <span className="project-card-year">/{project.year}</span>
                    </div>

                    <a
                      href={project.liveUrl || project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-card-live-btn"
                      onClick={(e) => e.stopPropagation()}
                      title={`Visit live site: ${project.title}`}
                    >
                      <span className="project-card-live-dot" />
                      <span>Live Site</span>
                      <span className="project-card-arrow">↗</span>
                    </a>
                  </div>

                  {/* Photo Container with Centered White Logo Watermark */}
                  <div className="project-card-img-wrapper">
                    <motion.img
                      src={project.heroImage}
                      alt={project.title}
                      className="project-card-bg-img"
                      onError={(e) => {
                        e.target.onerror = null;
                        if (project.fallbackImage) {
                          e.target.src = project.fallbackImage;
                        }
                      }}
                    />

                    {/* Dark gradient overlay */}
                    <div className="project-card-gradient-overlay" />

                    {/* Centered White Logo Overlay matching Home Page */}
                    <div className="pm-logo-overlay">
                      {getProjectLogo(project.slug, project.title)}
                    </div>
                  </div>

                  {/* Bottom Metadata Bar */}
                  <div className="project-card-bottom-bar">
                    <span className="project-card-category">{project.category}</span>
                    <span className="project-card-view-case">
                      Case Study &rarr;
                    </span>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="projects-empty-state">
                <h3>No projects found</h3>
                <p>Try adjusting your search query or filter category.</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All');
                  }}
                  className="btn-primary"
                  style={{ marginTop: '16px' }}
                >
                  Reset filters
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <ContactSection />
    </div>
  );
}
