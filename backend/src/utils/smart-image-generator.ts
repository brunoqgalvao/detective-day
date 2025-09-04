import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface CaseData {
  id: string;
  title: string;
  characters: Array<{ id: string; name: string; role: string; age: number }>;
  evidence: Array<{ id: string; name: string; description: string }>;
  victim?: any;
}

interface ImageRequirement {
  path: string;
  exists: boolean;
  type: 'character' | 'crime-scene' | 'evidence' | 'case-thumbnail';
  id: string;
  prompt?: string;
}

class SmartImageGenerator {
  private frontendImagesPath: string;
  private casesPath: string;

  constructor() {
    this.frontendImagesPath = path.join(__dirname, '..', '..', '..', 'frontend', 'public', 'images');
    this.casesPath = path.join(__dirname, '..', 'cases');
  }

  // Analyze which images are missing for a case
  async analyzeMissingImages(caseId: string): Promise<ImageRequirement[]> {
    const caseDataPath = path.join(this.casesPath, caseId, 'case.json');
    
    if (!fs.existsSync(caseDataPath)) {
      console.error(`Case ${caseId} not found`);
      return [];
    }

    const caseData: CaseData = JSON.parse(fs.readFileSync(caseDataPath, 'utf-8'));
    const requirements: ImageRequirement[] = [];

    // Check case thumbnail
    const thumbnailPath = path.join(this.frontendImagesPath, 'cases', `${caseId}.png`);
    requirements.push({
      path: thumbnailPath,
      exists: fs.existsSync(thumbnailPath),
      type: 'case-thumbnail',
      id: caseId,
      prompt: this.generateCaseThumbnailPrompt(caseData)
    });

    // Check character portraits
    for (const character of caseData.characters) {
      const charPath = path.join(this.frontendImagesPath, 'characters', `${character.id}.png`);
      requirements.push({
        path: charPath,
        exists: fs.existsSync(charPath),
        type: 'character',
        id: character.id,
        prompt: this.generateCharacterPrompt(character, caseId)
      });
    }

    // Check crime scene images
    const crimeSceneImages = this.getCrimeSceneRequirements(caseId, caseData);
    for (const img of crimeSceneImages) {
      const scenePath = path.join(this.frontendImagesPath, 'crime-scene', img.filename);
      requirements.push({
        path: scenePath,
        exists: fs.existsSync(scenePath),
        type: 'crime-scene',
        id: img.id,
        prompt: img.prompt
      });
    }

    // Check evidence images
    for (const evidence of caseData.evidence) {
      if (this.shouldHaveImage(evidence)) {
        const evidencePath = path.join(this.frontendImagesPath, 'crime-scene', `${evidence.id}_evidence.png`);
        requirements.push({
          path: evidencePath,
          exists: fs.existsSync(evidencePath),
          type: 'evidence',
          id: evidence.id,
          prompt: this.generateEvidencePrompt(evidence, caseId)
        });
      }
    }

    return requirements;
  }

  private generateCaseThumbnailPrompt(caseData: CaseData): string {
    const prompts = {
      'cyber-heist': 'High-tech server room with glowing green matrix code, dark cyberpunk atmosphere, digital crime scene, neon highlights, cinematic digital art',
      'art-forgery': 'Elegant art gallery at night with dramatic lighting, paintings on walls, mysterious atmosphere, film noir style, sophisticated and dark, high detail digital art'
    };
    return prompts[caseData.id] || 'Crime scene investigation, mysterious atmosphere, detective noir style, cinematic lighting';
  }

  private generateCharacterPrompt(character: any, caseId: string): string {
    const style = caseId === 'cyber-heist' ? 'cyberpunk tech atmosphere, digital art' : 
                  caseId === 'art-forgery' ? 'elegant art gallery setting, sophisticated digital art' :
                  'detective noir style, dramatic lighting, digital art';
    
    return `Portrait of ${character.name}, ${character.age} years old, ${character.role}, professional appearance matching their role, ${style}`;
  }

