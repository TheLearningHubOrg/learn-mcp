#!/usr/bin/env node
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { createMcpServer } from './server.js';

async function main() {
  const server = createMcpServer();
  const transport = new StdioServerTransport();

  await server.connect(transport);
  console.error('[learn-mcp] Model Context Protocol Server running on stdio');
}

main().catch((error) => {
  console.error('[learn-mcp] Fatal error initializing MCP server:', error);
  process.exit(1);
});
