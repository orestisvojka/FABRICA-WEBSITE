import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Crown, Terminal, Layers, Users, 
  Activity, CheckCircle2, Cpu, Globe, 
  Zap, Clock, ShieldCheck, Play, Sparkles, MessageSquare, ArrowRight
} from 'lucide-react';

// 1. CEO Executive Command Console for Oresti Vojka
export function CeoExecutiveConsole({ member }) {
  const [activePillar, setActivePillar] = useState(0);

  const pillars = [
    {
      title: "Autonomous AI Agents & Workflows",
      desc: "Architecting intelligent agent swarms that automate manual operations, eliminate support bottlenecks, and process high-volume business workflows with zero human latency.",
      tag: "Applied AI Core"
    },
    {
      title: "High-ROI Enterprise SaaS Systems",
      desc: "Transforming complex operational workflows into scalable cloud applications engineered for predictable unit economics and measurable enterprise valuation growth.",
      tag: "Cloud Architecture"
    },
    {
      title: "Category-Defining Digital Flagships",
      desc: "Deploying high-velocity digital flagships that pair avant-garde aesthetics with ruthless conversion rate optimization to outclass legacy market competitors.",
      tag: "Commercial Execution"
    }
  ];

  return (
    <div className="team-visual-hub team-hub-ceo">
      {/* Console Top Header Bar */}
      <div className="hub-header-bar">
        <div className="hub-status-indicator">
          <span className="hub-pulse-dot" style={{ backgroundColor: '#d97706', boxShadow: '0 0 10px rgba(217, 119, 6, 0.7)' }}></span>
          <span className="hub-status-text">EXECUTIVE COMMAND • QUOLYTECH HQ</span>
        </div>
        <div className="hub-location-tag">Tiranë, Albania • Global Operations</div>
      </div>

      {/* Main Grid: Monogram & Strategic Telemetry */}
      <div className="hub-ceo-body">
        <div className="hub-ceo-monogram-card">
          <div className="hub-monogram-circle">
            <span className="hub-monogram-initials">OV</span>
            <Crown size={22} className="hub-monogram-crown" />
          </div>
          <div className="hub-monogram-info">
            <h4 className="hub-monogram-title">{member.name}</h4>
            <p className="hub-monogram-sub">Chief Executive Officer & Founder</p>
          </div>
          <div className="hub-seal-badge">
            <span>OFFICIAL LEADERSHIP SEAL</span>
            <ShieldCheck size={14} />
          </div>
        </div>

        {/* Executive Metrics Bar */}
        <div className="hub-ceo-metrics-row">
          <div className="hub-metric-tile">
            <span className="hub-metric-num">14+</span>
            <span className="hub-metric-lbl">Active Live Platforms</span>
          </div>
          <div className="hub-metric-tile">
            <span className="hub-metric-num">3.4x</span>
            <span className="hub-metric-lbl">Avg. Client Value Multiple</span>
          </div>
          <div className="hub-metric-tile">
            <span className="hub-metric-num">99.8%</span>
            <span className="hub-metric-lbl">On-Time Sprint Cadence</span>
          </div>
        </div>
      </div>

      {/* Interactive Strategic Pillars */}
      <div className="hub-ceo-pillars">
        <div className="hub-pillars-label">
          <span>Core Strategic Pillars Directed by CEO</span>
          <ArrowRight size={14} />
        </div>

        <div className="hub-pillars-list">
          {pillars.map((p, idx) => {
            const isSelected = activePillar === idx;
            return (
              <motion.div
                key={idx}
                className={`hub-pillar-item ${isSelected ? 'is-selected' : ''}`}
                onClick={() => setActivePillar(idx)}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                <div className="hub-pillar-top">
                  <span className="hub-pillar-idx">0{idx + 1}</span>
                  <h5 className="hub-pillar-heading">{p.title}</h5>
                  <span className="hub-pillar-tag">{p.tag}</span>
                </div>
                {isSelected && (
                  <motion.p
                    className="hub-pillar-desc"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {p.desc}
                  </motion.p>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// 2. Systems Engineering Terminal Hub for Kris Sipri
export function SystemsTerminalHub({ member }) {
  const [activeTab, setActiveTab] = useState('runtime');
  const [benchmarkStatus, setBenchmarkStatus] = useState('Idle');
  const [isPinging, setIsPinging] = useState(false);

  const runBenchmark = () => {
    setIsPinging(true);
    setBenchmarkStatus('Pinging global cluster nodes...');
    setTimeout(() => {
      setBenchmarkStatus('Cluster Health: 100% | Latency: 16.2ms | 0 packet loss');
      setIsPinging(false);
    }, 900);
  };

  const codeSnippets = {
    runtime: `// QuolyTech High-Concurrency Engine v3.4.1
import { ClusterWorker, DatabasePool, RateLimiter } from '@quoly/core';

export async function handleStreamPayload(event: CloudEvent): Promise<Result> {
  const session = await RateLimiter.verify(event.headers.token, { maxRPS: 10000 });
  const pool = await DatabasePool.acquireConnection({ timeoutMs: 12 });
  
  // Microsecond query routing with localized cache
  const result = await pool.query('SELECT * FROM telemetry_nodes WHERE status = $1', ['active']);
  return Result.ok({ latencyMs: performance.now() - event.started, rows: result.count });
}`,
    architecture: `# Infrastructure & Cloud Architecture Spec
environment: production
datacenter_mesh:
  primary: eu-central-frankfurt
  failover: eu-west-london
database_cluster:
  engine: postgresql-16-ha
  connection_pool: pgbouncer
  max_connections: 5000
  read_replicas: 3
cache_layer:
  engine: redis-cluster
  hit_ratio_target: 99.5%
security:
  tls_version: 1.3
  aes_encryption: gcm-256`,
    sql: `-- Mission-Critical Telemetry Schema (Optimized B-Tree Indexing)
CREATE TABLE enterprise_transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    account_id VARCHAR(64) NOT NULL,
    amount_cents BIGINT NOT NULL,
    status VARCHAR(32) NOT NULL DEFAULT 'settled',
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX CONCURRENTLY idx_tx_account_status 
ON enterprise_transactions (account_id, status, created_at DESC);`
  };

  return (
    <div className="team-visual-hub team-hub-terminal">
      {/* Mac-Style Window Header */}
      <div className="hub-terminal-header">
        <div className="hub-window-dots">
          <span className="dot dot-red"></span>
          <span className="dot dot-yellow"></span>
          <span className="dot dot-green"></span>
        </div>
        <div className="hub-terminal-title">
          <Terminal size={14} className="terminal-icon" />
          <span>kris@quolytech-core-node-01: ~/systems/architecture</span>
        </div>
        <div className="hub-terminal-tabs">
          <button 
            className={`terminal-tab ${activeTab === 'runtime' ? 'is-active' : ''}`}
            onClick={() => setActiveTab('runtime')}
          >
            engine.ts
          </button>
          <button 
            className={`terminal-tab ${activeTab === 'architecture' ? 'is-active' : ''}`}
            onClick={() => setActiveTab('architecture')}
          >
            cluster.yml
          </button>
          <button 
            className={`terminal-tab ${activeTab === 'sql' ? 'is-active' : ''}`}
            onClick={() => setActiveTab('sql')}
          >
            schema.sql
          </button>
        </div>
      </div>

      {/* Terminal Code Viewer */}
      <div className="hub-terminal-code-body">
        <pre className="hub-code-block">
          <code>{codeSnippets[activeTab]}</code>
        </pre>
      </div>

      {/* Telemetry Footer Status */}
      <div className="hub-terminal-footer">
        <div className="terminal-metric-chip">
          <span className="metric-dot green"></span>
          <span>p99 Latency: <strong>18ms</strong></span>
        </div>
        <div className="terminal-metric-chip">
          <span className="metric-dot cyan"></span>
          <span>Uptime: <strong>99.99%</strong></span>
        </div>
        <div className="terminal-metric-chip">
          <span className="metric-dot purple"></span>
          <span>Test Suite: <strong>428/428 passing</strong></span>
        </div>

        <button 
          className="hub-ping-btn"
          onClick={runBenchmark}
          disabled={isPinging}
        >
          <Play size={12} />
          <span>{isPinging ? 'Pinging...' : 'Benchmark Ping'}</span>
        </button>
      </div>

      {benchmarkStatus !== 'Idle' && (
        <div className="hub-benchmark-log">
          <span>&gt; {benchmarkStatus}</span>
        </div>
      )}
    </div>
  );
}

// 3. Creative Canvas & WebGL UI Hub for Daniel Kademi
export function CreativeCanvasHub({ member }) {
  const [activeMode, setActiveMode] = useState('mesh');
  const [fps, setFps] = useState('60.0');

  useEffect(() => {
    const interval = setInterval(() => {
      const jitter = (59.8 + Math.random() * 0.4).toFixed(1);
      setFps(jitter);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="team-visual-hub team-hub-canvas">
      {/* Canvas Top Bar */}
      <div className="hub-canvas-header">
        <div className="hub-canvas-title">
          <Layers size={16} className="canvas-icon" />
          <span>Interactive Creative Lab & WebGL Engine</span>
        </div>

        <div className="hub-canvas-fps-badge">
          <span className="fps-indicator-dot"></span>
          <span>{fps} FPS STABLE</span>
        </div>

        <div className="hub-mode-pills">
          <button 
            className={`hub-mode-pill ${activeMode === 'mesh' ? 'is-active' : ''}`}
            onClick={() => setActiveMode('mesh')}
          >
            GLSL Mesh
          </button>
          <button 
            className={`hub-mode-pill ${activeMode === 'spring' ? 'is-active' : ''}`}
            onClick={() => setActiveMode('spring')}
          >
            Spring Physics
          </button>
          <button 
            className={`hub-mode-pill ${activeMode === 'tokens' ? 'is-active' : ''}`}
            onClick={() => setActiveMode('tokens')}
          >
            Design Tokens
          </button>
        </div>
      </div>

      {/* Kinetic Interactive Visual Display */}
      <div className="hub-canvas-viewport">
        {activeMode === 'mesh' && (
          <div className="hub-kinetic-mesh-scene">
            <div className="mesh-orb-1"></div>
            <div className="mesh-orb-2"></div>
            <div className="mesh-grid-lines"></div>
            <div className="mesh-telemetry-overlay">
              <span className="mono-badge">SHADERS: FRAGMENT + VERTEX</span>
              <span className="mono-badge">DRAW CALLS: 4</span>
              <span className="mono-badge">COLOR DEPTH: 32-BIT HDR</span>
            </div>
            <div className="mesh-center-label">
              <Sparkles size={24} />
              <h4>Reactive 3D Spatial Pipeline</h4>
              <p>Hardware accelerated, zero layout shifts, optimized for mobile battery.</p>
            </div>
          </div>
        )}

        {activeMode === 'spring' && (
          <div className="hub-spring-physics-scene">
            <motion.div 
              className="spring-demo-card"
              animate={{ 
                y: [-6, 6, -6],
                rotate: [-1, 1, -1]
              }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            >
              <span className="spring-tag">Framer Motion Kinetic Token</span>
              <h5>stiffness: 350, damping: 25</h5>
              <p>Organic deceleration with zero frame stutter or layout recalculation.</p>
            </motion.div>
          </div>
        )}

        {activeMode === 'tokens' && (
          <div className="hub-tokens-scene">
            <div className="token-card">
              <span className="token-lbl">Surface Token</span>
              <span className="token-val">var(--bg-obsidian-950)</span>
            </div>
            <div className="token-card">
              <span className="token-lbl">Kinetic Easing</span>
              <span className="token-val">cubic-bezier(0.16, 1, 0.3, 1)</span>
            </div>
            <div className="token-card">
              <span className="token-lbl">Type Scale</span>
              <span className="token-val">clamp(32px, 5vw, 64px)</span>
            </div>
            <div className="token-card">
              <span className="token-lbl">Layout Shift</span>
              <span className="token-val">CLS: 0.00 (Zero Drift)</span>
            </div>
          </div>
        )}
      </div>

      {/* Tech Stack Pills Bar */}
      <div className="hub-canvas-footer">
        <span className="tech-badge">React 19</span>
        <span className="tech-badge">Next.js 15</span>
        <span className="tech-badge">Three.js / WebGL</span>
        <span className="tech-badge">GLSL Shaders</span>
        <span className="tech-badge">Framer Motion</span>
        <span className="tech-badge">Lenis Smooth Scroll</span>
      </div>
    </div>
  );
}

// 4. Client Partnership & Relationship Hub for Henri Bajramaj
export function ClientPartnershipHub({ member }) {
  const [activeStep, setActiveStep] = useState(0);

  const workflow = [
    {
      step: "01",
      title: "Discovery & Pain-Point Extraction",
      detail: "In-depth discovery session uncovering root operational bottlenecks, revenue targets, and target audience expectations before touching a single line of code."
    },
    {
      step: "02",
      title: "Transparent SOW & Sprint Roadmapping",
      detail: "Detailed scope of work with unambiguous milestone deliverables, fixed timelines, and weekly demonstration checkpoints."
    },
    {
      step: "03",
      title: "Interactive Staging & Weekly Walkthroughs",
      detail: "Live preview links on private staging environments; continuous feedback integration via dedicated Slack and VIP WhatsApp communication channels."
    },
    {
      step: "04",
      title: "Production Launch & Account Stewardship",
      detail: "Flawless deployment oversight, post-launch analytics monitoring, team onboarding, and continuous optimization sprints."
    }
  ];

  return (
    <div className="team-visual-hub team-hub-client">
      {/* Partnership SLA Header */}
      <div className="hub-client-header">
        <div className="hub-client-title">
          <Users size={16} className="client-icon" />
          <span>Client Partnership & Success Operations</span>
        </div>

        <div className="hub-sla-badge">
          <span className="sla-live-dot"></span>
          <span>SLA RESPONSE TIME: &lt; 15 MINS</span>
        </div>
      </div>

      {/* 4 KPI Metric Cards */}
      <div className="hub-client-metrics-grid">
        <div className="client-kpi-card">
          <span className="kpi-num">99.4%</span>
          <span className="kpi-label">Client Satisfaction (CSAT)</span>
        </div>
        <div className="client-kpi-card">
          <span className="kpi-num">100%</span>
          <span className="kpi-label">On-Time Milestone Rate</span>
        </div>
        <div className="client-kpi-card">
          <span className="kpi-num">96.8%</span>
          <span className="kpi-label">Client Account Retention</span>
        </div>
        <div className="client-kpi-card">
          <span className="kpi-num">24/7</span>
          <span className="kpi-label">VIP Dedicated Channels</span>
        </div>
      </div>

      {/* Interactive Client Journey Roadmap */}
      <div className="hub-client-roadmap">
        <div className="roadmap-header">
          <span>Client Delivery Lifecycle & Governance</span>
          <span className="roadmap-hint">Click any milestone to inspect</span>
        </div>

        <div className="roadmap-stepper">
          {workflow.map((item, idx) => {
            const isCurrent = activeStep === idx;
            return (
              <div 
                key={idx}
                className={`roadmap-step-pill ${isCurrent ? 'is-active' : ''}`}
                onClick={() => setActiveStep(idx)}
              >
                <span className="step-num">{item.step}</span>
                <span className="step-title">{item.title.split(' & ')[0]}</span>
              </div>
            );
          })}
        </div>

        <motion.div 
          key={activeStep}
          className="roadmap-step-detail-card"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div className="step-detail-head">
            <span className="step-badge">Stage {workflow[activeStep].step}</span>
            <h4>{workflow[activeStep].title}</h4>
          </div>
          <p className="step-detail-body">{workflow[activeStep].detail}</p>
        </motion.div>
      </div>

      {/* Communication Channels Strip */}
      <div className="hub-client-channels">
        <span className="channels-label">Direct Client Channels:</span>
        <span className="channel-pill">💬 Dedicated Slack Workspace</span>
        <span className="channel-pill">📱 Direct WhatsApp VIP Line</span>
        <span className="channel-pill">📊 Real-Time Staging Dashboard</span>
      </div>
    </div>
  );
}

// Master component dispatching the correct hub based on member role/id
export default function TeamVisualHub({ member }) {
  if (!member) return null;

  switch (member.id) {
    case 'oresti':
      return <CeoExecutiveConsole member={member} />;
    case 'kris':
      return <SystemsTerminalHub member={member} />;
    case 'daniel':
      return <CreativeCanvasHub member={member} />;
    case 'henri':
      return <ClientPartnershipHub member={member} />;
    default:
      return <CeoExecutiveConsole member={member} />;
  }
}
