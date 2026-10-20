import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  Handle,
  Position,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import {
  Database,
  GitMerge,
  Mail,
  MessageSquare,
  CreditCard,
  ArrowRightCircle,
  CheckCircle,
  AlertTriangle,
} from 'lucide-react'

const CustomNode = ({ data }) => (
  <div
    style={{
      background: '#1e1e1e',
      border: `2px solid ${data.color || '#555'}`,
      borderRadius: '8px',
      padding: '12px 16px',
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      width: '240px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
    }}
  >
    <Handle type="target" position={Position.Left} style={{ background: '#555' }} />
    <div style={{ background: data.color || '#555', padding: '8px', borderRadius: '6px', display: 'flex' }}>
      {data.icon}
    </div>
    <div>
      <div style={{ fontSize: '14px', fontWeight: 'bold' }}>{data.label}</div>
      <div style={{ fontSize: '10px', color: '#aaa' }}>{data.subtext}</div>
    </div>
    <Handle type="source" position={Position.Right} style={{ background: '#555' }} />
  </div>
)

const nodeTypes = { custom: CustomNode }

const initialNodes = [
  { id: '1', type: 'custom', position: { x: 50, y: 300 }, data: { label: 'Looker Trigger', subtext: 'Fetch Churn Risk Data', icon: <Database size={20} color="#fff" />, color: '#4285F4' } },
  { id: '2', type: 'custom', position: { x: 350, y: 300 }, data: { label: 'n8n Router', subtext: 'Identify Risk Type', icon: <GitMerge size={20} color="#fff" />, color: '#FF6D5A' } },
  { id: '3', type: 'custom', position: { x: 700, y: 100 }, data: { label: 'Price Sensitivity', subtext: 'Promo Email (20% Off)', icon: <Mail size={20} color="#fff" />, color: '#F4B400' } },
  { id: '4', type: 'custom', position: { x: 700, y: 300 }, data: { label: 'Feature Friction', subtext: 'Re-onboard & Alert CS', icon: <MessageSquare size={20} color="#fff" />, color: '#0F9D58' } },
  { id: '5', type: 'custom', position: { x: 700, y: 500 }, data: { label: 'Billing Issue', subtext: 'Send Update Payment Link', icon: <CreditCard size={20} color="#fff" />, color: '#DB4437' } },
  { id: '6', type: 'custom', position: { x: 1050, y: 300 }, data: { label: 'HubSpot Sync', subtext: 'Track Engagement', icon: <ArrowRightCircle size={20} color="#fff" />, color: '#FF7A59' } },
  { id: '7', type: 'custom', position: { x: 1400, y: 200 }, data: { label: 'Saved', subtext: 'User Re-Engaged', icon: <CheckCircle size={20} color="#fff" />, color: '#0F9D58' } },
  { id: '8', type: 'custom', position: { x: 1400, y: 400 }, data: { label: 'Churned', subtext: 'Inactive', icon: <AlertTriangle size={20} color="#fff" />, color: '#DB4437' } },
  { id: '9', type: 'custom', position: { x: 1750, y: 300 }, data: { label: 'Looker Data Warehouse', subtext: 'Optimize Campaign Weight', icon: <Database size={20} color="#fff" />, color: '#4285F4' } },
]

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', animated: true, style: { stroke: '#FF6D5A', strokeWidth: 2 } },
  { id: 'e2-3', source: '2', target: '3', animated: true, style: { stroke: '#F4B400', strokeWidth: 2 } },
  { id: 'e2-4', source: '2', target: '4', animated: true, style: { stroke: '#0F9D58', strokeWidth: 2 } },
  { id: 'e2-5', source: '2', target: '5', animated: true, style: { stroke: '#DB4437', strokeWidth: 2 } },
  { id: 'e3-6', source: '3', target: '6', animated: true, style: { stroke: '#FF7A59', strokeWidth: 2 } },
  { id: 'e4-6', source: '4', target: '6', animated: true, style: { stroke: '#FF7A59', strokeWidth: 2 } },
  { id: 'e5-6', source: '5', target: '6', animated: true, style: { stroke: '#FF7A59', strokeWidth: 2 } },
  { id: 'e6-7', source: '6', target: '7', animated: true, style: { stroke: '#0F9D58', strokeWidth: 2 } },
  { id: 'e6-8', source: '6', target: '8', animated: true, style: { stroke: '#DB4437', strokeWidth: 2 } },
  { id: 'e7-9', source: '7', target: '9', animated: true, style: { stroke: '#4285F4', strokeWidth: 2 } },
  { id: 'e8-9', source: '8', target: '9', animated: true, style: { stroke: '#4285F4', strokeWidth: 2 } },
]

export default function App() {
  const [nodes, , onNodesChange] = useNodesState(initialNodes)
  const [edges, , onEdgesChange] = useEdgesState(initialEdges)

  return (
    <div style={{ width: '100vw', height: '100vh', backgroundColor: '#121212' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
        theme="dark"
      >
        <Background color="#333" gap={16} />
        <Controls style={{ fill: '#fff' }} />
        <MiniMap nodeColor={(node) => node.data.color || '#555'} maskColor="rgba(0, 0, 0, 0.7)" />
      </ReactFlow>
    </div>
  )
}