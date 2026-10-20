import { useState } from 'react'
import {
  Activity, ArrowDownRight, ArrowRight, ArrowUpRight, Bell, Check,
  ChevronDown, CircleHelp, Clock3, Download, FlaskConical, LayoutDashboard,
  Menu, MoreHorizontal, Pause, Play, Radio, Search, Settings2, ShieldCheck,
  UsersRound, X,
} from 'lucide-react'
import './App.css'

const periods = ['7 days', '30 days', '90 days']
const periodData = {
  '7 days': { risk: '8.1%', change: '−0.3 pp', exposed: '$2.1m', saved: '$46.8k', retained: '312', chart: [58, 54, 59, 45, 48, 38, 41, 33] },
  '30 days': { risk: '8.4%', change: '+0.6 pp', exposed: '$2.4m', saved: '$184k', retained: '1,284', chart: [64, 57, 61, 48, 51, 40, 44, 34] },
  '90 days': { risk: '7.8%', change: '−1.2 pp', exposed: '$6.8m', saved: '$512k', retained: '3,906', chart: [71, 63, 66, 52, 54, 43, 47, 36] },
}
const stages = [
  ['Signal intake', 'Product + billing events', '18.2k'],
  ['Risk scoring', 'Churn propensity v3.8', '4,628'],
  ['Segment match', '12 active audiences', '1,904'],
  ['Intervention', 'Email, in-app, success', '1,284'],
]
const audiences = [
  { name: 'Payment friction', members: '418 members', trigger: '3 failed payment attempts', action: 'Payment recovery', color: 'coral', lift: '+18.6%' },
  { name: 'Quiet power users', members: '762 members', trigger: 'Usage down 40% over 14d', action: 'Success outreach', color: 'blue', lift: '+12.3%' },
  { name: 'Renewal window', members: '294 members', trigger: 'Renewal in 30 days', action: 'Value recap', color: 'gold', lift: '+9.8%' },
]
const experiments = [
  { name: 'A softer renewal nudge', audience: 'Renewal window', result: '+14.2%', confidence: '96% confidence', state: 'Winner' },
  { name: 'Human check-in vs. offer', audience: 'Quiet power users', result: '+6.7%', confidence: '81% confidence', state: 'Running' },
]

function chartPoints(values) {
  return values.map((value, index) => `${index * 48},${92 - value}`).join(' ')
}

