#!/usr/bin/env node

import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Character data with detailed descriptions for image generation
const characters = [
  {
    id: "sophia",
    name: "Sophia Westwood",
    age: 45,
    role: "Wife",
    description: "Former actress, 45 years old, elegant and composed but with a bitter expression. Well-dressed in an expensive evening gown, sophisticated makeup, blonde hair styled in an updo. She has piercing eyes that suggest hidden resentment. Standing in an opulent manor setting."
  },
  {
    id: "marcus", 
    name: "Marcus Westwood",
    age: 26,
    role: "Son",
    description: "26-year-old man with nervous energy, dark hair, wearing a disheveled expensive suit. He has worried eyes and fidgeting hands, suggesting anxiety and guilt. Lean build, pale complexion, standing in a garden or outdoor manor setting at twilight."
  },
  {
    id: "elena",
    name: "Elena Rodriguez",
    age: 28, 
    role: "Personal Assistant",
    description: "28-year-old professional Latina woman with long dark hair and a concerned expression. Wearing a modest but well-tailored business outfit. She appears emotional and protective, with intelligent eyes. Standing in an elegant office or study setting."
  },
  {
    id: "james",
    name: "James Crawford", 
    age: 48,
    role: "Business Partner",
    description: "48-year-old businessman with graying temples and a smooth, professional demeanor. Wearing an expensive suit and tie. He has calculating eyes but shows slight cracks in his composure. Distinguished looking with a slight smile that doesn't reach his eyes. In a corporate or manor setting."
  },
  {
    id: "thomas",
    name: "Thomas Chen",
    age: 55,
    role: "Investor", 
    description: "55-year-old Asian businessman with a calm, calculating expression. Wearing a dark expensive suit with subtle luxury details. He has intelligent, cold eyes and maintains perfect composure. Standing in an upscale billiards room or manor setting."
  },
  {
    id: "margaret",
    name: "Margaret Shaw",
    age: 49,
    role: "Sister",
    description: "49-year-old woman with artistic sensibilities, Victor's sister. She has a prideful but defensive posture, wearing bohemian-style clothing that suggests artistic tastes but financial struggles. Auburn hair, intelligent but frustrated eyes. Standing in an art gallery or kitchen setting."
  },
  {
    id: "robert",
    name: "Robert Hutchinson", 
    age: 62,
    role: "Butler",
    description: "62-year-old distinguished butler with 25 years of service. Wearing a formal black butler's uniform with white gloves. He has proper posture but subtle hints of resentment in his eyes. Gray hair, weathered hands, standing in the grand foyer or dining room of a manor."
  },
  {
    id: "isabella",
    name: "Isabella Westwood",
    age: 23,
    role: "Daughter", 
    description: "23-year-old artistic young woman with a rebellious spirit. She has paint-stained fingers and bohemian clothing style. Dark hair with artistic flair, expressive eyes that show both grief and defiance. Standing in an art studio or bedroom with paintings visible."
  }
];

async function generateCharacterImage(character) {
  try {
    console.log(`🎨 Generating realistic portrait for ${character.name}...`);
    
    const prompt = `Professional headshot portrait photograph of ${character.description}. Photorealistic, high quality, dramatic lighting, detailed facial features, cinematic photography, professional portrait style, 8k resolution`;

    const response = await openai.images.generate({
      model: "gpt-image-1",
      prompt: prompt,
      size: "1024x1024",
      n: 1
    });

    const imageData = response.data[0];
    const imageBuffer = Buffer.from(imageData.b64_json, 'base64');
    
    // Create characters directory if it doesn't exist
    const charactersDir = 'images/characters';
    if (!fs.existsSync('images')) {
      fs.mkdirSync('images');
    }
    if (!fs.existsSync(charactersDir)) {
      fs.mkdirSync(charactersDir);
    }
    
    const filename = `${character.id}.png`;
    const filepath = path.join(charactersDir, filename);
    
    fs.writeFileSync(filepath, imageBuffer);
    
    console.log(`✅ Generated ${character.name} -> ${filepath}`);
    
    if (imageData.revised_prompt) {
      console.log(`   Revised prompt: ${imageData.revised_prompt}`);
    }
    
    return filepath;
    
  } catch (error) {
    console.error(`❌ Error generating image for ${character.name}:`, error.message);
    return null;
  }
}

async function generateAllCharacterImages() {
  console.log('🚀 Starting character image generation for Detective Day murder mystery...\n');
  
  const results = [];
  
  for (const character of characters) {
    const filepath = await generateCharacterImage(character);
    results.push({
      character: character.name,
      id: character.id,
      filepath: filepath,
      success: filepath !== null
    });
    
    // Small delay between requests to be respectful to the API
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  console.log('\n📊 Generation Summary:');
  console.log(`Total characters: ${characters.length}`);
  console.log(`Successful: ${results.filter(r => r.success).length}`);
  console.log(`Failed: ${results.filter(r => !r.success).length}`);
  
  if (results.some(r => !r.success)) {
    console.log('\n❌ Failed generations:');
    results.filter(r => !r.success).forEach(r => {
      console.log(`  - ${r.character}`);
    });
  }
  
  return results;
}

// Run the generation
generateAllCharacterImages().catch(console.error);