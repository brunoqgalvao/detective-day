#!/usr/bin/env node

import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function generateImage() {
  try {
    console.log('Generating image of a boat...');
    
    const response = await openai.images.generate({
      model: "gpt-image-1",
      prompt: "a beautiful sailboat on calm ocean waters at sunset, with golden light reflecting on the water",
      size: "1024x1024",
      n: 1
    });

    const imageData = response.data[0];
    
    // Save the image from base64 data
    const imageBuffer = Buffer.from(imageData.b64_json, 'base64');
    
    // Create images directory if it doesn't exist
    if (!fs.existsSync('images')) {
      fs.mkdirSync('images');
    }
    
    const filename = `boat_image_${Date.now()}.png`;
    const filepath = path.join('images', filename);
    
    fs.writeFileSync(filepath, imageBuffer);
    
    console.log(`✅ Image generated successfully!`);
    console.log(`📁 Saved to: ${path.resolve(filepath)}`);
    
    if (imageData.revised_prompt) {
      console.log(`🎨 Revised prompt: ${imageData.revised_prompt}`);
    }
    
    return filepath;
    
  } catch (error) {
    console.error('❌ Error generating image:', error.message);
    throw error;
  }
}

generateImage().catch(console.error);