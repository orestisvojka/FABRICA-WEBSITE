import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ContactSection from '../components/ContactSection';

export default function ServerError() {
  const navigate = useNavigate();

  const handleReload = () => {
    window.location.reload();
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
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
        duration: 0.75,
        ease: [0.25, 1, 0.5, 1]
      }
    }
  };

  return (
    <div style={{ backgroundColor: '#000000', color: '#ffffff', minHeight: '100vh', paddingTop: '150px' }}>
      <section style={{ paddingBottom: '100px' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 24px' }}>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{ display: 'flex', flexDirection: 'column', gap: '28px', maxWidth: '800px' }}
          >
            {/* Top Badge */}
            <motion.div variants={itemVariants} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#eab308', display: 'inline-block' }}></span>
                <span style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: '700', color: '#a1a1aa' }}>Error 505 / 500 • Server Gateway Exception</span>
              </div>
              <span style={{ fontSize: '13px', color: '#71717a', fontWeight: '600' }}>(2016-26©)</span>
            </motion.div>

            {/* Giant Title Lockup */}
            <motion.div variants={itemVariants}>
              <span style={{ fontSize: '14px', fontWeight: '800', letterSpacing: '0.14em', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>QuolyTech® Studio</span>
              <h1 style={{ fontSize: 'clamp(54px, 10vw, 110px)', fontWeight: '800', letterSpacing: '-0.04em', lineHeight: '0.95', margin: 0, color: '#ffffff' }}>
                505.
              </h1>
            </motion.div>

            {/* Description */}
            <motion.p variants={itemVariants} style={{ fontSize: 'clamp(16px, 2.2vw, 20px)', color: '#d4d4d8', lineHeight: '1.6', margin: 0, fontWeight: '400' }}>
              HTTP Version Not Supported / Server Error. Our infrastructure engineering team has been automatically alerted to resolve this gateway exception.
            </motion.p>

            {/* CTA Button Group */}
            <motion.div variants={itemVariants} style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', paddingTop: '12px' }}>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate('/')}
                style={{
                  backgroundColor: '#ffffff',
                  color: '#000000',
                  border: 'none',
                  borderRadius: '999px',
                  padding: '14px 28px',
                  fontSize: '14px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  boxShadow: '0 4px 20px rgba(255, 255, 255, 0.15)'
                }}
              >
                Return to Homepage →
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleReload}
                style={{
                  backgroundColor: '#18181b',
                  color: '#ffffff',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: '999px',
                  padding: '14px 28px',
                  fontSize: '14px',
                  fontWeight: '700',
                  cursor: 'pointer'
                }}
              >
                Reload Page ↻
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate('/contact')}
                style={{
                  backgroundColor: 'transparent',
                  color: '#a1a1aa',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '999px',
                  padding: '14px 28px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Report Issue
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Animated Line Drawing */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.1, ease: [0.25, 1, 0.5, 1], delay: 0.4 }}
            style={{ height: '1px', backgroundColor: 'rgba(255, 255, 255, 0.12)', margin: '64px 0 0 0', transformOrigin: 'left center' }}
          />
        </div>
      </section>

      {/* Trailing Contact Section */}
      <ContactSection />
    </div>
  );
}
