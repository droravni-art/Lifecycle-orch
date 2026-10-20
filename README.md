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
