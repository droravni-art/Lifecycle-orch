import { useRef, useState } from 'react'
import {
  Background,
  Controls,
  Handle,
  MiniMap,
  Panel,
  Position,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import {
  AlertTriangle,
  ArrowRightCircle,
  CheckCircle,
  CreditCard,
  Database,
  GitMerge,
  Info,
  Mail,
  MessageSquare,
  Play,
  Square,
  Users,
  Bot,
  Wrench,
} from 'lucide-react'

const pipelines = {
  adaptiveChurn: {
    name: 'Adaptive Churn Pipeline',
    nodes: [
      { id: '1', position: { x: 50, y: 300 }, type: 'custom', data: { label: 'Looker Trigger', subtext: 'Fetch Churn Risk Data', icon: 'database', color: '#4285F4', pillars: { trigger: 'Looker SQL: Daily Churn Risk > 70%', logic: 'CRON Schedule (Daily 08:00 AM)', content: 'N/A', delivery: 'Looker API to n8n Webhook' }, resources: { collaborators: 'Data Team', agents: 'Looker MCP Agent', skills: 'data-query-optimizer' } } },
      { id: '2', position: { x: 350, y: 300 }, type: 'custom', data: { label: 'n8n Router', subtext: 'Identify Risk Type', icon: 'gitmerge', color: '#FF6D5A', pillars: { trigger: 'Incoming Webhook Payload', logic: 'n8n Switch Node (by Risk Vector)', content: 'N/A', delivery: 'Internal Routing' }, resources: { collaborators: 'RevOps / Automation Lead', agents: 'None', skills: 'lifecycle-orchestrator-framework' } } },
      { id: '3', position: { x: 700, y: 100 }, type: 'custom', data: { label: 'Price Sensitivity', subtext: 'Promo Email (20% Off)', icon: 'mail', color: '#F4B400', pillars: { trigger: 'Routed from n8n (Vector: Price)', logic: 'A/B Split Test Node (50/50)', content: 'Brandbook: Discount Series Copy', delivery: 'HubSpot Marketing Email' }, resources: { collaborators: 'Growth Marketing, Copywriter', agents: 'Content Gen Agent', skills: 'brand-voice-enforcer' } } },
      { id: '4', position: { x: 700, y: 300 }, type: 'custom', data: { label: 'Feature Friction', subtext: 'Re-onboard & Alert CS', icon: 'message', color: '#0F9D58', pillars: { trigger: 'Routed from n8n (Vector: Usage)', logic: 'Assign CS Task + Delay 2 Days', content: 'Design Team: Feature PDF Guide', delivery: 'Slack Alert + SendGrid Email' }, resources: { collaborators: 'Customer Success Team', agents: 'Support Triage Agent', skills: 'cs-escalation-protocol' } } },
      { id: '5', position: { x: 700, y: 500 }, type: 'custom', data: { label: 'Billing Issue', subtext: 'Send Update Payment Link', icon: 'creditcard', color: '#DB4437', pillars: { trigger: 'Routed from n8n (Vector: Billing)', logic: 'Verify Stripe Status', content: 'Stripe Default Checkout UI', delivery: 'Transactional SMS (Twilio)' }, resources: { collaborators: 'Finance, RevOps', agents: 'None', skills: 'dunning-management-rules' } } },
      { id: '6', position: { x: 1050, y: 300 }, type: 'custom', data: { label: 'HubSpot Sync', subtext: 'Track Engagement', icon: 'arrowright', color: '#FF7A59', pillars: { trigger: 'User clicks link / opens email', logic: 'HubSpot Workflow Trigger', content: 'N/A', delivery: 'HubSpot CRM Properties Update' }, resources: { collaborators: 'CRM Administrator', agents: 'HubSpot Sync Agent', skills: 'crm-data-hygiene' } } },
      { id: '7', position: { x: 1400, y: 200 }, type: 'custom', data: { label: 'Saved', subtext: 'User Re-Engaged', icon: 'check', color: '#0F9D58', pillars: { trigger: 'HubSpot Property: Status = Active', logic: 'Wait 7 Days to Verify', content: 'N/A', delivery: 'Internal System' }, resources: { collaborators: 'Data Team', agents: 'Reporting Agent', skills: 'success-metrics-tracker' } } },
      { id: '8', position: { x: 1400, y: 400 }, type: 'custom', data: { label: 'Churned', subtext: 'Inactive', icon: 'alert', color: '#DB4437', pillars: { trigger: 'HubSpot Property: Status = Churned', logic: 'Immediate Flag', content: 'N/A', delivery: 'Internal System' }, resources: { collaborators: 'Product Team (Feedback Loop)', agents: 'None', skills: 'churn-post-mortem' } } },
      { id: '9', position: { x: 1750, y: 300 }, type: 'custom', data: { label: 'Looker Data Warehouse', subtext: 'Optimize Campaign Weight', icon: 'database', color: '#4285F4', pillars: { trigger: 'Nightly ETL Sync', logic: 'BigQuery ML Recalibration', content: 'N/A', delivery: 'Looker Dashboard Refresh' }, resources: { collaborators: 'Data Scientists', agents: 'ML Ops Agent', skills: 'model-recalibration-spec' } } },
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2', type: 'smoothstep', animated: true, style: { stroke: '#FF6D5A', strokeWidth: 2 } },
      { id: 'e2-3', source: '2', target: '3', type: 'smoothstep', animated: true, style: { stroke: '#F4B400', strokeWidth: 2 } },
      { id: 'e2-4', source: '2', target: '4', type: 'smoothstep', animated: true, style: { stroke: '#0F9D58', strokeWidth: 2 } },
      { id: 'e2-5', source: '2', target: '5', type: 'smoothstep', animated: true, style: { stroke: '#DB4437', strokeWidth: 2 } },
      { id: 'e3-6', source: '3', target: '6', type: 'smoothstep', animated: true, style: { stroke: '#FF7A59', strokeWidth: 2 } },
      { id: 'e4-6', source: '4', target: '6', type: 'smoothstep', animated: true, style: { stroke: '#FF7A59', strokeWidth: 2 } },
      { id: 'e5-6', source: '5', target: '6', type: 'smoothstep', animated: true, style: { stroke: '#FF7A59', strokeWidth: 2 } },
      { id: 'e6-7', source: '6', target: '7', type: 'smoothstep', animated: true, style: { stroke: '#0F9D58', strokeWidth: 2 } },
      { id: 'e6-8', source: '6', target: '8', type: 'smoothstep', animated: true, style: { stroke: '#DB4437', strokeWidth: 2 } },
      { id: 'e7-9', source: '7', target: '9', type: 'smoothstep', animated: true, style: { stroke: '#4285F4', strokeWidth: 2 } },
      { id: 'e8-9', source: '8', target: '9', type: 'smoothstep', animated: true, style: { stroke: '#4285F4', strokeWidth: 2 } },
      { id: 'e9-1', source: '9', target: '1', sourceHandle: 'bottom-src', targetHandle: 'bottom', type: 'smoothstep', animated: true, label: 'Performance Learning Loop', labelStyle: { fill: '#fff', fontWeight: 'bold' }, labelBgStyle: { fill: '#222' }, style: { stroke: '#4285F4', strokeWidth: 3, strokeDasharray: '5, 5' } },
    ],
  },
}

const IconMap = {
  database: <Database size={20} />,
  gitmerge: <GitMerge size={20} />,
  mail: <Mail size={20} />,
  message: <MessageSquare size={20} />,
  creditcard: <CreditCard size={20} />,
  arrowright: <ArrowRightCircle size={20} />,
  check: <CheckCircle size={20} />,
  alert: <AlertTriangle size={20} />,
}

const CustomNode = ({ data, selected }) => (
  <div
    style={{
      background: '#1e1e1e',
      border: `2px solid ${selected ? '#fff' : data.active ? data.color : '#444'}`,
      borderRadius: '8px',
      padding: '12px 16px',
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      width: '250px',
      boxShadow: selected ? `0 0 15px ${data.color}80` : '0 4px 6px rgba(0,0,0,0.3)',
      transition: 'all 0.3s ease',
    }}
  >
    <Handle type="target" position={Position.Left} id="left" style={{ background: '#555' }} />
    <Handle type="target" position={Position.Bottom} id="bottom" style={{ background: '#555', left: '50%' }} />
    <div style={{ background: data.color, padding: '8px', borderRadius: '6px', display: 'flex', color: '#121212' }}>
      {IconMap[data.icon]}
    </div>
    <div>
      <div style={{ fontSize: '14px', fontWeight: 'bold' }}>{data.label}</div>
      <div style={{ fontSize: '10px', color: '#aaa' }}>{data.subtext}</div>
    </div>
    <Handle type="source" position={Position.Right} id="right" style={{ background: '#555' }} />
    <Handle type="source" position={Position.Bottom} id="bottom-src" style={{ background: '#555', left: '50%' }} />
  </div>
)

const nodeTypes = { custom: CustomNode }
const delay = (milliseconds) => new Promise((resolve) => window.setTimeout(resolve, milliseconds))

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(pipelines.adaptiveChurn.nodes)
  const [edges, , onEdgesChange] = useEdgesState(pipelines.adaptiveChurn.edges)
  const [selectedNodeData, setSelectedNodeData] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const playRef = useRef(false)
  const runIdRef = useRef(0)

  const onNodeClick = (_event, node) => setSelectedNodeData(node.data)

  const runSimulation = async () => {
    if (playRef.current) {
      playRef.current = false
      runIdRef.current += 1
      setIsPlaying(false)
      setNodes((currentNodes) => currentNodes.map((node) => ({ ...node, data: { ...node.data, active: false } })))
      return
    }

    const runId = ++runIdRef.current
    playRef.current = true
    setIsPlaying(true)
    const steps = [['1'], ['2'], ['3', '4', '5'], ['6'], ['7', '8'], ['9']]

    for (const step of steps) {
      if (runId !== runIdRef.current) return
      setNodes((currentNodes) => currentNodes.map((node) => ({
        ...node,
        data: { ...node.data, active: step.includes(node.id) },
      })))
      await delay(step.length > 1 ? 12000 : 6000)
    }

    if (runId === runIdRef.current) {
      playRef.current = false
      setIsPlaying(false)
      setNodes((currentNodes) => currentNodes.map((node) => ({ ...node, data: { ...node.data, active: false } })))
    }
  }

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', backgroundColor: '#121212', fontFamily: 'sans-serif' }}>
      <header style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '60px', background: '#1e1e1e', borderBottom: '1px solid #333', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', color: '#fff' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ background: '#FF6D5A', padding: '4px 8px', borderRadius: '4px', fontWeight: 'bold', fontSize: '14px', color: '#000' }}>n8n</div>
          <h1 style={{ fontSize: '18px', margin: 0 }}>{pipelines.adaptiveChurn.name}</h1>
        </div>
        <button
          onClick={runSimulation}
          style={{ background: isPlaying ? '#DB4437' : '#0F9D58', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold' }}
          type="button"
        >
          {isPlaying ? <Square size={16} /> : <Play size={16} />}
          {isPlaying ? 'Stop Simulation' : 'Run Pipeline Test'}
        </button>
      </header>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        theme="dark"
        style={{ position: 'absolute', inset: 0 }}
      >
        <Background color="#333" gap={16} />
        <Controls style={{ fill: '#fff' }} />
        <MiniMap nodeColor={(node) => node.data.color || '#555'} maskColor="rgba(0, 0, 0, 0.8)" style={{ background: '#1e1e1e' }} />

        {selectedNodeData && (
          <Panel position="top-right" style={{ background: '#1e1e1e', border: '1px solid #444', borderRadius: '8px', padding: '20px', width: 'min(340px, calc(100vw - 30px))', color: '#fff', boxShadow: '0 10px 25px rgba(0,0,0,0.5)', marginTop: '72px', maxHeight: '80vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid #333', paddingBottom: '12px', marginBottom: '16px' }}>
              <Info size={20} color={selectedNodeData.color} />
              <h3 style={{ margin: 0, fontSize: '16px' }}>{selectedNodeData.label}</h3>
            </div>
            <div style={{ background: '#222', borderRadius: '6px', padding: '12px', marginBottom: '16px', border: '1px solid #333' }}>
              <h4 style={{ margin: '0 0 12px', fontSize: '13px', color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Assigned Resources</h4>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', fontSize: '13px' }}>
                <Users size={14} color="#4285F4" />
                <span style={{ color: '#ccc' }}>Human:</span>
                <span style={{ fontWeight: 500 }}>{selectedNodeData.resources.collaborators}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', fontSize: '13px' }}>
                <Bot size={14} color="#0F9D58" />
                <span style={{ color: '#ccc' }}>Agent:</span>
                <span style={{ fontWeight: 500 }}>{selectedNodeData.resources.agents}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
                <Wrench size={14} color="#F4B400" />
                <span style={{ color: '#ccc' }}>Skill:</span>
                <span style={{ fontWeight: 500, background: '#333', padding: '2px 6px', borderRadius: '4px', overflowWrap: 'anywhere' }}>{selectedNodeData.resources.skills}</span>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '13px' }}>
              <div><strong style={{ color: '#aaa', display: 'block', marginBottom: '4px' }}>1. Trigger &amp; Data Source</strong><div style={{ background: '#2a2a2a', padding: '8px', borderRadius: '4px' }}>{selectedNodeData.pillars.trigger}</div></div>
              <div><strong style={{ color: '#aaa', display: 'block', marginBottom: '4px' }}>2. Logic &amp; Automation</strong><div style={{ background: '#2a2a2a', padding: '8px', borderRadius: '4px' }}>{selectedNodeData.pillars.logic}</div></div>
              <div><strong style={{ color: '#aaa', display: 'block', marginBottom: '4px' }}>3. Content &amp; Creative</strong><div style={{ background: '#2a2a2a', padding: '8px', borderRadius: '4px' }}>{selectedNodeData.pillars.content}</div></div>
              <div><strong style={{ color: '#aaa', display: 'block', marginBottom: '4px' }}>4. Delivery Mechanism</strong><div style={{ background: '#2a2a2a', padding: '8px', borderRadius: '4px' }}>{selectedNodeData.pillars.delivery}</div></div>
            </div>
          </Panel>
        )}
      </ReactFlow>
    </div>
  )
}