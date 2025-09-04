import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface ImageConfig {
  filename: string;
  prompt: string;
  outputDir: string;
}

// Cyber Heist Case Images
const cyberHeistImages: ImageConfig[] = [
  // Character Portraits - Cyberpunk/Tech style
  {
    filename: 'alex_chen.png',
    prompt: 'Portrait of an Asian man in his mid-30s, professional security analyst, wearing tech company attire, dark background with subtle green matrix code, serious expression, cyberpunk aesthetic, digital art style',
    outputDir: 'characters'
  },
  {
    filename: 'sarah_kim.png',
    prompt: 'Portrait of a young Asian woman, 27 years old, junior developer, wearing casual tech hoodie, stressed expression, dark circles under eyes, neon lighting, cyberpunk atmosphere, digital art',
    outputDir: 'characters'
  },
  {
    filename: 'david_morrison.png',
    prompt: 'Portrait of a 45-year-old Caucasian man, CFO in expensive suit, gambling addiction visible in tired eyes, corporate office background with monitors, noir lighting, digital art style',
    outputDir: 'characters'
  },
  {
    filename: 'marcus_taylor.png',
    prompt: 'Portrait of a 52-year-old business executive, CEO, confident but worried expression, expensive suit, tech company office background, dramatic lighting, professional digital art',
    outputDir: 'characters'
  },
  {
    filename: 'rachel_wong.png',
    prompt: 'Portrait of an Asian woman, late 30s, compliance officer, professional attire, serious demeanor, office background with security monitors, corporate lighting, digital art style',
    outputDir: 'characters'
  },
  {
    filename: 'james_rivera.png',
    prompt: 'Portrait of a Hispanic man, early 40s, former CTO, casual business attire, intelligent eyes, slight stubble, tech background, moody lighting suggesting outsider status, digital art',
    outputDir: 'characters'
  },
  {
    filename: 'nina_patel.png',
    prompt: 'Portrait of an Indian woman, mid-30s, VP of Operations, professional sari or business suit, confident expression, corporate office background, warm lighting, digital art style',
    outputDir: 'characters'
  },
  {
    filename: 'oliver_frost.png',
    prompt: 'Portrait of a Caucasian man, mid-40s, security consultant, sharp features, calculating eyes, dark suit, mysterious background with security elements, noir lighting, digital art',
    outputDir: 'characters'
  },
  // Crime Scene Images - Tech/Cyber theme
  {
    filename: 'crime_scene_overview.png',
    prompt: 'High-tech server room at night, rows of blinking servers, emergency red lighting, computer monitors showing error messages, cyber crime scene, atmospheric fog, cyberpunk aesthetic',
    outputDir: 'crime-scene'
  },
  {
    filename: 'bank_exterior.png',
    prompt: 'Modern glass skyscraper at night, SecureBank headquarters, financial district, neon lights reflecting on wet streets, cyberpunk cityscape, dramatic atmosphere, digital art',
    outputDir: 'crime-scene'
  },
  {
    filename: 'server_room_detail.png',
    prompt: 'Close-up of server racks with blinking lights, ethernet cables, one terminal showing hack in progress, green matrix-style code on screens, dark atmosphere with neon highlights',
    outputDir: 'crime-scene'
  },
  {
    filename: 'workstation_evidence.png',
    prompt: 'Computer workstation with multiple monitors showing code, financial data, and security logs, evidence of cyber attack, dark office setting, dramatic lighting on keyboard and screens',
    outputDir: 'crime-scene'
  },
  {
    filename: 'vpn_logs_evidence.png',
    prompt: 'Computer screen showing detailed VPN connection logs with timestamps and IP addresses, green text on black background, terminal window, evidence markers highlighting suspicious entries',
    outputDir: 'crime-scene'
  },
  {
    filename: 'crypto_wallets_evidence.png',
    prompt: 'Computer display showing blockchain transaction flow diagram, cryptocurrency wallet addresses, money trail visualization, dark theme with neon green highlights, digital forensics style',
    outputDir: 'crime-scene'
  },
  {
    filename: 'keylogger_evidence.png',
    prompt: 'Close-up of USB keylogger device next to keyboard, evidence bag visible, forensic ruler for scale, dramatic lighting, tech crime scene photography style',
    outputDir: 'crime-scene'
  },
  {
    filename: 'security_footage_evidence.png',
    prompt: 'Security monitor showing CCTV footage grid, multiple camera angles of office building, timestamp visible, one screen showing static, surveillance room atmosphere',
    outputDir: 'crime-scene'
  }
];

