import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface CaseImageConfig {
  caseName: string;
  caseId: string;
  prompt: string;
}

const caseConfigs: CaseImageConfig[] = [
  {
    caseName: 'Mansion Murder',
    caseId: 'mansion-murder',
    prompt: 'A dark, atmospheric Victorian mansion at night with warm lights glowing from windows, mysterious and foreboding, detective noir style, cinematic lighting, high detail digital art'
  },
  {
    caseName: 'Cyber Heist',
    caseId: 'cyber-heist',
    prompt: 'A high-tech server room with glowing green matrix-style code, digital crime scene, cyberpunk aesthetic, dark with neon highlights, futuristic computer terminals, cinematic digital art'
  },
  {
    caseName: 'Art Forgery',
    caseId: 'art-forgery',
    prompt: 'An elegant art gallery with dramatic lighting, paintings on walls, crime scene tape, mysterious atmosphere, film noir style, sophisticated and dark, high detail digital art'
  },
  {
    caseName: 'Train Mystery',
    caseId: 'train-mystery',
    prompt: 'A vintage luxury train at night speeding through darkness, Orient Express style, mysterious fog, warm lights from windows, cinematic atmosphere, high detail digital art'
  },
  {
    caseName: 'Cold Case',
    caseId: 'cold-case',
    prompt: 'A dusty police evidence room with old case files, vintage photographs scattered on desk, moody lighting, noir detective atmosphere, yellowed documents, cinematic composition'
  },
  {
    caseName: 'Ghost Ship',
    caseId: 'ghost-ship',
    prompt: 'An abandoned luxury yacht drifting on dark ocean waters, eerie fog, moonlight reflection, mysterious and haunting atmosphere, cinematic maritime scene, high detail digital art'
  }
];

async function generateCaseImage(config: CaseImageConfig) {
  try {
    console.log(`Generating image for ${config.caseName}...`);
    
    const response = await openai.images.generate({
      model: "gpt-image-1",
      prompt: config.prompt,
      size: "1024x1024",
      n: 1
    });

    const imageData = response.data[0];
    
    if (!imageData.b64_json) {
      throw new Error('No base64 image data received');
    }

    const imageBuffer = Buffer.from(imageData.b64_json, 'base64');

    // Create output directory if it doesn't exist
    const outputDir = path.join(__dirname, '..', '..', '..', 'frontend', 'public', 'images', 'cases');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const filename = `${config.caseId}.png`;
    const filepath = path.join(outputDir, filename);
    
    fs.writeFileSync(filepath, imageBuffer);
    console.log(`✅ Image saved: ${filepath}`);
    
    return filepath;
  } catch (error) {
    console.error(`❌ Failed to generate image for ${config.caseName}:`, error);
    throw error;
  }
}

async function generateAllImages() {
  console.log('Starting image generation for all cases...\n');
  
  for (const config of caseConfigs) {
    try {
      await generateCaseImage(config);
      // Add delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 2000));
    } catch (error) {
      console.error(`Skipping ${config.caseName} due to error`);
    }
  }
  
  console.log('\n✨ Image generation complete!');
}

async function generateSingleImage(caseId: string) {
  const config = caseConfigs.find(c => c.caseId === caseId);
  if (!config) {
    console.error(`❌ No configuration found for case ID: ${caseId}`);
    console.log('Available case IDs:', caseConfigs.map(c => c.caseId).join(', '));
    return;
  }
  
  await generateCaseImage(config);
}

// Check command line arguments
const args = process.argv.slice(2);

if (args.length === 0) {
  // Generate all images
  generateAllImages().catch(console.error);
} else if (args[0] === '--case' && args[1]) {
  // Generate single case image
  generateSingleImage(args[1]).catch(console.error);
} else if (args[0] === '--help') {
  console.log(`
Usage:
  npm run generate-images           Generate all case images
  npm run generate-images -- --case <case-id>   Generate specific case image
  npm run generate-images -- --help            Show this help message

Available case IDs:
${caseConfigs.map(c => `  - ${c.caseId}: ${c.caseName}`).join('\n')}
  `);
} else {
  console.error('Invalid arguments. Use --help for usage information.');
}

export { generateCaseImage, generateAllImages, caseConfigs };