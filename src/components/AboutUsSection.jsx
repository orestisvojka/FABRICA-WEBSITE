import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

const featureCards = [
  {
    id: '01',
    index: '01',
    image: '/about-thumb-1.png',
    text: 'CREATE — Modern web & mobile products'
  },
  {
    id: '02',
    index: '02',
    image: '/about-thumb-2.png',
    text: 'HELP — AI agents & custom automation'
  },
  {
    id: '03',
    index: '03',
    image: '/about-thumb-3.png',
    text: 'GROW — Data-driven digital marketing'
  },
  {
    id: '04',
    index: '04',
    image: '/about-thumb-4.png',
    text: '500+ projects completed with 99.9% satisfaction'
  }
];

export default function AboutUsSection() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15, margin: "-100px 0px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.08
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.75,
        ease: [0.25, 1, 0.5, 1]
      }
    }
  };

  const featureHoverVariants = {
    rest: { y: 0, boxShadow: "0 4px 20px rgba(0, 0, 0, 0.02)" },
    hover: {
      y: -6,
      boxShadow: "0 20px 40px rgba(0, 0, 0, 0.08)",
      transition: { duration: 0.22, ease: "easeOut" }
    }
  };

  const showreelZoomVariants = {
    rest: { scale: 1 },
    hover: {
      scale: 1.05,
      transition: { duration: 0.55, ease: [0.25, 1, 0.5, 1] }
    }
  };

  const playBtnVariants = {
    rest: { scale: 1 },
    hover: {
      scale: 1.08,
      transition: { type: "spring", stiffness: 350, damping: 20 }
    }
  };

  return (
    <section className="about-us-section" ref={sectionRef}>
      <div className="container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="about-wrapper"
        >
          {/* Top Header Grid */}
          <div className="about-header-grid">
            <motion.div variants={itemVariants} className="about-badge-pill">
              <span className="about-badge-plus">+</span>
              <span className="about-badge-text">About us</span>
            </motion.div>

            <motion.div variants={itemVariants} className="about-headline-box">
              <span className="about-brand-stamp">QuolyTech®</span>
              <h2 className="about-headline">
                <span className="about-headline-dark">CREATE. HELP. GROW.</span>{" "}
                <span className="about-headline-muted">Digital Products • AI • Growth</span>
              </h2>
              <p className="about-subtext">
                See how QuolyTech® combines development, design, AI automation, and marketing into one connected digital journey.
              </p>
            </motion.div>
          </div>

          {/* Top 4 Horizontal Feature Cards Grid */}
          <motion.div variants={containerVariants} className="about-features-grid">
            {featureCards.map((card) => (
              <motion.div
                key={card.id}
                variants={itemVariants}
                className="about-feature-card"
                initial="rest"
                whileHover="hover"
                animate="rest"
              >
                <motion.div className="about-feature-inner" variants={featureHoverVariants}>
                  <div className="about-card-top-strip">
                    <div className="about-card-shapes">
                      <span className="about-shape-dot"></span>
                      <span className="about-shape-rect"></span>
                      <span className="about-shape-dot"></span>
                    </div>
                    <span className="about-card-index">{card.index}</span>
                  </div>

                  <div className="about-card-body">
                    <img 
                      src={card.image} 
                      alt={card.text} 
                      className="about-card-thumb"
                    />
                    <h3 className="about-card-title">{card.text}</h3>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* Massive 100% Width Showreel Card */}
          <motion.div variants={itemVariants} className="about-showreel-wrapper">
            <motion.div 
              className="about-showreel-card"
              initial="rest"
              whileHover="hover"
              animate="rest"
              onClick={() => setIsVideoModalOpen(true)}
            >
              {/* High Contrast Background Image */}
              <motion.img 
                src="/about-showreel.png" 
                alt="QuolyTech Studio Showreel" 
                className="about-showreel-img"
                variants={showreelZoomVariants}
              />

              {/* Overlay Gradient */}
              <div className="about-showreel-overlay" />

              {/* Central Play Button Lockup */}
              <motion.div className="about-play-lockup" variants={playBtnVariants}>
                <div className="about-play-circle">
                  <svg width="18" height="20" viewBox="0 0 18 20" fill="currentColor">
                    <path d="M16.5 8.70096C17.8333 9.47076 17.8333 11.3953 16.5 12.1651L3.75 19.5263C2.41667 20.2961 0.749999 19.3338 0.749999 17.7942L0.75 3.0718C0.75 1.5322 2.41667 0.569947 3.75 1.33975L16.5 8.70096Z" fill="#0A0A0A" />
                  </svg>
                </div>
                <div className="about-play-text-group">
                  <span className="about-play-title">Watch showreel</span>
                  <span className="about-play-stamp">(2016–2026)</span>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Video Showreel Modal */}
      <AnimatePresence>
        {isVideoModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="video-modal-backdrop"
            onClick={() => setIsVideoModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="video-modal-container"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className="video-modal-close"
                onClick={() => setIsVideoModalOpen(false)}
              >
                ✕
              </button>
              <div className="video-player-box">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                  title="QuolyTech Studio Showreel"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