// Art Forgery Case Images
const artForgeryImages: ImageConfig[] = [
  // Character Portraits - Art/Gallery style
  {
    filename: 'claudia_beaumont.png',
    prompt: 'Portrait of an elegant woman in her early 40s, art authenticator, sophisticated appearance, wearing designer glasses and pearl necklace, gallery background, confident but secretive expression, oil painting style digital art',
    outputDir: 'characters'
  },
  {
    filename: 'lorenzo_romano.png',
    prompt: 'Portrait of a 51-year-old Italian artist, paint-stained fingers, bohemian clothing, tired eyes of struggling artist, studio background with canvases, warm artistic lighting, painterly digital art style',
    outputDir: 'characters'
  },
  {
    filename: 'sebastian_cross.png',
    prompt: 'Portrait of a 46-year-old rival gallery owner, sharp business suit, calculating expression, modern gallery background, competitive demeanor, dramatic shadow lighting, sophisticated digital art',
    outputDir: 'characters'
  },
  {
    filename: 'isabelle_laurent.png',
    prompt: 'Portrait of a beautiful young French woman, 29 years old, rising artist, bohemian chic outfit, emotional eyes, artist studio background with paintings, soft romantic lighting, impressionist-inspired digital art',
    outputDir: 'characters'
  },
  {
    filename: 'detective_chen.png',
    prompt: 'Portrait of an Asian-American detective, 40 years old, specialized in art crimes, wearing detective badge and suit, notebook in hand, serious investigative expression, noir lighting, digital art',
    outputDir: 'characters'
  },
  {
    filename: 'helena_westbrook.png',
    prompt: 'Portrait of a wealthy woman in her mid-50s, art collector, expensive jewelry and haute couture dress, charity gala appearance, refined features, luxury background, elegant lighting, high society digital art',
    outputDir: 'characters'
  },
  {
    filename: 'mikhail_volkov.png',
    prompt: 'Portrait of a powerful Russian oligarch, late 40s, expensive suit, stern expression, intimidating presence, yacht or luxury setting in background, dramatic chiaroscuro lighting, oil painting style digital art',
    outputDir: 'characters'
  },
  // Crime Scene Images - Art Gallery theme
  {
    filename: 'crime_scene_overview.png',
    prompt: 'Elegant art gallery at night, body outline on polished floor near large painting, wine glass nearby, dramatic spotlighting on paintings, crime scene tape, noir atmosphere, high detail digital art',
    outputDir: 'crime-scene'
  },
  {
    filename: 'gallery_exterior.png',
    prompt: 'Upscale art gallery facade at night, "Monet Gallery" sign, arts district setting, warm light spilling from windows, wet streets reflecting lights, film noir atmosphere, architectural digital art',
    outputDir: 'crime-scene'
  },
  {
    filename: 'azure_dream_painting.png',
    prompt: 'Large abstract painting "The Azure Dream" in ornate gold frame, vibrant blues and swirls, museum-quality artwork, gallery wall with perfect lighting, worth millions, masterpiece digital art',
    outputDir: 'crime-scene'
  },
  {
    filename: 'gallery_interior.png',
    prompt: 'Luxurious gallery interior, white walls with spotlit paintings, polished marble floor, modern sculpture displays, sophisticated atmosphere, evening lighting, high-end art space',
    outputDir: 'crime-scene'
  },
  {
    filename: 'poisoned_wine_evidence.png',
    prompt: 'Close-up of elegant wine glass with red wine residue, evidence marker next to it, forensic lighting, gallery floor visible, dramatic shadows, crime scene photography style',
    outputDir: 'crime-scene'
  },
  {
    filename: 'paint_thinner_evidence.png',
    prompt: 'Industrial paint thinner bottle with warning labels, found in restoration room, evidence tag attached, artist supplies nearby, dramatic lighting highlighting toxic warning, forensic photo style',
    outputDir: 'crime-scene'
  },
  {
    filename: 'auth_certificates_evidence.png',
    prompt: 'Authentication certificates spread on desk, magnifying glass examining signatures, official stamps visible, some marked as suspicious, dramatic overhead lighting, document photography style',
    outputDir: 'crime-scene'
  },
  {
    filename: 'threat_messages_evidence.png',
    prompt: 'Computer screen showing threatening email, "You sold me fakes" visible, sender name highlighted, dark office setting, screen glow illuminating keyboard, digital evidence style',
    outputDir: 'crime-scene'
  },
  {
    filename: 'restoration_room.png',
    prompt: 'Art restoration room with easels, paint supplies, canvases, chemical bottles including thinners, work in progress paintings, artist tools, moody workshop lighting, detailed environment art',
    outputDir: 'crime-scene'
  }
];

