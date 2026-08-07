import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { projects } from '../data/projects';
import { Search, X } from 'lucide-react';

export default function Projects() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Web Design', 'Branding', 'Development', 'SEO & Growth'];

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            project.industry.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <section className="section-dark" style={{ paddingTop: '180px', minHeight: '85vh' }}>
      <div className="container">
        <div style={{ marginBottom: '40px' }}>
          <span style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#888' }}>
            Portfolio & Case Studies
          </span>
          <h1 style={{ fontSize: 'clamp(48px, 7vw, 96px)', fontWeight: '800', marginTop: '12px' }}>
            Projects <span style={{ fontSize: '0.4em', verticalAlign: 'super', opacity: 0.6 }}>27</span>
          </h1>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="search-filter-bar">
          <div className="search-input-wrapper">
            <Search className="search-icon" size={18} />
            <input
              type="text"
              placeholder="Search by client, project name, or industry..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="clear-search-btn">
                <X size={16} />
              </button>
            )}
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="select-filter"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                Category: {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="projects-grid">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="project-card"
                onClick={() => navigate(`/projects/${project.slug}`)}
              >
                <div className="project-image-wrapper">
                  <img src={project.heroImage} alt={project.title} className="project-image" />
                </div>
                <div className="project-meta">
                  <span className="project-title">{project.title}</span>
                  <span className="project-year">{project.category} · {project.year}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '80px 0', color: 'rgba(255,255,255,0.5)' }}>
            <h3 style={{ fontSize: '24px', color: '#fff' }}>No projects match your filter.</h3>
            <p style={{ marginTop: '8px' }}>Try clearing your search query or selecting 'All' categories.</p>
            <button 
              onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
              className="btn-primary"
              style={{ marginTop: '24px' }}
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
