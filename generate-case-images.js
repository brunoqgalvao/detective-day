#!/usr/bin/env node

const OpenAI = require('openai');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Image configurations for both cases
const imageConfigs = {
  'cyber-heist': {
    characters: [
      { id: 'alex_chen', prompt: 'Portrait of an Asian man in his mid-30s, professional security analyst, wearing tech company attire, dark background with subtle green matrix code, serious expression, cyberpunk aesthetic, digital art style' },
      { id: 'sarah_kim', prompt: 'Portrait of a young Asian woman, 27 years old, junior developer, wearing casual tech hoodie, stressed expression, dark circles under eyes, neon lighting, cyberpunk atmosphere, digital art' },
      { id: 'david_morrison', prompt: 'Portrait of a 45-year-old Caucasian man, CFO in expensive suit, gambling addiction visible in tired eyes, corporate office background with monitors, noir lighting, digital art style' },
      { id: 'marcus_taylor', prompt: 'Portrait of a 52-year-old business executive, CEO, confident but worried expression, expensive suit, tech company office background, dramatic lighting, professional digital art' },
      { id: 'rachel_wong', prompt: 'Portrait of an Asian woman, late 30s, compliance officer, professional attire, serious demeanor, office background with security monitors, corporate lighting, digital art style' },
      { id: 'james_rivera', prompt: 'Portrait of a Hispanic man, early 40s, former CTO, casual business attire, intelligent eyes, slight stubble, tech background, moody lighting suggesting outsider status, digital art' },
      { id: 'nina_patel', prompt: 'Portrait of an Indian woman, mid-30s, VP of Operations, professional sari or business suit, confident expression, corporate office background, warm lighting, digital art style' },
      { id: 'oliver_frost', prompt: 'Portrait of a Caucasian man, mid-40s, security consultant, sharp features, calculating eyes, dark suit, mysterious background with security elements, noir lighting, digital art' }
    ],
    crimeScenes: [
      { id: 'cyber_crime_scene', prompt: 'High-tech server room at night, rows of blinking servers, emergency red lighting, computer monitors showing error messages, cyber crime scene, atmospheric fog, cyberpunk aesthetic' },
      { id: 'bank_exterior', prompt: 'Modern glass skyscraper at night, SecureBank headquarters, financial district, neon lights reflecting on wet streets, cyberpunk cityscape, dramatic atmosphere, digital art' },
      { id: 'server_room_detail', prompt: 'Close-up of server racks with blinking lights, ethernet cables, one terminal showing hack in progress, green matrix-style code on screens, dark atmosphere with neon highlights' },
      { id: 'hacker_workstation', prompt: 'Computer workstation with multiple monitors showing code, financial data, and security logs, evidence of cyber attack, dark office setting, dramatic lighting on keyboard and screens' },
      { id: 'vpn_logs_evidence', prompt: 'Computer screen showing detailed VPN connection logs with timestamps and IP addresses, green text on black background, terminal window, evidence markers highlighting suspicious entries' },
      { id: 'crypto_wallets_evidence', prompt: 'Computer display showing blockchain transaction flow diagram, cryptocurrency wallet addresses, money trail visualization, dark theme with neon green highlights, digital forensics style' }
    ]
  },
  'art-forgery': {
    characters: [
      { id: 'claudia_beaumont', prompt: 'Portrait of an elegant woman in her early 40s, art authenticator, sophisticated appearance, wearing designer glasses and pearl necklace, gallery background, confident but secretive expression, oil painting style digital art' },
      { id: 'lorenzo_romano', prompt: 'Portrait of a 51-year-old Italian artist, paint-stained fingers, bohemian clothing, tired eyes of struggling artist, studio background with canvases, warm artistic lighting, painterly digital art style' },
      { id: 'sebastian_cross', prompt: 'Portrait of a 46-year-old rival gallery owner, sharp business suit, calculating expression, modern gallery background, competitive demeanor, dramatic shadow lighting, sophisticated digital art' },
      { id: 'isabelle_laurent', prompt: 'Portrait of a beautiful young French woman, 29 years old, rising artist, bohemian chic outfit, emotional eyes, artist studio background with paintings, soft romantic lighting, impressionist-inspired digital art' },
      { id: 'detective_chen', prompt: 'Portrait of an Asian-American detective, 40 years old, specialized in art crimes, wearing detective badge and suit, notebook in hand, serious investigative expression, noir lighting, digital art' },
      { id: 'helena_westbrook', prompt: 'Portrait of a wealthy woman in her mid-50s, art collector, expensive jewelry and haute couture dress, charity gala appearance, refined features, luxury background, elegant lighting, high society digital art' },
      { id: 'mikhail_volkov', prompt: 'Portrait of a powerful Russian oligarch, late 40s, expensive suit, stern expression, intimidating presence, yacht or luxury setting in background, dramatic chiaroscuro lighting, oil painting style digital art' }
    ],
    crimeScenes: [
      { id: 'gallery_crime_scene', prompt: 'Elegant art gallery at night, body outline on polished floor near large painting, wine glass nearby, dramatic spotlighting on paintings, crime scene tape, noir atmosphere, high detail digital art' },
      { id: 'gallery_exterior', prompt: 'Upscale art gallery facade at night, "Monet Gallery" sign, arts district setting, warm light spilling from windows, wet streets reflecting lights, film noir atmosphere, architectural digital art' },
      { id: 'azure_dream_painting', prompt: 'Large abstract painting "The Azure Dream" in ornate gold frame, vibrant blues and swirls, museum-quality artwork, gallery wall with perfect lighting, worth millions, masterpiece digital art' },
      { id: 'restoration_room', prompt: 'Art restoration room with easels, paint supplies, canvases, chemical bottles including thinners, work in progress paintings, artist tools, moody workshop lighting, detailed environment art' },
      { id: 'poisoned_wine_evidence', prompt: 'Close-up of elegant wine glass with red wine residue, evidence marker next to it, forensic lighting, gallery floor visible, dramatic shadows, crime scene photography style' },
      { id: 'auth_certificates_evidence', prompt: 'Authentication certificates spread on desk, magnifying glass examining signatures, official stamps visible, some marked as suspicious, dramatic overhead lighting, document photography style' }
    ]
  }
};

