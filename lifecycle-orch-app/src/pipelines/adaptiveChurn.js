const adaptiveChurn = {
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
}

export default adaptiveChurn