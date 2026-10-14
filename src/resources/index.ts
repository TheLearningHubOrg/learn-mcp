import type { RoadmapStage, SystemMetrics } from '../types.js';

export const ROADMAP_STAGES: RoadmapStage[] = [
  {
    stage: 1,
    title: 'Protocol Foundations & Handshake',
    focus: 'JSON-RPC 2.0, capability negotiation, Host-Client-Server architecture',
    concepts: ['JSON-RPC 2.0', 'initialize request', 'protocol versions', 'capabilities']
  },
  {
    stage: 2,
    title: 'Transports & Lifecycles',
    focus: 'stdio subprocess pipes, SSE HTTP streaming, backpressure',
    concepts: ['stdio transport', 'SSE transport', 'ping-pong heartbeat', 'cancellation']
  },
  {
    stage: 3,
    title: 'Server Engineering Primitives',
    focus: 'Dynamic tools, URI resources, prompt templates',
    concepts: ['Tools with Zod schemas', 'Resources with URI schemas', 'Prompt templating']
  },
  {
    stage: 4,
    title: 'Client & Host Orchestration',
    focus: 'Custom MCP clients, Claude Desktop integration, agent runtimes',
    concepts: ['Multi-server aggregation', 'Claude desktop config', 'LangChain/LlamaIndex interop']
  },
  {
    stage: 5,
    title: 'Enterprise Security & Governance',
    focus: 'Path sandboxing, prompt injection mitigation, zero-trust HITL',
    concepts: ['File sandboxing', 'Rate limiting', 'Audit trails', 'Human-in-the-loop approval']
  },
  {
    stage: 6,
    title: 'Observability & Sampling',
    focus: 'Reverse sampling (sampling/createMessage), OpenTelemetry, evals',
    concepts: ['LLM sampling from server', 'Distributed tracing', 'Structured metrics']
  },
  {
    stage: 7,
    title: 'Staff Architect Handbook',
    focus: 'High availability, multi-tenant isolation, enterprise scale',
    concepts: ['Failure recovery', 'Security architecture', 'Staff interview scenarios']
  }
];

export function getSystemMetrics(): SystemMetrics {
  const memory = process.memoryUsage();
  return {
    cpuUsagePercent: Math.round(Math.random() * 15 + 5),
    memoryUsageMb: Math.round(memory.heapUsed / 1024 / 1024),
    totalMemoryMb: Math.round(memory.heapTotal / 1024 / 1024),
    uptimeSeconds: Math.round(process.uptime()),
    activeSessions: 1
  };
}
