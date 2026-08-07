import React from 'react';

export default function Terms() {
  return (
    <section className="section-dark" style={{ paddingTop: '180px', minHeight: '80vh' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <h1 style={{ fontSize: '48px', fontWeight: '800', marginBottom: '24px' }}>Terms of Service</h1>
        <p style={{ fontSize: '14px', color: '#888', marginBottom: '40px' }}>Last updated: August 2026</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', fontSize: '16px', color: 'rgba(255,255,255,0.8)', lineHeight: '1.7' }}>
          <div>
            <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#fff', marginBottom: '8px' }}>1. Agreement to Terms</h3>
            <p>By accessing or using the services provided by Fabrica® Studio ("Fabrica", "we", "us"), you agree to be bound by these Terms of Service. If you do not agree, please discontinue use immediately.</p>
          </div>

          <div>
            <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#fff', marginBottom: '8px' }}>2. Intellectual Property & Deliverables</h3>
            <p>Upon final payment of project fees, all bespoke design deliverables, visual code assets, and custom media created specifically for the client are assigned to the client, subject to standard studio portfolio showcase rights.</p>
          </div>

          <div>
            <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#fff', marginBottom: '8px' }}>3. Payment & Retainers</h3>
            <p>Invoices are due according to agreed project milestone schedules or monthly subscription billing dates. Late payments may pause active development sprints.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
