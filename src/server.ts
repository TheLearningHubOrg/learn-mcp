import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
  ListPromptsRequestSchema,
  GetPromptRequestSchema,
  ErrorCode,
  McpError
} from '@modelcontextprotocol/sdk/types.js';
import { ROADMAP_STAGES, getSystemMetrics } from './resources/index.js';

export function createMcpServer(): Server {
  const server = new Server(
    {
      name: 'learn-mcp-server',
      version: '1.0.0'
    },
    {
      capabilities: {
        tools: {},
        resources: {},
        prompts: {}
      }
    }
  );

  // 1. Tool Handlers
  server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
      tools: [
        {
          name: 'calculate_stats',
          description: 'Calculates statistical summaries (mean, median, min, max, sum, stdev) for a numeric array.',
          inputSchema: {
            type: 'object',
            properties: {
              numbers: {
                type: 'array',
                items: { type: 'number' },
                description: 'Array of numbers to analyze'
              }
            },
            required: ['numbers']
          }
        },
        {
          name: 'inspect_system',
          description: 'Retrieves current node environment, runtime diagnostics, and process health.',
          inputSchema: {
            type: 'object',
            properties: {}
          }
        },
        {
          name: 'echo',
          description: 'Echoes back an input message with server timestamp and metadata.',
          inputSchema: {
            type: 'object',
            properties: {
              message: { type: 'string', description: 'Message to echo' }
            },
            required: ['message']
          }
        }
      ]
    };
  });

  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;

    switch (name) {
      case 'calculate_stats': {
        const numbers = (args as { numbers?: number[] })?.numbers;
        if (!Array.isArray(numbers) || numbers.length === 0) {
          throw new McpError(ErrorCode.InvalidParams, 'numbers must be a non-empty array of numbers');
        }

        const sum = numbers.reduce((a, b) => a + b, 0);
        const mean = sum / numbers.length;
        const sorted = [...numbers].sort((a, b) => a - b);
        const min = sorted[0];
        const max = sorted[sorted.length - 1];
        const mid = Math.floor(sorted.length / 2);
        const median = sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
        const variance = numbers.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / numbers.length;
        const stdev = Math.sqrt(variance);

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify({ count: numbers.length, sum, mean, median, min, max, stdev }, null, 2)
            }
          ]
        };
      }

      case 'inspect_system': {
        const metrics = getSystemMetrics();
        const payload = {
          status: 'healthy',
          nodeVersion: process.version,
          platform: process.platform,
          arch: process.arch,
          metrics
        };

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(payload, null, 2)
            }
          ]
        };
      }

      case 'echo': {
        const message = (args as { message?: string })?.message || '';
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify({ echoed: message, timestamp: new Date().toISOString() }, null, 2)
            }
          ]
        };
      }

      default:
        throw new McpError(ErrorCode.MethodNotFound, `Tool not found: ${name}`);
    }
  });

  // 2. Resource Handlers
  server.setRequestHandler(ListResourcesRequestSchema, async () => {
    return {
      resources: [
        {
          uri: 'hub://roadmap',
          name: 'The Learning Hub 7-Stage Roadmap',
          mimeType: 'application/json',
          description: 'Official structured pedagogical milestones for full mastery'
        },
        {
          uri: 'hub://metrics',
          name: 'Live System Health Metrics',
          mimeType: 'application/json',
          description: 'Real-time CPU, memory, and process uptime statistics'
        }
      ]
    };
  });

  server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
    const { uri } = request.params;

    if (uri === 'hub://roadmap') {
      return {
        contents: [
          {
            uri,
            mimeType: 'application/json',
            text: JSON.stringify(ROADMAP_STAGES, null, 2)
          }
        ]
      };
    }

    if (uri === 'hub://metrics') {
      return {
        contents: [
          {
            uri,
            mimeType: 'application/json',
            text: JSON.stringify(getSystemMetrics(), null, 2)
          }
        ]
      };
    }

    throw new McpError(ErrorCode.InvalidRequest, `Unknown resource URI: ${uri}`);
  });

  // 3. Prompt Handlers
  server.setRequestHandler(ListPromptsRequestSchema, async () => {
    return {
      prompts: [
        {
          name: 'curriculum-tutor',
          description: 'Interactive pedagogical tutoring prompt for guiding learners through a technical stage.',
          arguments: [
            {
              name: 'topic',
              description: 'The technical topic or concept to teach',
              required: true
            },
            {
              name: 'stage',
              description: 'Target stage number (1-7)',
              required: false
            }
          ]
        },
        {
          name: 'incident-review',
          description: 'Senior staff review template for analyzing production telemetry or stack traces.',
          arguments: [
            {
              name: 'incident_summary',
              description: 'Brief description of the failure event',
              required: true
            }
          ]
        }
      ]
    };
  });

  server.setRequestHandler(GetPromptRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;

    if (name === 'curriculum-tutor') {
      const topic = args?.topic || 'General Concepts';
      const stage = args?.stage || '1';

      return {
        messages: [
          {
            role: 'user',
            content: {
              type: 'text',
              text: `You are an expert engineering instructor from The Learning Hub. Guide the student through Stage ${stage}: "${topic}". Provide clear theoretical foundations, code examples, edge cases, and a hands-on verification challenge.`
            }
          }
        ]
      };
    }

    if (name === 'incident-review') {
      const summary = args?.incident_summary || 'Unknown Error';
      return {
        messages: [
          {
            role: 'user',
            content: {
              type: 'text',
              text: `Perform a Staff-level Root Cause Analysis (RCA) on the following incident:\n\n"${summary}"\n\nOutline the timeline, blast radius, immediate remediation, preventative safeguards, and post-incident verification tests.`
            }
          }
        ]
      };
    }

    throw new McpError(ErrorCode.InvalidRequest, `Unknown prompt: ${name}`);
  });

  return server;
}
