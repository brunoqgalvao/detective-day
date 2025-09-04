#!/usr/bin/env node

const OpenAI = require('openai');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function generateImage(prompt) {
  try {
    console.log('🎨 Generating image...');
    console.log('Prompt:', prompt);
    
    const response = await openai.images.generate({
      model: "gpt-image-1",
      prompt: prompt,
      size: "1024x1024",
      n: 1
    });

    // GPT-Image-1 returns base64 encoded images
    const imageData = response.data[0].b64_json;
    
    if (!imageData) {
      throw new Error('No image data received');
    }

    // Convert base64 to buffer
    const imageBuffer = Buffer.from(imageData, 'base64');
    
    // Create images directory if it doesn't exist
    const imagesDir = path.join(__dirname, 'generated-images');
    if (!fs.existsSync(imagesDir)) {
      fs.mkdirSync(imagesDir);
    }
    
    // Generate filename with timestamp
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `image_${timestamp}.png`;
    const filepath = path.join(imagesDir, filename);
    
    // Save the image
    fs.writeFileSync(filepath, imageBuffer);
    
    console.log('✅ Image generated successfully!');
    console.log('📍 Saved to:', filepath);
    
    return filepath;
  } catch (error) {
    console.error('❌ Error generating image:', error.message);
    process.exit(1);
  }
}

// Get prompt from command line
const prompt = process.argv.slice(2).join(' ');

if (!prompt) {
  console.log(`
Usage: node generate-image.js <prompt>

Example:
  node generate-image.js "A cyberpunk server room with green matrix code"
  `);
  process.exit(0);
}

// Check for API key
if (!process.env.OPENAI_API_KEY) {
  console.error('❌ Error: OPENAI_API_KEY not found in environment variables');
  console.log('Please set your OpenAI API key in .env file');
  process.exit(1);
}

// Generate the image
generateImage(prompt);