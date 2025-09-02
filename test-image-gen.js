#!/usr/bin/env node

import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
import { spawn } from 'child_process';

async function main() {
  // Spawn the MCP server process
  const mcpProcess = spawn('node', [
    '/Users/brunogalvao/Documents/dev-bruno/detective-day/gpt-image-1-mcp-server/build/index.js'
  ], {
    env: {
      ...process.env,
      OPENAI_API_KEY: process.env.OPENAI_API_KEY
    }
  });

  // Create transport
  const transport = new StdioClientTransport({
    command: 'node',
    args: ['/Users/brunogalvao/Documents/dev-bruno/detective-day/gpt-image-1-mcp-server/build/index.js'],
    env: process.env
  });

  // Create client
  const client = new Client({
    name: 'test-client',
    version: '1.0.0'
  }, {
    capabilities: {}
  });

  // Connect
  await client.connect(transport);

  console.log('Connected to MCP server');

  // List available tools
  const tools = await client.listTools();
  console.log('Available tools:', tools.tools.map(t => t.name));

  // Call the image generation tool
  console.log('\nGenerating image of a boat...');
  const result = await client.callTool('gpt_image_1_generate', {
    prompt: 'a beautiful sailboat on calm ocean waters at sunset'
  });

  console.log('Result:', result);

  // Close connection
  await client.close();
  process.exit(0);
}

main().catch(console.error);