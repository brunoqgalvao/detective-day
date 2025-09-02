#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const logsDir = path.join(__dirname, '../logs');

// Get most recent log file
const files = fs.readdirSync(logsDir)
  .filter(f => f.endsWith('.json'))
  .sort((a, b) => {
    const statA = fs.statSync(path.join(logsDir, a));
    const statB = fs.statSync(path.join(logsDir, b));
    return statB.mtime - statA.mtime;
  });

if (files.length === 0) {
  console.log('No log files found');
  process.exit(0);
}

const latestFile = files[0];
console.log(`\n📄 Viewing log file: ${latestFile}\n`);

const filePath = path.join(logsDir, latestFile);
const content = fs.readFileSync(filePath, 'utf-8');
const lines = content.trim().split('\n');

let totalCost = 0;
let milestones = [];
let chats = [];
let errors = [];

lines.forEach(line => {
  try {
    const entry = JSON.parse(line);
    
    if (entry.type === 'chat' && entry.data.event !== 'game_started') {
      chats.push({
        character: entry.data.characterId,
        user: entry.data.userMessage?.substring(0, 50) + '...',
        time: new Date(entry.timestamp).toLocaleTimeString()
      });
    }
    
    if (entry.type === 'milestone' && entry.data.discovered) {
      milestones.push({
        title: entry.data.milestoneTitle,
        time: new Date(entry.timestamp).toLocaleTimeString()
      });
    }
    
    if (entry.cost?.totalCost) {
      totalCost += entry.cost.totalCost;
    }
    
    if (entry.type === 'error') {
      errors.push({
        message: entry.data.error,
        time: new Date(entry.timestamp).toLocaleTimeString()
      });
    }
  } catch (e) {
    console.error('Failed to parse line:', e.message);
  }
});

console.log('📊 GAME SUMMARY');
console.log('================');
console.log(`💬 Total Chats: ${chats.length}`);
console.log(`🎯 Milestones Discovered: ${milestones.length}`);
console.log(`💰 Total Cost: $${totalCost.toFixed(4)}`);
console.log(`❌ Errors: ${errors.length}`);

if (milestones.length > 0) {
  console.log('\n🎯 MILESTONES DISCOVERED');
  console.log('========================');
  milestones.forEach(m => {
    console.log(`  ✅ ${m.title} (${m.time})`);
  });
}

if (chats.length > 0) {
  console.log('\n💬 RECENT CHATS');
  console.log('===============');
  chats.slice(-5).forEach(c => {
    console.log(`  [${c.time}] ${c.character}: "${c.user}"`);
  });
}

if (errors.length > 0) {
  console.log('\n❌ ERRORS');
  console.log('=========');
  errors.forEach(e => {
    console.log(`  [${e.time}] ${e.message}`);
  });
}

console.log('\nTo see full logs, open:', filePath);