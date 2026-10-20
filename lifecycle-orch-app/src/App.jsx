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

const pipelineModules = import.meta.glob('./pipelines/*.js', { eager: true, import: 'default' })
const pipelineEntries = Object.entries(pipelineModules)
const defaultPipelinePath = pipelineEntries.find(([path]) => path.endsWith('/adaptiveChurn.js'))?.[0] ?? pipelineEntries[0]?.[0]

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
  const [selectedPipelinePath, setSelectedPipelinePath] = useState(defaultPipelinePath)
  const selectedPipeline = pipelineModules[selectedPipelinePath]
  const [nodes, setNodes, onNodesChange] = useNodesState(selectedPipeline.nodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(selectedPipeline.edges)
  const [selectedNodeData, setSelectedNodeData] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const playRef = useRef(false)
  const runIdRef = useRef(0)

  const onNodeClick = (_event, node) => setSelectedNodeData(node.data)

  const onPipelineChange = (event) => {
    const nextPath = event.target.value
    const nextPipeline = pipelineModules[nextPath]
    playRef.current = false
    runIdRef.current += 1
    setIsPlaying(false)
    setSelectedPipelinePath(nextPath)
    setNodes(nextPipeline.nodes)
    setEdges(nextPipeline.edges)
    setSelectedNodeData(null)
  }

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
          <h1 style={{ fontSize: '18px', margin: 0 }}>{selectedPipeline.name}</h1>
        </div>
        <select
          aria-label="Select orchestrator"
          onChange={onPipelineChange}
          style={{ background: '#2a2a2a', color: '#fff', border: '1px solid #444', borderRadius: '6px', padding: '8px 10px', marginLeft: 'auto', marginRight: '16px', maxWidth: '220px' }}
          value={selectedPipelinePath}
        >
          {pipelineEntries.map(([path, pipeline]) => (
            <option key={path} value={path}>{pipeline.name}</option>
          ))}
        </select>
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