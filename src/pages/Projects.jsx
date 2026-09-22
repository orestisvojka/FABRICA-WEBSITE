import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../data/projects';
import { Search, ChevronDown, X } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import ContactSection from '../components/ContactSection';

const getProjectLogo = (slug, title) => {
  switch (slug) {
    case 'boltshift':
      return (
        <div className="pm-logo-lockup">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="12" r="11" fill="currentColor" fillOpacity="0.2"/>
            <path d="M13 2L4 14H11L9 22L20 10H12L13 2Z" fill="#FFFFFF"/>
          </svg>
          <span>Boltshift</span>
        </div>
      );
    case 'ephemeral':
      return (
        <div className="pm-logo-lockup">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
          </svg>
          <span>Ephemeral</span>
        </div>
      );
    case 'powersurge':
      return (
        <div className="pm-logo-lockup">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <rect x="6" y="4" width="12" height="16" rx="2" stroke="#FFFFFF" strokeWidth="2" fill="none"/>
            <rect x="9" y="1" width="6" height="3" rx="1" fill="#FFFFFF"/>
            <rect x="9" y="8" width="6" height="8" rx="1" fill="#FFFFFF"/>
          </svg>
          <span>Powersurge</span>
        </div>
      );
    case 'mastermail':
      return (
        <div className="pm-logo-lockup">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L17 7L12 12L7 7L12 2Z" fill="#FFFFFF"/>
            <path d="M12 12L17 17L12 22L7 17L12 12Z" fill="#FFFFFF"/>
            <path d="M2 12L7 7L12 12L7 17L2 12Z" fill="#FFFFFF"/>
            <path d="M22 12L17 7L12 12L17 17L22 12Z" fill="#FFFFFF"/>
          </svg>
          <span>Mastermail</span>
        </div>
      );
    case 'warpspeed':
      return (
        <div className="pm-logo-lockup">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.5">
            <path d="M18.178 8c5.096 0 5.096 8 0 8-5.095 0-7.133-8-12.356-8-5.096 0-5.096 8 0 8 5.223 0 7.261-8 12.356-8z"/>
          </svg>
          <span>Warpspeed</span>
        </div>
      );
    case 'cloudwatch':
      return (
        <div className="pm-logo-lockup">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="9" cy="12" r="6" fill="#FFFFFF" fillOpacity="0.8"/>
            <circle cx="15" cy="12" r="6" fill="#FFFFFF"/>
          </svg>
          <span>CloudWatch</span>
        </div>
      );
    default:
      return (
        <div className="pm-logo-lockup">
          <span>{title}</span>
        </div>
      );
  }
};

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
    return projects.filter((project) => {
      const matchesSearch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
        duration: 0.7,
        ease: [0.25, 1, 0.5, 1]
      }
    }
  };

  return (
    <div className="projects-page-outer">
      <SEOHead
        title="Projects & Case Studies | QuolyTech"
        description="Explore web application prototypes, interface designs, developer tools, and brand identity projects created by QuolyTech."
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
              <span className="projects-year-stamp">(2016-25©)</span>
              <p className="projects-subtext">
                We've helped businesses across various industries achieve their goals. Here are some of our recent projects.
              </p>

              {/* Filter & Search Controls */}
              <div className="projects-controls-row">
                <div className="projects-search-box">
                  <Search size={16} className="projects-search-icon" />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="projects-search-input"
                  />
                  {searchQuery && (
                    <button onClick={() => setSearchQuery('')} className="projects-clear-btn">
                      <X size={14} />
                    </button>
                  )}
                </div>

                {/* Custom Interactive Dropdown Card (Replacing Native Select) */}
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
                  {/* Top Metadata Bar */}
                  <div className="project-card-top-bar">
                    <span className="project-card-title">{project.title}</span>
                    <span className="project-card-year">/{project.year}</span>
                  </div>

                  {/* Photo Container with Centered White Logo Watermark */}
                  <div className="project-card-img-wrapper">
                    <motion.img
                      src={project.heroImage}
                      alt={project.title}
                      className="project-card-bg-img"
                    />

                    {/* Dark gradient overlay */}
                    <div className="project-card-gradient-overlay" />

                    {/* Centered White Logo Overlay matching Home Page */}
                    <div className="pm-logo-overlay">
                      {getProjectLogo(project.slug, project.title)}
                    </div>
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
