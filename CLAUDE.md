# Claude Instructions

## Image Generation

This project has GPT-Image-1 image generation capabilities set up. To generate images:

### Using MCP Server (Preferred)
The project includes a configured MCP server for image generation:
- Server location: `/Users/brunogalvao/Documents/dev-bruno/detective-day/gpt-image-1-mcp-server/`
- Configuration: `.mcp.json`
- Available functions:
  - `mcp__gpt-image-1__gpt_image_1_generate`
  - `mcp__gpt-image-1__gpt_image_1_generate_with_variations`

### Direct OpenAI API (Alternative)
If MCP tools aren't working, use the direct approach:

```javascript
import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const response = await openai.images.generate({
  model: "gpt-image-1",
  prompt: "your prompt here",
  size: "1024x1024",
  n: 1
});

const imageData = response.data[0];
const imageBuffer = Buffer.from(imageData.b64_json, 'base64');

// Create images directory if it doesn't exist
if (!fs.existsSync('images')) {
  fs.mkdirSync('images');
}

const filename = `generated_image_${Date.now()}.png`;
const filepath = path.join('images', filename);
fs.writeFileSync(filepath, imageBuffer);
```

### Important Notes
- GPT-Image-1 returns base64 encoded images (not URLs like DALL-E)
- Don't use `response_format` parameter - it's not supported by GPT-Image-1
- Images are automatically saved to the `images/` directory
- Requires `OPENAI_API_KEY` environment variable to be set

### Test Setup
- Run `npm run test` in the MCP server directory to verify API connectivity
- The server should show "GPT-Image-1 model is available!" when properly configured