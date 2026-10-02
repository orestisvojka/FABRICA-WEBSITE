import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Plane, 
  UtensilsCrossed, 
  Briefcase, 
  Building2, 
  Clock, 
  ArrowUpRight, 
  Bell, 
  CheckCircle2 
} from 'lucide-react';

// Hook to calculate real-time countdown to the end of the current month
function useEndOfMonthCountdown() {
  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft());

  function calculateTimeLeft() {
    const now = new Date();
    // End of current month at 23:59:59
    const year = now.getFullYear();
    const month = now.getMonth();
    const endOfMonth = new Date(year, month + 1, 0, 23, 59, 59, 999);
    const diff = Math.max(0, endOfMonth.getTime() - now.getTime());

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    return {
      total: diff,
      days,
      hours,
      minutes,
      seconds,
      currentMonth: monthNames[month],
      year
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return timeLeft;
}

export default function ClientLogos() {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.15 });
  const countdown = useEndOfMonthCountdown();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const headerY = useTransform(scrollYProgress, [0, 0.4], [20, 0]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  // 4 upcoming projects as requested by user
  const upcomingProjects = [
    {
      id: "luno",
      title: "LUNO.",
      category: "Mobile App",
      badge: "Traveling",
      badgeColor: "#3b82f6",
      icon: <Plane size={20} />,
      tagline: "Mobile app for traveling",
      description: "Mobile app for modern traveling: curated destinations, flight itineraries, offline navigation, and instant hotel bookings.",
      tech: "iOS & Android • Mobile App"
    },
    {
      id: "fridger",
      title: "FRIDGER.",
      category: "Food Management",
      badge: "Food & Kitchen",
      badgeColor: "#10b981",
      icon: <UtensilsCrossed size={20} />,
      tagline: "Smart app for food",
      description: "Smart food & kitchen management: real-time pantry tracking, expiry alerts, waste reduction, and AI chef recipes.",
      tech: "Mobile App • AI Chef Engine"
    },
    {
      id: "ves",
      title: "VES.",
      category: "Careers & Hiring",
      badge: "Finding Jobs",
      badgeColor: "#8b5cf6",
      icon: <Briefcase size={20} />,
      tagline: "Platform for finding jobs",
      description: "Next-gen platform for finding jobs: algorithmic career matching, verified talent profiles, salary insights, and direct founder chat.",
      tech: "Web & Mobile • Talent Match"
    },
    {
      id: "hipocrates",
      title: "HIPOCRATES.",
      category: "Healthcare ERP",
      badge: "Hospital System",
      badgeColor: "#0ea5e9",
      icon: <Building2 size={20} />,
      tagline: "System for managing hospitals",
      description: "Comprehensive system for managing hospitals: electronic health records (EHR), clinical scheduling, bed allocation, and clinic operations.",
      tech: "Cloud Enterprise • HIPAA Ready"
    }
  ];

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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.65,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  return (
    <section className="client-logos-section upcoming-projects-section" ref={containerRef}>
      <div className="container">
        {/* Section Header */}
        <motion.div 
          className="client-logos-header upcoming-projects-header"
          style={{ y: headerY, opacity: headerOpacity }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="client-logos-title upcoming-title-wrap">
            <span className="title-bullet-icon up-beacon-dot"></span>
            <span className="upcoming-main-heading">Upcoming projects</span>
            <span className="upcoming-sub-pill">In Development</span>
          </div>
          <div className="client-logos-meta upcoming-meta-badge">
            (Dropping End of {countdown.currentMonth}©)
          </div>
        </motion.div>

        {/* Unified, Super Clean & Easy Master Countdown Timer */}
        <motion.div 
          className="up-master-timer-banner"
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="up-timer-lead">
            <div className="up-timer-icon-wrap">
              <Clock size={16} className="up-clock-pulse" />
            </div>
            <div className="up-timer-text-group">
              <span className="up-timer-title">Public Launch In:</span>
              <span className="up-timer-subtitle">Countdown to End of {countdown.currentMonth}</span>
            </div>
          </div>

          {/* Simple, Big, Clean Monospace Timer */}
          <div className="up-easy-clock">
            <div className="up-clock-unit">
              <span className="up-clock-number">{String(countdown.days).padStart(2, '0')}</span>
              <span className="up-clock-tag">DAYS</span>
            </div>
            <span className="up-clock-divider">:</span>
            <div className="up-clock-unit">
              <span className="up-clock-number">{String(countdown.hours).padStart(2, '0')}</span>
              <span className="up-clock-tag">HOURS</span>
            </div>
            <span className="up-clock-divider">:</span>
            <div className="up-clock-unit">
              <span className="up-clock-number">{String(countdown.minutes).padStart(2, '0')}</span>
              <span className="up-clock-tag">MINS</span>
            </div>
            <span className="up-clock-divider">:</span>
            <div className="up-clock-unit">
              <span className="up-clock-number">{String(countdown.seconds).padStart(2, '0')}</span>
              <span className="up-clock-tag">SECS</span>
            </div>
          </div>

          <button 
            className="up-timer-notify-btn"
            onClick={() => navigate('/contact?topic=upcoming-projects-access')}
            title="Get notified when all 4 projects launch"
          >
            <Bell size={14} />
            <span>Notify Me at Launch</span>
          </button>
        </motion.div>

        {/* 4 Upcoming Project Cards Grid (Luno, Fridger, Vex, Hipocrates) */}
        <motion.div 
          className="upcoming-projects-grid up-grid-four-col"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {upcomingProjects.map((project) => (
            <motion.div 
              key={project.id}
              className="upcoming-project-card up-card-clean"
              variants={itemVariants}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <div>
                {/* Header: Icon + Category Badge */}
                <div className="up-card-header">
                  <div 
                    className="up-clean-icon-box"
                    style={{ 
                      backgroundColor: `${project.badgeColor}14`, 
                      color: project.badgeColor,
                      border: `1px solid ${project.badgeColor}25`
                    }}
                  >
                    {project.icon}
                  </div>
                  <span 
                    className="up-clean-badge"
                    style={{ 
                      color: project.badgeColor,
                      backgroundColor: `${project.badgeColor}12`,
                      borderColor: `${project.badgeColor}30`
                    }}
                  >
                    {project.badge}
                  </span>
                </div>

                {/* Project Title */}
                <h3 className="up-clean-project-title">{project.title}</h3>
                
                {/* Tagline */}
                <span className="up-clean-tagline">{project.tagline}</span>

                {/* Description */}
                <p className="up-clean-desc">{project.description}</p>
              </div>

              {/* Card Footer: Tech spec & Early Access button */}
              <div className="up-clean-footer">
                <span className="up-clean-tech">{project.tech}</span>
                <button 
                  className="up-clean-action-btn"
                  onClick={() => navigate(`/contact?project=${project.id}`)}
                  title={`Request early preview of ${project.title}`}
                >
                  <span>Early Access</span>
                  <ArrowUpRight size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export { ClientLogos as UpcomingProjectsSection };
