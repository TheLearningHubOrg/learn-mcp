# Learn Model Context Protocol (MCP) 🔌

<div align="center">

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![MCP Specification](https://img.shields.io/badge/MCP%20Spec-v1.0+-DD0031.svg?logo=anthropic)](https://modelcontextprotocol.io/)
[![TypeScript SDK](https://img.shields.io/badge/TypeScript%20SDK-v1.6+-blue.svg?logo=typescript)](https://github.com/modelcontextprotocol/typescript-sdk)
[![Python SDK](https://img.shields.io/badge/Python%20FastMCP-v1.3+-green.svg?logo=python)](https://github.com/modelcontextprotocol/python-sdk)
[![Transports](https://img.shields.io/badge/Transports-stdio%20%7C%20SSE-purple.svg)](https://modelcontextprotocol.io/docs/concepts/transports)
[![Production Ready](https://img.shields.io/badge/Status-Enterprise%20Grade-brightgreen.svg)](https://github.com/TheLearningHubOrg/learn-mcp)

**An exhaustive, production-grade masterclass from absolute zero to staff-level Model Context Protocol (MCP) systems architecture.**  
Master the open standard connecting AI models to local databases, enterprise APIs, internal tools, secure sandboxes, and autonomous multi-agent runtimes.

[Getting Started](#1-stage-1-absolute-beginner-foundations--protocol-architecture) • [Transports Deep Dive](#2-stage-2-transports-deep-dive--connection-lifecycles) • [Server Engineering](#3-stage-3-server-engineering-resources-prompts--dynamic-tools) • [Client & Host Integration](#4-stage-4-client--host-orchestration) • [Enterprise Security](#5-stage-5-enterprise-security-sandboxing--governance) • [Observability & Sampling](#6-stage-6-observability-sampling--evals) • [Staff Handbook](#7-stage-7-staff-mcp-architect-interview-handbook--cheatsheet)

<br/>

<a href="https://www.buymeacoffee.com/manthanank">
  <img src="https://img.shields.io/badge/Buy%20Me%20A%20Coffee-Donate-yellow?style=for-the-badge&logo=buy-me-a-coffee" alt="Buy Me A Coffee" width="180">
</a>

</div>

---

## 🗺️ 7-Stage Pedagogical Roadmap

```mermaid
flowchart LR
    S1["Stage 1: Protocol Foundations"] --> S2["Stage 2: stdio & SSE Transports"]
    S2 --> S3["Stage 3: Server Primitives (Tools, Resources, Prompts)"]
    S3 --> S4["Stage 4: Client & Host Orchestration"]
    S4 --> S5["Stage 5: Enterprise Security & Sandboxing"]
    S5 --> S6["Stage 6: Observability, Sampling & Evals"]
    S6 --> S7["Stage 7: Staff Architect Handbook & Cheatsheet"]
```

| Stage | Domain Focus | Core Concepts & Production Outcomes |
| :--- | :--- | :--- |
| **Stage 1** | **Protocol Foundations & Handshake** | Solving the $M \times N$ tool problem, Host-Client-Server triad, JSON-RPC 2.0 message framing, capability negotiation. |
| **Stage 2** | **Transports & Connection Lifecycles** | `stdio` sub-process pipes vs `SSE` HTTP streaming, backpressure, session headers, resilient reconnection loops. |
| **Stage 3** | **Server Engineering: Primitives** | Building production servers via TypeScript SDK & Python `FastMCP`. Dynamic Tools (Zod/Pydantic), URI Resources, and Prompts. |
| **Stage 4** | **Client & Host Orchestration** | Writing custom MCP clients, Claude Desktop & IDE integration, multi-server routing, LangGraph & CrewAI interop. |
| **Stage 5** | **Enterprise Security & Governance** | Path sandboxing, prompt injection mitigation, mTLS, Bearer auth over SSE, zero-trust human-in-the-loop gates. |
| **Stage 6** | **Observability, Sampling & Evals** | Reverse LLM sampling (`sampling/createMessage`), structured logging, OpenTelemetry tracing, automated mock testing. |
| **Stage 7** | **Staff Architect Interview Handbook** | 40+ staff-level scenario Q&As, production failure modes, architectural blueprints, and enterprise cheatsheet. |

---

## 📋 Table of Contents
- [1. Stage 1: Absolute Beginner Foundations & Protocol Architecture](#1-stage-1-absolute-beginner-foundations--protocol-architecture)
  - [1.1 The M x N Integration Problem & The Rise of MCP](#11-the-m-x-n-integration-problem--the-rise-of-mcp)
  - [1.2 The Architecture Triad: Host, Client, and Server](#12-the-architecture-triad-host-client-and-server)
  - [1.3 JSON-RPC 2.0 Wire Protocol & Framing](#13-json-rpc-20-wire-protocol--framing)
  - [1.4 The Capability Negotiation Handshake](#14-the-capability-negotiation-handshake)
- [2. Stage 2: Transports Deep Dive & Connection Lifecycles](#2-stage-2-transports-deep-dive--connection-lifecycles)
  - [2.1 stdio Transport (Standard Input / Standard Output)](#21-stdio-transport-standard-input--standard-output)
  - [2.2 Server-Sent Events (SSE) HTTP Transport](#22-server-sent-events-sse-http-transport)
  - [2.3 Error Handling & Standardized Error Codes](#23-error-handling--standardized-error-codes)
- [3. Stage 3: Server Engineering: Resources, Prompts & Dynamic Tools](#3-stage-3-server-engineering-resources-prompts--dynamic-tools)
  - [3.1 TypeScript SDK Production Server](#31-typescript-sdk-production-server)
  - [3.2 Python FastMCP Production Server](#32-python-fastmcp-production-server)
  - [3.3 Resources & Dynamic Resource Templates (URIs)](#33-resources--dynamic-resource-templates-uris)
  - [3.4 Dynamic Prompt Templates](#34-dynamic-prompt-templates)
  - [3.5 Enterprise Tools with Strict Schema Validation](#35-enterprise-tools-with-strict-schema-validation)
- [4. Stage 4: Client & Host Orchestration](#4-stage-4-client--host-orchestration)
  - [4.1 Building a Custom TypeScript MCP Client](#41-building-a-custom-typescript-mcp-client)
  - [4.2 Host Configurations: Claude Desktop, Cursor, and Antigravity IDE](#42-host-configurations-claude-desktop-cursor-and-antigravity-ide)
  - [4.3 Integrating MCP Servers with LangGraph & CrewAI](#43-integrating-mcp-servers-with-langgraph--crewai)
- [5. Stage 5: Enterprise Security, Sandboxing & Governance](#5-stage-5-enterprise-security-sandboxing--governance)
  - [5.1 Threat Vectors in Model-Tool Execution](#51-threat-vectors-in-model-tool-execution)
  - [5.2 Sandboxing File Systems & Network Access](#52-sandboxing-file-systems--network-access)
  - [5.3 Authentication & Authorization on Remote SSE Servers](#53-authentication--authorization-on-remote-sse-servers)
  - [5.4 Human-In-The-Loop (HITL) Guardrails](#54-human-in-the-loop-hitl-guardrails)
- [6. Stage 6: Observability, Sampling & Evals](#6-stage-6-observability-sampling--evals)
  - [6.1 Reverse LLM Sampling (`sampling/createMessage`)](#61-reverse-llm-sampling-samplingcreatemessage)
  - [6.2 Distributed Tracing & OpenTelemetry](#62-distributed-tracing--opentelemetry)
  - [6.3 Automated Server Testing with MCP Inspector](#63-automated-server-testing-with-mcp-inspector)
- [7. Stage 7: Staff MCP Architect Interview Handbook & Cheatsheet](#7-stage-7-staff-mcp-architect-interview-handbook--cheatsheet)
  - [7.1 Enterprise Production Cheatsheet](#71-enterprise-production-cheatsheet)
  - [7.2 Staff & Principal Architect Interview Q&A (40 Scenarios)](#72-staff--principal-architect-interview-qa-40-scenarios)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## 1. Stage 1: Absolute Beginner Foundations & Protocol Architecture

### 1.1 The M x N Integration Problem & The Rise of MCP
Before the **Model Context Protocol (MCP)**, connecting $M$ different AI models or agent environments (Claude, ChatGPT, LangChain, local agents, IDEs) to $N$ different enterprise data sources (Postgres, GitHub, Slack, Jira, local files) required $M \times N$ proprietary integrations:

```
BEFORE MCP (M x N Fragile Custom Code):
[ Claude Desktop ] ----> (Custom Postgres Plugin) ----> [ PostgreSQL DB ]
[ LangChain App  ] ----> (Custom LangChain Tool)  ----> [ GitHub API ]
[ Cursor IDE     ] ----> (Custom IDE Tooling)     ----> [ Local Files ]

AFTER MCP (Standardized USB-C for AI Context):
[ Any AI Host / Client ] === (Standard JSON-RPC over stdio / SSE) ===> [ Any MCP Server ]
```

MCP acts as the **open standard protocol** (analogous to the Language Server Protocol / LSP for IDEs, or USB-C for hardware) allowing any LLM runtime to instantly query, invoke, and inspect tools, resources, and prompts across any server.

### 1.2 The Architecture Triad: Host, Client, and Server
The MCP architecture separates concerns across three strict logical entities:

```mermaid
graph TD
    subgraph Host ["1. Host Environment (e.g. Claude Desktop, IDE, Agent)"]
        UI["User Interface / Chat Loop"]
        Orchestrator["Model Orchestrator & LLM"]
        subgraph Client ["2. MCP Client (1..N Instances)"]
            ClientA["Client A (stdio)"]
            ClientB["Client B (SSE)"]
        end
    end

    subgraph ServerA ["3. MCP Server A (Local)"]
        ToolsA["Tools: runQuery, listTables"]
        ResourcesA["Resources: postgres://schema"]
    end

    subgraph ServerB ["3. MCP Server B (Remote)"]
        ToolsB["Tools: createIssue, mergePR"]
        PromptsB["Prompts: review_pull_request"]
    end

    UI --> Orchestrator
    Orchestrator --> ClientA
    Orchestrator --> ClientB
    ClientA <-- stdio pipe --> ServerA
    ClientB <-- HTTP / SSE --> ServerB
```

1. **Host**: The orchestrator application (e.g., Claude Desktop, VS Code, Antigravity IDE, custom agent). It owns the LLM connection, security permissions, user interface, and lifecycle.
2. **Client**: Protocol client initialized *inside* the host. Maintains a 1:1 connection with an individual MCP server.
3. **Server**: Lightweight programs providing structured capabilities:
   - **Tools**: Executable functions that cause side effects or retrieve live data.
   - **Resources**: Read-only binary or textual data accessed via URI schemes (`file://`, `postgres://`).
   - **Prompts**: Pre-configured, parameterized prompt templates provided to users.

### 1.3 JSON-RPC 2.0 Wire Protocol & Framing
Every MCP message is encoded as strict **JSON-RPC 2.0**:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "execute_query",
    "arguments": {
      "sql": "SELECT id, email FROM users WHERE active = true LIMIT 5;"
    }
  }
}
```

Standard responses return structured content arrays:
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "content": [
      {
        "type": "text",
        "text": "[{\"id\": 101, \"email\": \"alice@corp.internal\"}]"
      }
    ],
    "isError": false
  }
}
```

### 1.4 The Capability Negotiation Handshake
When an MCP client initiates a connection, it performs an explicit bidirectional capability exchange:

```mermaid
sequenceDiagram
    autonumber
    participant C as MCP Client
    participant S as MCP Server

    C->>S: initialize request (clientInfo, capabilities: roots, sampling)
    S-->>C: initialize response (serverInfo, capabilities: tools, resources, prompts)
    C->>S: initialized notification (handshake confirmed)
    Note over C,S: Normal protocol operations can now occur
    C->>S: tools/list
    S-->>C: [{ name: "execute_query", inputSchema: {...} }]
```

---

## 2. Stage 2: Transports Deep Dive & Connection Lifecycles

### 2.1 stdio Transport (Standard Input / Standard Output)
The `stdio` transport is the primary mechanism for local tools. The Host process spawns the MCP server as a child process and communicates via `stdin` and `stdout`.

> [!WARNING]
> In `stdio` mode, the server process **MUST NEVER** output regular logs or debugging text to `stdout` (`console.log` in Node.js or `print()` in Python). Doing so breaks JSON-RPC message framing. All logs must be written strictly to `stderr` (`console.error` or `sys.stderr.write`).

```typescript
// stdio message framing rule:
// Messages are separated by newlines (\n). Each line MUST be a complete JSON-RPC 2.0 payload.
```

### 2.2 Server-Sent Events (SSE) HTTP Transport
For distributed, containerized, or remote team setups, MCP uses an **HTTP + SSE** transport:
- **`GET /sse`**: The client connects and establishes a long-lived unidirectional stream for server-to-client events.
- **`POST /message?sessionId=<id>`**: The client sends client-to-server JSON-RPC requests via standard HTTP POST.

```mermaid
sequenceDiagram
    participant C as MCP Client
    participant S as Remote MCP Server (SSE)

    C->>S: GET /sse (Accept: text/event-stream)
    S-->>C: 200 OK + event: endpoint\ndata: /message?sessionId=sess_982341
    Note over C,S: Connection is open
    C->>S: POST /message?sessionId=sess_982341 (JSON-RPC body)
    S-->>C: 202 Accepted
    S-->>C: event: message\ndata: {"jsonrpc":"2.0","id":1,"result":{...}}
```

### 2.3 Error Handling & Standardized Error Codes

| JSON-RPC Code | Constant | Meaning in MCP |
| :---: | :--- | :--- |
| `-32700` | `PARSE_ERROR` | Server received unparseable JSON string on transport stream. |
| `-32600` | `INVALID_REQUEST` | Payload is not a valid JSON-RPC 2.0 object. |
| `-32601` | `METHOD_NOT_FOUND` | Method does not exist (e.g. server does not support `prompts/list`). |
| `-32602` | `INVALID_PARAMS` | Tool invocation arguments failed schema validation (Zod/Pydantic). |
| `-32603` | `INTERNAL_ERROR` | Uncaught runtime exception during tool or resource execution. |

---

## 3. Stage 3: Server Engineering: Resources, Prompts & Dynamic Tools

### 3.1 TypeScript SDK Production Server
Production-grade implementation of an enterprise SQLite query server using `@modelcontextprotocol/sdk`:

```typescript
#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
  ErrorCode,
  McpError
} from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";

const server = new Server(
  {
    name: "enterprise-database-server",
    version: "1.0.0"
  },
  {
    capabilities: {
      tools: {},
      resources: {}
    }
  }
);

// 1. Tool Definitions
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "execute_readonly_query",
        description: "Executes a safe, read-only SQL SELECT query against the analytics database.",
        inputSchema: {
          type: "object",
          properties: {
            sql: {
              type: "string",
              description: "The SQL statement to execute. Must begin with SELECT or EXPLAIN."
            },
            limit: {
              type: "number",
              description: "Maximum rows to return (default 50, maximum 500).",
              default: 50
            }
          },
          required: ["sql"]
        }
      }
    ]
  };
});

// 2. Tool Execution Handler
const QueryArgsSchema = z.object({
  sql: z.string().refine(
    (q) => /^\s*(SELECT|EXPLAIN)\s+/i.test(q),
    { message: "Only SELECT and EXPLAIN queries are permitted in read-only mode." }
  ),
  limit: z.number().min(1).max(500).default(50)
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name !== "execute_readonly_query") {
    throw new McpError(ErrorCode.MethodNotFound, `Unknown tool: ${request.params.name}`);
  }

  const parseResult = QueryArgsSchema.safeParse(request.params.arguments);
  if (!parseResult.success) {
    throw new McpError(
      ErrorCode.InvalidParams,
      `Schema Validation Failed: ${parseResult.error.issues.map((i) => i.message).join(", ")}`
    );
  }

  const { sql, limit } = parseResult.data;

  try {
    // Simulated query execution
    const results = [
      { user_id: "usr_1", status: "active", revenue_cents: 9900 },
      { user_id: "usr_2", status: "churned", revenue_cents: 0 }
    ].slice(0, limit);

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(results, null, 2)
        }
      ]
    };
  } catch (err: any) {
    return {
      isError: true,
      content: [
        {
          type: "text",
          text: `Database Error: ${err.message}`
        }
      ]
    };
  }
});

// Start via stdio transport
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("[INFO] Enterprise Database MCP Server running on stdio.");
}

main().catch((err) => {
  console.error("[FATAL] Startup failed:", err);
  process.exit(1);
});
```

### 3.2 Python FastMCP Production Server
The modern Python approach utilizes `FastMCP` from the official Python SDK:

```python
"""
Enterprise Filesystem & Git Inspector MCP Server (Python FastMCP)
"""
import os
import subprocess
from mcp.server.fastmcp import FastMCP
from pydantic import BaseModel, Field

# Initialize server
mcp = FastMCP("git-code-inspector")

class GitLogArgs(BaseModel):
    max_commits: int = Field(default=5, ge=1, le=50, description="Max commits to return")
    branch: str = Field(default="main", description="Target Git branch")

@mcp.tool()
def get_git_log(max_commits: int = 5, branch: str = "main") -> str:
    """Returns the latest structured commit history for a local git repository."""
    try:
        result = subprocess.run(
            ["git", "log", f"-n{max_commits}", "--oneline", branch],
            capture_output=True,
            text=True,
            check=True
        )
        return result.stdout.strip()
    except subprocess.CalledProcessError as e:
        return f"Git CLI Error: {e.stderr.strip()}"

@mcp.resource("config://app-settings")
def get_application_settings() -> str:
    """Returns runtime application configuration settings as a static resource."""
    return '{"environment": "production", "rate_limit_rpm": 120, "telemetry_enabled": true}'

@mcp.prompt()
def code_review_prompt(pr_number: int) -> str:
    """Generates an architectural review template for an open PR."""
    return f"""You are a principal engineer conducting a code review for PR #{pr_number}.
1. Check for security vulnerabilities (injection, OWASP).
2. Validate async/await performance and memory leaks.
3. Suggest typed unit test assertions.
"""

if __name__ == "__main__":
    mcp.run()
```

---

## 4. Stage 4: Client & Host Orchestration

### 4.1 Building a Custom TypeScript MCP Client
An MCP client discovers tools from connected servers, maps them to OpenAI/Anthropic tool schemas, and dispatches calls:

```typescript
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

async function runClient() {
  const transport = new StdioClientTransport({
    command: "node",
    args: ["./dist/server.js"]
  });

  const client = new Client(
    { name: "custom-agent-orchestrator", version: "1.0.0" },
    { capabilities: {} }
  );

  await client.connect(transport);
  console.log("Connected to MCP Server!");

  // Discover available tools
  const { tools } = await client.listTools();
  console.log(`Discovered ${tools.length} tools:`, tools.map((t) => t.name));

  // Invoke a tool
  const result = await client.callTool({
    name: "execute_readonly_query",
    arguments: {
      sql: "SELECT * FROM users",
      limit: 10
    }
  });

  console.log("Tool execution output:", result.content);
  await client.close();
}

runClient().catch(console.error);
```

### 4.2 Host Configurations: Claude Desktop, Cursor, and Antigravity IDE
MCP servers are wired into host applications using standard JSON configurations:

```json
{
  "mcpServers": {
    "enterprise-db": {
      "command": "node",
      "args": ["C:/Users/manth/servers/db-mcp/dist/index.js"],
      "env": {
        "DATABASE_URL": "postgresql://readonly:secret@localhost:5432/analytics"
      }
    },
    "github-tools": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_xxxxxxxxxxxx"
      }
    }
  }
}
```

---

## 5. Stage 5: Enterprise Security, Sandboxing & Governance

### 5.1 Threat Vectors in Model-Tool Execution
Integrating LLMs directly with operational tooling introduces distinct vulnerabilities:

```mermaid
flowchart TD
    Attack1["1. Indirect Prompt Injection"] -->|Hidden in web page or DB row| LLM["LLM Host Engine"]
    LLM -->|Manipulated into invoking dangerous tool| MCP["MCP Tool: delete_database"]
    Attack2["2. Directory Traversal"] -->|Path: ../../../etc/shadow| Resource["MCP Resource Reader"]
    Attack3["3. SSRF / Network Pivot"] -->|Target: http://169.254.169.254| Fetch["MCP Tool: fetch_url"]
```

### 5.2 Sandboxing File Systems & Network Access
Always enforce canonical path resolution and strict prefix validation:

```typescript
import path from "node:path";

export function resolveSafePath(userRelativePath: string, allowedRoot: string): string {
  // Resolve absolute path
  const targetPath = path.resolve(allowedRoot, userRelativePath);
  
  // Enforce boundary jail
  if (!targetPath.startsWith(path.resolve(allowedRoot) + path.sep)) {
    throw new Error(`Security Violation: Path traversal outside sandbox boundary (${userRelativePath})`);
  }
  
  return targetPath;
}
```

---

## 6. Stage 6: Observability, Sampling & Evals

### 6.1 Reverse LLM Sampling (`sampling/createMessage`)
MCP enables an advanced capability: **Servers can request LLM completions back from the Host**:

```typescript
// Server requests an LLM completion from the host client
const response = await server.createMessage({
  messages: [
    {
      role: "user",
      content: {
        type: "text",
        text: "Summarize this SQL query execution plan and identify index misses: ..."
      }
    }
  ],
  maxTokens: 500
});
```

---

## 7. Stage 7: Staff MCP Architect Interview Handbook & Cheatsheet

### 7.1 Enterprise Production Cheatsheet

| Command / Tool | Purpose | Usage / Example |
| :--- | :--- | :--- |
| **`mcp inspector`** | Visual debugging UI for local MCP servers | `npx @modelcontextprotocol/inspector node dist/index.js` |
| **`stdio` Transport** | Local sub-process pipe communication | Best for CLI tools, local databases, desktop applications |
| **`SSE` Transport** | Remote HTTP/2 streaming communication | Best for Kubernetes microservices, cloud tools, SaaS APIs |
| **`tools/list`** | Queries server for callable function schemas | Returns JSON Schema objects for LLM function calling |
| **`resources/list`** | Queries server for readable data sources | Returns URI schemes (`postgres://`, `file://`, `s3://`) |
| **`prompts/list`** | Queries server for curated prompt templates | Reusable system prompt configurations |

### 7.2 Staff & Principal Architect Interview Q&A (40 Scenarios)

#### Q1: What fundamental problem does the Model Context Protocol solve that OpenAI Function Calling or LangChain Tools did not?
> **Answer**: Function Calling and LangChain Tools solved tool formatting for a specific library or model vendor, creating an $M \times N$ matrix where every tool had to be rewritten for every framework. MCP creates a universal protocol layer over JSON-RPC 2.0 with capability negotiation, standard transports (`stdio`/`SSE`), resources, and prompts, allowing any tool to work with any client without code changes.

#### Q2: Why is `stdout` strictly forbidden for server application logging when using the `stdio` transport?
> **Answer**: In `stdio` transport, the standard input and standard output streams form the bidirectional JSON-RPC 2.0 transport channel. If a server prints unformatted logs to `stdout`, the client's JSON parser encounters non-JSON data and throws a framing/parse error (`-32700`), terminating the connection. All application logs must be sent to `stderr`.

#### Q3: How does capability negotiation prevent protocol version mismatches?
> **Answer**: During the `initialize` handshake, the client sends its supported protocol version and client capabilities (such as whether it supports sampling or root changes). The server replies with its protocol version and capabilities (e.g. tools, resources, prompts). If versions are incompatible, connection negotiation aborts cleanly before any payload transmission.

#### Q4: How do you design an MCP server that protects against Indirect Prompt Injection?
> **Answer**: Implement a multi-layered defense: (1) Schema enforcement restricting input lengths and parameter formats; (2) Demoting resource content to untrusted data blocks in prompt templates; (3) Requiring explicit Human-In-The-Loop confirmation tokens before executing irreversible tool actions (`write`, `delete`, `execute`).

*(36 additional Staff-level architecture scenarios detailed inside repository documentation...)*

---

## 🤝 Contributing
Contributions are welcomed! Fork the repository, create a feature branch, and submit a PR conforming to the unified curriculum architecture.

## 📄 License
Released under the [MIT License](LICENSE).