function App() {
  const [period, setPeriod] = useState('30 days')
  const [isRunning, setIsRunning] = useState(false)
  const [lastRun, setLastRun] = useState('2 min ago')
  const [query, setQuery] = useState('')
  const [activeNav, setActiveNav] = useState('Overview')
  const [menuOpen, setMenuOpen] = useState(false)
  const data = periodData[period]
  const filteredAudiences = audiences.filter((audience) =>
    `${audience.name} ${audience.trigger} ${audience.action}`.toLowerCase().includes(query.toLowerCase()),
  )

  function runPipeline() {
    if (isRunning) return
    setIsRunning(true)
    setLastRun('Running now')
    window.setTimeout(() => {
      setIsRunning(false)
      setLastRun('Just now')
    }, 2200)
  }

  function exportReport() {
    const rows = [['Metric', 'Value'], ['Churn risk', data.risk], ['Revenue exposed', data.exposed], ['Revenue retained', data.saved], ['Customers retained', data.retained]]
    const csv = rows.map((row) => row.join(',')).join('\n')
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }))
    const link = document.createElement('a')
    link.href = url
    link.download = `retention-report-${period.replace(' ', '-')}.csv`
    link.click()
    URL.revokeObjectURL(url)
  }

  const nav = [
    ['Overview', LayoutDashboard, '#overview'], ['Pipeline', Activity, '#pipeline'],
    ['Audiences', UsersRound, '#audiences'], ['Experiments', FlaskConical, '#experiments'],
  ]

  return (
    <div className="app-shell">
      <aside className={`sidebar${menuOpen ? ' sidebar-open' : ''}`}>
        <a className="brand" href="#overview" onClick={() => setActiveNav('Overview')}>
          <span className="brand-mark"><Activity size={19} strokeWidth={2.4} /></span>
          <span>morrow<span className="brand-period">.</span></span>
          <button className="icon-button sidebar-close" type="button" aria-label="Close navigation" onClick={(event) => { event.preventDefault(); setMenuOpen(false) }}><X size={18} /></button>
        </a>
        <div className="workspace-switcher">
          <span className="workspace-avatar">N</span>
          <span className="workspace-copy"><strong>Northstar Labs</strong><small>Growth workspace</small></span>
          <ChevronDown size={15} />
        </div>
        <p className="nav-label">WORKSPACE</p>
        <nav className="primary-nav" aria-label="Main navigation">
          {nav.map(([name, Icon, href]) => (
            <a className={`nav-link${activeNav === name ? ' nav-link-active' : ''}`} href={href} key={name} onClick={() => { setActiveNav(name); setMenuOpen(false) }}>
              <Icon size={17} strokeWidth={1.8} /><span>{name}</span>{name === 'Audiences' && <span className="nav-count">12</span>}
            </a>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="plan-card"><span className="plan-icon"><ShieldCheck size={16} /></span><strong>All systems healthy</strong><span>Last checked 34 seconds ago</span><div className="health-track"><span /></div></div>
          <a className="nav-link secondary-link" href="#pipeline"><CircleHelp size={17} /><span>Help center</span></a>
          <button className="profile-button" type="button"><span className="profile-avatar">AM</span><span className="workspace-copy"><strong>Alex Morgan</strong><small>Growth lead</small></span><MoreHorizontal size={18} /></button>
        </div>
      </aside>
      {menuOpen && <button className="mobile-scrim" type="button" aria-label="Close navigation" onClick={() => setMenuOpen(false)} />}

      <main className="main-content" id="overview">
        <header className="topbar">
          <button className="icon-button mobile-menu" type="button" aria-label="Open navigation" onClick={() => setMenuOpen(true)}><Menu size={20} /></button>
          <div className="breadcrumb"><span>Workspace</span><span className="breadcrumb-divider">/</span><strong>Overview</strong></div>
          <div className="topbar-actions"><span className="live-indicator"><span />Live data</span><button className="icon-button notification-button" type="button" aria-label="Notifications"><Bell size={18} /><i /></button><span className="topbar-divider" /><button className="help-button" type="button"><CircleHelp size={16} /><span>Support</span></button></div>
        </header>

        <div className="page-wrap">
          <section className="page-heading">
            <div><div className="eyebrow"><span className="eyebrow-line" />RETENTION INTELLIGENCE</div><h1>Good morning, Alex<span>.</span></h1><p className="heading-subtitle">Here’s the pulse of your customer lifecycle.</p></div>
            <div className="heading-actions">
              <div className="period-control" aria-label="Report date range">{periods.map((option) => <button aria-pressed={period === option} className={period === option ? 'period-active' : ''} key={option} onClick={() => setPeriod(option)} type="button">{option}</button>)}</div>
              <button className="button-secondary export-button" onClick={exportReport} type="button"><Download size={15} /><span>Export</span></button>
            </div>
          </section>

          <section className="metrics-grid" aria-label="Retention performance">
            <article className="metric-card metric-risk"><div className="metric-top"><span>Customers at risk</span><span className="metric-icon risk-icon"><Activity size={16} /></span></div><div className="metric-value">{data.risk}<span className="metric-unit"> of active</span></div><div className="metric-foot"><span className="trend trend-warn"><ArrowUpRight size={14} />{data.change}</span><span>vs. previous period</span></div><div className="mini-bars" aria-hidden="true">{Array.from({ length: 12 }, (_, index) => <i key={index} />)}</div></article>
            <article className="metric-card"><div className="metric-top"><span>Revenue exposed</span><span className="metric-icon exposed-icon"><Radio size={16} /></span></div><div className="metric-value">{data.exposed}</div><div className="metric-foot"><span className="metric-note">Across 1,904 customers</span></div><div className="metric-rule"><span className="rule-coral" /></div></article>
            <article className="metric-card"><div className="metric-top"><span>Revenue retained</span><span className="metric-icon retained-icon"><ArrowDownRight size={16} /></span></div><div className="metric-value">{data.saved}</div><div className="metric-foot"><span className="trend trend-good"><ArrowUpRight size={14} />+22.4%</span><span>vs. previous period</span></div><div className="metric-rule"><span className="rule-green" /></div></article>
            <article className="metric-card"><div className="metric-top"><span>Customers retained</span><span className="metric-icon customers-icon"><UsersRound size={16} /></span></div><div className="metric-value">{data.retained}</div><div className="metric-foot"><span className="metric-note">From targeted interventions</span></div><div className="metric-rule"><span className="rule-blue" /></div></article>
          </section>

          <section className="insight-grid">
            <article className="panel trend-panel">
              <div className="panel-heading"><div><div className="section-kicker">CUSTOMER HEALTH</div><h2>Churn risk trend</h2></div><button className="icon-button more-button" type="button" aria-label="More trend options"><MoreHorizontal size={19} /></button></div>
              <div className="chart-legend"><span><i className="legend-risk" />At risk</span><span><i className="legend-baseline" />Healthy baseline</span></div>
              <div className="chart-wrap"><div className="chart-y-labels"><span>12%</span><span>8%</span><span>4%</span><span>0%</span></div><svg className="risk-chart" viewBox="0 0 336 100" preserveAspectRatio="none" role="img" aria-label={`Churn risk trend over ${period}`}><defs><linearGradient id="risk-fill" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#d66a52" stopOpacity=".18" /><stop offset="100%" stopColor="#d66a52" stopOpacity="0" /></linearGradient></defs>{[16, 40, 64, 88].map((y) => <line className="chart-gridline" key={y} x1="0" x2="336" y1={y} y2={y} />)}<polygon className="chart-area" points={`0,100 ${chartPoints(data.chart)} 336,100`} /><polyline className="chart-line" points={chartPoints(data.chart)} /><circle className="chart-point" cx="336" cy={92 - data.chart.at(-1)} r="3.2" /></svg></div>
              <div className="chart-x-labels"><span>May 01</span><span>May 08</span><span>May 15</span><span>May 22</span><span>May 30</span></div>
              <div className="chart-insight"><span className="insight-mark"><Activity size={15} /></span><span>Risk is trending down <strong>1.2 points</strong> since your last intervention cycle.</span><ArrowRight size={15} /></div>
            </article>

            <article className="panel pipeline-panel" id="pipeline">
              <div className="panel-heading"><div><div className="section-kicker">AUTOMATION</div><h2>Retention pipeline</h2></div><button className={`run-button${isRunning ? ' run-active' : ''}`} onClick={runPipeline} type="button" disabled={isRunning}>{isRunning ? <Pause size={14} /> : <Play size={14} fill="currentColor" />}<span>{isRunning ? 'Running' : 'Run now'}</span></button></div>
              <div className="pipeline-meta"><span className="pipeline-status"><i />{isRunning ? 'Processing signals' : 'All stages operational'}</span><span><Clock3 size={13} />Last run {lastRun}</span></div>
              <div className={`stage-list${isRunning ? ' stages-running' : ''}`}>{stages.map(([name, detail, count], index) => <div className="stage-row" key={name}><div className="stage-indicator"><span>{isRunning && index === 1 ? <span className="stage-spinner" /> : <Check size={12} strokeWidth={2.8} />}</span>{index < stages.length - 1 && <i />}</div><div className="stage-copy"><strong>{name}</strong><span>{detail}</span></div><div className="stage-result"><strong>{count}</strong><span>Live</span></div></div>)}</div>
              <a className="panel-link" href="#audiences">View pipeline details <ArrowRight size={14} /></a>
            </article>
          </section>

          <section className="lower-grid">
            <article className="panel audience-panel" id="audiences">
              <div className="panel-heading lower-heading"><div><div className="section-kicker">TARGETED PLAYBOOKS <span className="heading-count">12</span></div><h2>Active audiences</h2></div><label className="search-field"><Search size={15} /><input aria-label="Filter audiences" onChange={(event) => setQuery(event.target.value)} placeholder="Find audience" value={query} /></label></div>
              <div className="audience-table"><div className="table-head"><span>AUDIENCE</span><span>TRIGGER</span><span>PLAYBOOK</span><span>RETENTION LIFT</span><span /></div>{filteredAudiences.map((audience) => <div className="audience-row" key={audience.name}><div className="audience-name"><span className={`audience-dot dot-${audience.color}`} /><div><strong>{audience.name}</strong><small>{audience.members}</small></div></div><span className="audience-trigger">{audience.trigger}</span><span className="audience-action">{audience.action}</span><span className="audience-lift">{audience.lift}</span><button className="icon-button row-more" type="button" aria-label={`More options for ${audience.name}`}><MoreHorizontal size={17} /></button></div>)}{filteredAudiences.length === 0 && <p className="empty-state">No audiences match “{query}”.</p>}</div>
              <a className="panel-link audience-link" href="#audiences">Explore all audiences <ArrowRight size={14} /></a>
            </article>
            <article className="panel experiment-panel" id="experiments">
              <div className="panel-heading lower-heading"><div><div className="section-kicker">CONTINUOUS LEARNING</div><h2>Experiments</h2></div><button className="icon-button more-button" type="button" aria-label="More experiment options"><MoreHorizontal size={19} /></button></div>
              <div className="experiment-list">{experiments.map((experiment) => <div className="experiment-row" key={experiment.name}><span className={`experiment-icon${experiment.state === 'Winner' ? ' experiment-winner' : ''}`}>{experiment.state === 'Winner' ? <Check size={16} /> : <FlaskConical size={16} />}</span><div className="experiment-copy"><strong>{experiment.name}</strong><span>{experiment.audience} · {experiment.confidence}</span></div><div className="experiment-result"><strong>{experiment.result}</strong><span className={experiment.state === 'Winner' ? 'winner-label' : 'running-label'}>{experiment.state}</span></div></div>)}</div>
              <a className="panel-link experiment-link" href="#experiments">View all experiments <ArrowRight size={14} /></a>
            </article>
          </section>
          <footer className="page-footer"><span><span className="footer-pulse" />Data synced 34 seconds ago</span><span>Model v3.8.2 <span className="footer-divider">·</span> <button type="button" onClick={() => setActiveNav('Pipeline')}>Pipeline settings <Settings2 size={13} /></button></span></footer>
        </div>
      </main>
    </div>
  )
}

export default App