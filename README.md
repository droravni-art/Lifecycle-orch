# Lifecycle-orch
Lifecycle orchastrators 
# Lifecycle Orchestrator Framework & Visualizer

A dynamic, config-driven, n8n-style interactive visualizer built with **React** and **React Flow** (@xyflow/react). Designed to map, simulate, and manage complex, multi-actor marketing automation pipelines and retention loops.

---

## 🎯 Strategic Purpose

Traditional flowcharts often hide operational complexity. This project bridges the gap between high-level strategy and execution by converting abstract retention flows into actionable, fully accountable blueprints.

Every pipeline rendered in this application enforces a strict **Multi-Actor Allocation** and a **4-Pillar Operational Model** at every single stage.

---

## 🏗️ Core Architectural Pillars

When inspecting any step or node in a lifecycle orchestrator, the system explicitly defines four operational pillars in the side panel:

1. **Trigger & Data Source:** The exact origin of the audience segment or event (e.g., Looker SQL queries, Stripe webhook events, product analytics).
2. **Logic & Automation:** The middleware rules and decision engines governing routing (e.g., n8n switch nodes, HubSpot workflow filters).
3. **Content & Creative Source:** The origin of deliverables, specifying required human assets, brandbook rules, or automated AI generation.
4. **Delivery Mechanism:** The exact endpoint platform executing the action (e.g., SendGrid, HubSpot Marketing Hub, Twilio SMS).

---

## 👥 Multi-Actor Allocation (Resources)

To ensure operational clarity, every stage explicitly assigns three distinct resource types:

* 👤 **Human Collaborators:** Designated team members or roles responsible for oversight or asset creation (e.g., *Copywriting & Design Team*, *RevOps Lead*).
* 🤖 **AI Agents:** Automated agents executing specific sub-tasks (e.g., *Looker MCP Agent*, *Content Gen Agent*).
* 🛠️ **Active Skills:** Specialized prompts, guidelines, or specs applied to the step (e.g., *`brand-voice-enforcer`*, *`lifecycle-orchestrator-framework`*).

---

## 🚀 App Features & Controls

* **Interactive Canvas:** Native drag-to-pan, zoom, and fit-view canvas inspired by node-based automation platforms like n8n.
* **Inspectable Side Panel:** Clicking any node slides out a detail pane showcasing both its assigned resources and its 4 operational pillars.
* **Paced Simulation Engine:** Click **"Run Pipeline Test"** to visualize execution pacing in real time:
  * **6 Seconds** per step for linear single steps.
  * **12 Seconds** per step for multi-node branching steps to allow adequate time for visual tracking.
* **Feedback Loop Visualization:** Curved, animated edges map continuous learning loops (e.g., warehouse data feeding back into prediction models).

---

## 📦 Tech Stack

* **Framework:** React 18 + Vite
* **Canvas Engine:** React Flow (`@xyflow/react`)
* **Iconography:** Lucide React (`lucide-react`)
* **Styling:** Custom Dark Theme (`#121212` background, n8n brand accents)

---

## ⚙️ Local Setup & Deployment

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/droravni-art/Lifecycle-orch.git](https://github.com/droravni-art/Lifecycle-orch.git)
   cd Lifecycle-orch/lifecycle-orch-app
  ```

## React Flow Draft

```jsx
import React, { useState, useCallback, useEffect } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  Handle,
  Position,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Database, GitMerge, Mail, MessageSquare, CreditCard, ArrowRightCircle, CheckCircle, AlertTriangle } from 'lucide-react';

// Custom Node Component for n8n-style look
const CustomNode = ({ data }) => {
  return (
    <div style={{
      background: '#1e1e1e',
      border: `2px solid ${data.color || '#555'}`,
      borderRadius: '8px',
      padding: '12px 16px',
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      width: '240px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
    }}>
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
  );
};

const nodeTypes = { custom: CustomNode };

const initialNodes = [
  // Trigger
  { id: '1', type: 'custom', position: { x: 50, y: 300 }, data: { label: 'Looker Trigger', subtext: 'Fetch Churn Risk Data', icon: <Database size={20} color="#fff" />, color: '#4285F4' } },
  // Router
  { id: '2', type: 'custom', position: { x: 350, y: 300 }, data: { label: 'n8n Router', subtext: 'Identify Risk Type', icon: <GitMerge size={20} color="#fff" />, color: '#FF6D5A' } },
  // Branches
  { id: '3', type: 'custom', position: { x: 700, y: 100 }, data: { label: 'Price Sensitivity', subtext: 'Promo Email (20% Off)', icon: <Mail size={20} color="#fff" />, color: '#F4B400' } },
  { id: '4', type: 'custom', position: { x: 700, y: 300 }, data: { label: 'Feature Friction', subtext: 'Re-onboard & Alert CS', icon: <MessageSquare size={20} color="#fff" />, color: '#0F9D58' } },
  { id: '5', type: 'custom', position: { x: 700, y: 500 }, data: { label: 'Billing Issue', subtext: 'Send Update Payment Link', icon: <CreditCard size={20} color="#fff" />, color: '#DB4437' } },
  // Sync
  { id: '6', type: 'custom', position: { x: 1050, y: 300 }, data: { label: 'HubSpot Sync', subtext: 'Track Engagement', icon: <ArrowRightCircle size={20} color="#fff" />, color: '#FF7A59' } },
  // Outcomes
  { id: '7', type: 'custom', position: { x: 1400, y: 200 }, data: { label: 'Saved', subtext: 'User Re-Engaged', icon: <CheckCircle size={20} color="#fff" />, color: '#0F9D58' } },
  { id: '8', type: 'custom', position: { x: 1400, y: 400 }, data: { label: 'Churned', subtext: 'Inactive', icon: <AlertTriangle size={20} color="#fff" />, color: '#DB4437' } },
  // Data Warehouse Loop
  { id: '9', type: 'custom', position: { x: 1750, y: 300 }, data: { label: 'Looker Data Warehouse', subtext: 'Optimize Campaign Weight', icon: <Database size={20} color="#fff" />, color: '#4285F4' } },
];

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
];

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

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
  );
}
```
