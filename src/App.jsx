import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import Header from './components/Header';
import Footer from './components/Footer';
import QuolyTechPreloader from './components/QuolyTechPreloader';
import AuthModal from './components/AuthModal';
import ScrollToTop from './components/ScrollToTop';

import Home from './pages/Home';
import Studio from './pages/Studio';
import ServicesIndex from './pages/ServicesIndex';
import ServiceDetail from './pages/ServiceDetail';
import IndustriesIndex from './pages/IndustriesIndex';
import IndustryDetail from './pages/IndustryDetail';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Blog from './pages/Blog';
import BlogPostDetail from './pages/BlogPostDetail';
import Contact from './pages/Contact';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import TeamDetail from './pages/TeamDetail';
import NotFound from './pages/NotFound';
import ServerError from './pages/ServerError';

function AppContent() {
  const location = useLocation();
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', position: 'relative' }}>
      <QuolyTechPreloader pathname={location.pathname} />
      <Header onOpenAuth={() => setIsAuthOpen(true)} />
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<Studio />} />
          <Route path="/about/" element={<Studio />} />
          <Route path="/studio" element={<Studio />} />
          <Route path="/services" element={<ServicesIndex />} />
          <Route path="/services/" element={<ServicesIndex />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />
          <Route path="/services/:slug/" element={<ServiceDetail />} />
          <Route path="/industries" element={<IndustriesIndex />} />
          <Route path="/industries/" element={<IndustriesIndex />} />
          <Route path="/industries/:slug" element={<IndustryDetail />} />
          <Route path="/industries/:slug/" element={<IndustryDetail />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/" element={<Projects />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="/projects/:slug/" element={<ProjectDetail />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPostDetail />} />
          <Route path="/blog/:slug/" element={<BlogPostDetail />} />
          <Route path="/team/:slug" element={<TeamDetail />} />
          <Route path="/staff/:slug" element={<TeamDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/contact/" element={<Contact />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/terms/" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/privacy/" element={<Privacy />} />
          <Route path="/500" element={<ServerError />} />
          <Route path="/505" element={<ServerError />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <ScrollToTop />
      <Footer />
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </div>
  );
}

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <Router>
      <AppContent />
    </Router>
  );
}