  private getCrimeSceneRequirements(caseId: string, caseData: CaseData): Array<{id: string, filename: string, prompt: string}> {
    if (caseId === 'cyber-heist') {
      return [
        {
          id: 'overview',
          filename: 'cyber_crime_scene_overview.png',
          prompt: 'High-tech server room crime scene, rows of servers with red emergency lighting, cyber attack in progress, atmospheric fog, cyberpunk aesthetic'
        },
        {
          id: 'exterior',
          filename: 'securebank_exterior.png',
          prompt: 'Modern glass skyscraper at night, SecureBank headquarters, financial district, neon lights, wet streets, cyberpunk cityscape'
        },
        {
          id: 'server_detail',
          filename: 'server_room_detail.png',
          prompt: 'Close-up server racks, blinking lights, ethernet cables, hacking terminal, green matrix code on screens, dark with neon'
        },
        {
          id: 'workstation',
          filename: 'hacker_workstation.png',
          prompt: 'Computer workstation with multiple monitors showing code and financial data, evidence of cyber attack, dark office'
        }
      ];
    } else if (caseId === 'art-forgery') {
      return [
        {
          id: 'overview',
          filename: 'gallery_crime_scene_overview.png',
          prompt: 'Elegant art gallery crime scene at night, body outline near painting, wine glass, spotlit paintings, crime tape, noir atmosphere'
        },
        {
          id: 'exterior',
          filename: 'monet_gallery_exterior.png',
          prompt: 'Upscale art gallery facade at night, "Monet Gallery" sign, arts district, warm light from windows, film noir atmosphere'
        },
        {
          id: 'painting',
          filename: 'azure_dream_painting.png',
          prompt: 'Large abstract painting "The Azure Dream" in gold frame, vibrant blues, museum-quality artwork, gallery lighting'
        },
        {
          id: 'restoration',
          filename: 'restoration_room.png',
          prompt: 'Art restoration room with easels, paint supplies, chemical bottles, work in progress paintings, moody workshop lighting'
        }
      ];
    }
    return [];
  }

  private shouldHaveImage(evidence: any): boolean {
    const imageKeywords = ['photo', 'footage', 'video', 'document', 'bottle', 'glass', 'weapon', 'note', 'message', 'certificate'];
    return imageKeywords.some(keyword => 
      evidence.name.toLowerCase().includes(keyword) || 
      evidence.description.toLowerCase().includes(keyword)
    );
  }

  private generateEvidencePrompt(evidence: any, caseId: string): string {
    const style = caseId === 'cyber-heist' ? 'digital forensics style, tech crime scene' :
                  caseId === 'art-forgery' ? 'art crime investigation, gallery setting' :
                  'crime scene evidence photography, forensic style';
    
    return `Crime scene evidence: ${evidence.name}, ${evidence.description.substring(0, 100)}, dramatic lighting, ${style}`;
  }

