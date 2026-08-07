import React from 'react';

export default function Privacy() {
  return (
    <section className="section-dark" style={{ paddingTop: '180px', minHeight: '80vh' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <h1 style={{ fontSize: '48px', fontWeight: '800', marginBottom: '24px' }}>Privacy Policy</h1>
        <p style={{ fontSize: '14px', color: '#888', marginBottom: '40px' }}>Last updated: August 2026</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', fontSize: '16px', color: 'rgba(255,255,255,0.8)', lineHeight: '1.7' }}>
          <div>
            <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#fff', marginBottom: '8px' }}>1. Data Collection</h3>
            <p>Fabrica® Studio collects personal contact details (such as your name, work email address, and inquiry details) strictly when voluntarily submitted through our contact and journal subscription forms.</p>
          </div>

          <div>
            <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#fff', marginBottom: '8px' }}>2. Use of Information</h3>
            <p>We use collected data solely to respond to project inquiries, deliver requested services, and send monthly studio newsletters. We never sell or share user data with third-party data brokers.</p>
          </div>

          <div>
            <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#fff', marginBottom: '8px' }}>3. Analytics & Cookies</h3>
            <p>We use lightweight, privacy-focused web analytics to monitor site performance and load times without recording personal identifying IP data.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