async function generateImage(config: ImageConfig): Promise<void> {
  try {
    console.log(`Generating: ${config.filename}...`);
    
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
    const outputPath = path.join(__dirname, '..', '..', '..', 'frontend', 'public', 'images', config.outputDir);
    if (!fs.existsSync(outputPath)) {
      fs.mkdirSync(outputPath, { recursive: true });
    }

    const filepath = path.join(outputPath, config.filename);
    fs.writeFileSync(filepath, imageBuffer);
    
    console.log(`✅ Saved: ${config.filename}`);
  } catch (error) {
    console.error(`❌ Failed: ${config.filename} - ${error}`);
    throw error;
  }
}

async function generateCaseImages(caseImages: ImageConfig[], caseName: string): Promise<void> {
  console.log(`\n🎨 Generating images for ${caseName}...\n`);
  
  let successCount = 0;
  let failCount = 0;
  
  for (const config of caseImages) {
    try {
      await generateImage(config);
      successCount++;
      // Add delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 3000));
    } catch (error) {
      console.error(`Skipping ${config.filename} due to error`);
      failCount++;
    }
  }
  
  console.log(`\n${caseName} Complete: ${successCount} succeeded, ${failCount} failed\n`);
}

async function generateAllImages(): Promise<void> {
  console.log('🚀 Starting batch image generation for Detective Day cases\n');
  console.log('This will generate approximately 34 images and may take 5-10 minutes.\n');
  
  // Generate Cyber Heist images
  await generateCaseImages(cyberHeistImages, 'Cyber Heist Case');
  
  // Generate Art Forgery images
  await generateCaseImages(artForgeryImages, 'Art Forgery Case');
  
  console.log('\n✨ All image generation complete!');
  console.log('Images have been saved to frontend/public/images/');
}

// Parse command line arguments
const args = process.argv.slice(2);

if (args[0] === '--case') {
  if (args[1] === 'cyber-heist') {
    generateCaseImages(cyberHeistImages, 'Cyber Heist Case').catch(console.error);
  } else if (args[1] === 'art-forgery') {
    generateCaseImages(artForgeryImages, 'Art Forgery Case').catch(console.error);
  } else {
    console.error('Invalid case. Use: cyber-heist or art-forgery');
  }
} else if (args[0] === '--help') {
  console.log(`
Usage:
  npm run generate-all-images              Generate all case images
  npm run generate-all-images -- --case cyber-heist    Generate Cyber Heist images
  npm run generate-all-images -- --case art-forgery    Generate Art Forgery images
  npm run generate-all-images -- --help    Show this help
  `);
} else {
  // Generate all images
  generateAllImages().catch(console.error);
}

export { generateImage, cyberHeistImages, artForgeryImages };