  // Generate a single image
  async generateImage(prompt: string, outputPath: string): Promise<boolean> {
    try {
      console.log(`🎨 Generating: ${path.basename(outputPath)}`);
      
      const response = await openai.images.generate({
        model: "gpt-image-1",
        prompt: prompt,
        size: "1024x1024",
        n: 1
      });

      if (!response.data?.[0]?.b64_json) {
        throw new Error('No image data received');
      }

      const imageBuffer = Buffer.from(response.data[0].b64_json, 'base64');
      
      // Ensure directory exists
      const dir = path.dirname(outputPath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      fs.writeFileSync(outputPath, imageBuffer);
      console.log(`✅ Saved: ${path.basename(outputPath)}`);
      return true;
    } catch (error) {
      console.error(`❌ Failed: ${path.basename(outputPath)} - ${error}`);
      return false;
    }
  }

  // Generate images in parallel batches
  async generateMissingImages(caseId: string, batchSize: number = 3): Promise<void> {
    const requirements = await this.analyzeMissingImages(caseId);
    const missing = requirements.filter(r => !r.exists);
    
    if (missing.length === 0) {
      console.log(`✅ All images already exist for case: ${caseId}`);
      return;
    }

    console.log(`\n📊 Found ${missing.length} missing images for ${caseId}:`);
    missing.forEach(img => console.log(`  - ${img.type}: ${img.id}`));
    console.log('\n');

    // Process in batches to avoid rate limiting
    for (let i = 0; i < missing.length; i += batchSize) {
      const batch = missing.slice(i, i + batchSize);
      console.log(`\n🔄 Processing batch ${Math.floor(i/batchSize) + 1}/${Math.ceil(missing.length/batchSize)}`);
      
      const promises = batch.map(img => 
        this.generateImage(img.prompt!, img.path)
      );
      
      await Promise.all(promises);
      
      // Wait between batches to avoid rate limiting
      if (i + batchSize < missing.length) {
        console.log('⏳ Waiting before next batch...');
        await new Promise(resolve => setTimeout(resolve, 5000));
      }
    }

    console.log(`\n✨ Image generation complete for ${caseId}!`);
  }

  // Validate generated images (check if they exist and have reasonable file size)
  async validateImages(caseId: string): Promise<boolean> {
    const requirements = await this.analyzeMissingImages(caseId);
    let allValid = true;

    console.log(`\n🔍 Validating images for ${caseId}:`);
    
    for (const req of requirements) {
      if (!fs.existsSync(req.path)) {
        console.log(`  ❌ Missing: ${req.type}/${req.id}`);
        allValid = false;
      } else {
        const stats = fs.statSync(req.path);
        if (stats.size < 10000) { // Less than 10KB probably means corrupted
          console.log(`  ⚠️  Suspicious size: ${req.type}/${req.id} (${stats.size} bytes)`);
          allValid = false;
        } else {
          console.log(`  ✅ Valid: ${req.type}/${req.id} (${Math.round(stats.size/1024)}KB)`);
        }
      }
    }

    return allValid;
  }

  // Generate image from custom prompt
  async generateCustomImage(prompt: string, outputFilename: string, outputDir: string = 'crime-scene'): Promise<void> {
    const outputPath = path.join(this.frontendImagesPath, outputDir, outputFilename);
    const success = await this.generateImage(prompt, outputPath);
    
    if (success) {
      console.log(`\n✅ Custom image generated successfully!`);
      console.log(`📍 Location: ${outputPath}`);
    } else {
      console.log(`\n❌ Failed to generate custom image`);
    }
  }

  // Main orchestrator
  async processCase(caseId: string): Promise<void> {
    console.log(`\n🚀 Starting smart image generation for: ${caseId}\n`);
    
    // Generate missing images
    await this.generateMissingImages(caseId);
    
    // Validate all images
    const isValid = await this.validateImages(caseId);
    
    if (isValid) {
      console.log(`\n✅ All images successfully generated and validated for ${caseId}!`);
    } else {
      console.log(`\n⚠️  Some images may need regeneration for ${caseId}`);
    }
  }

  // Process all cases
  async processAllCases(): Promise<void> {
    const cases = ['cyber-heist', 'art-forgery'];
    
    for (const caseId of cases) {
      await this.processCase(caseId);
      console.log('\n' + '='.repeat(60) + '\n');
    }
  }
}

// CLI Interface
async function main() {
  const generator = new SmartImageGenerator();
  const args = process.argv.slice(2);

  if (args[0] === '--case' && args[1]) {
    // Process specific case
    await generator.processCase(args[1]);
  } else if (args[0] === '--custom' && args[1]) {
    // Generate custom image from prompt
    const prompt = args[1];
    const filename = args[2] || `custom_${Date.now()}.png`;
    const dir = args[3] || 'crime-scene';
    await generator.generateCustomImage(prompt, filename, dir);
  } else if (args[0] === '--validate' && args[1]) {
    // Validate case images
    const isValid = await generator.validateImages(args[1]);
    process.exit(isValid ? 0 : 1);
  } else if (args[0] === '--analyze' && args[1]) {
    // Just analyze what's missing
    const requirements = await generator.analyzeMissingImages(args[1]);
    const missing = requirements.filter(r => !r.exists);
    console.log(`\n📊 Missing images for ${args[1]}:`);
    missing.forEach(img => console.log(`  - ${img.type}: ${img.id}`));
    console.log(`\nTotal missing: ${missing.length}`);
  } else if (args[0] === '--all') {
    // Process all cases
    await generator.processAllCases();
  } else {
    console.log(`
Smart Image Generator for Detective Day

Usage:
  npm run smart-generate -- --all                     Process all cases
  npm run smart-generate -- --case <case-id>          Process specific case
  npm run smart-generate -- --analyze <case-id>       Analyze missing images
  npm run smart-generate -- --validate <case-id>      Validate case images
  npm run smart-generate -- --custom "<prompt>" [filename] [dir]  Generate custom image

Case IDs:
  - cyber-heist
  - art-forgery

Examples:
  npm run smart-generate -- --case cyber-heist
  npm run smart-generate -- --custom "Dark server room with red lights" server_alert.png crime-scene
    `);
  }
}

// Run if called directly
if (require.main === module) {
  main().catch(console.error);
}

export { SmartImageGenerator };