async function generateImage(prompt, filename) {
  try {
    console.log(`🎨 Generating: ${filename}`);
    
    const response = await openai.images.generate({
      model: "gpt-image-1",
      prompt: prompt,
      size: "1024x1024",
      n: 1
    });

    const imageData = response.data[0].b64_json;
    if (!imageData) {
      throw new Error('No image data received');
    }

    const imageBuffer = Buffer.from(imageData, 'base64');
    return { filename, buffer: imageBuffer, success: true };
  } catch (error) {
    console.error(`❌ Failed: ${filename} - ${error.message}`);
    return { filename, success: false, error: error.message };
  }
}

async function generateCaseImages(caseName) {
  const caseConfig = imageConfigs[caseName];
  if (!caseConfig) {
    console.error(`Unknown case: ${caseName}`);
    return;
  }

  console.log(`\n📦 Generating images for ${caseName.toUpperCase()} case\n`);
  
  const results = [];
  
  // Generate character portraits
  console.log('👥 Generating character portraits...\n');
  for (const char of caseConfig.characters) {
    const result = await generateImage(char.prompt, `${char.id}.png`);
    if (result.success) {
      const outputPath = path.join(__dirname, 'frontend', 'public', 'images', 'characters', result.filename);
      fs.writeFileSync(outputPath, result.buffer);
      console.log(`   ✅ Saved to: frontend/public/images/characters/${result.filename}`);
    }
    results.push(result);
    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  
  // Generate crime scene images
  console.log('\n🔍 Generating crime scene images...\n');
  for (const scene of caseConfig.crimeScenes) {
    const filename = scene.id.endsWith('_evidence') ? `${scene.id}.png` : `${scene.id}.png`;
    const result = await generateImage(scene.prompt, filename);
    if (result.success) {
      const outputPath = path.join(__dirname, 'frontend', 'public', 'images', 'crime-scene', result.filename);
      fs.writeFileSync(outputPath, result.buffer);
      console.log(`   ✅ Saved to: frontend/public/images/crime-scene/${result.filename}`);
    }
    results.push(result);
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  
  // Summary
  const successful = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;
  
  console.log(`\n📊 ${caseName.toUpperCase()} Summary: ${successful} succeeded, ${failed} failed\n`);
  
  if (failed > 0) {
    console.log('Failed images:');
    results.filter(r => !r.success).forEach(r => {
      console.log(`  - ${r.filename}: ${r.error}`);
    });
  }
}

async function generateAllCases() {
  console.log('🚀 Starting image generation for all cases\n');
  console.log('This will generate approximately 30 images and may take 5-10 minutes.\n');
  
  // Ensure directories exist
  const dirs = [
    'frontend/public/images/characters',
    'frontend/public/images/crime-scene'
  ];
  
  dirs.forEach(dir => {
    const fullPath = path.join(__dirname, dir);
    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath, { recursive: true });
    }
  });
  
  // Generate for each case
  await generateCaseImages('cyber-heist');
  console.log('\n' + '='.repeat(60) + '\n');
  await generateCaseImages('art-forgery');
  
  console.log('\n✨ All image generation complete!');
  console.log('Images have been saved to frontend/public/images/');
}

// Parse command line arguments
const args = process.argv.slice(2);

if (args[0] === 'cyber-heist') {
  generateCaseImages('cyber-heist').catch(console.error);
} else if (args[0] === 'art-forgery') {
  generateCaseImages('art-forgery').catch(console.error);
} else if (args[0] === '--help') {
  console.log(`
Usage:
  node generate-case-images.js              Generate all case images
  node generate-case-images.js cyber-heist  Generate Cyber Heist images only
  node generate-case-images.js art-forgery  Generate Art Forgery images only
  node generate-case-images.js --help       Show this help
  `);
} else {
  // Generate all by default
  generateAllCases().catch(console.error);
}