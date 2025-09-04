#!/bin/bash

# Remaining Cyber Heist characters
echo "🎨 Generating james_rivera..."
npm run generate "Portrait of a Hispanic man, early 40s, former CTO named James Rivera, casual business attire, intelligent eyes, slight stubble, tech background, moody lighting suggesting outsider status, digital art" 
mv generated-images/*.png frontend/public/images/characters/james_rivera.png 2>/dev/null

echo "🎨 Generating nina_patel..."
npm run generate "Portrait of an Indian woman, mid-30s, VP of Operations, professional sari or business suit, confident expression, corporate office background, warm lighting, digital art style"
mv generated-images/*.png frontend/public/images/characters/nina_patel.png 2>/dev/null

echo "🎨 Generating oliver_frost..."
npm run generate "Portrait of a Caucasian man, mid-40s, security consultant, sharp features, calculating eyes, dark suit, mysterious background with security elements, noir lighting, digital art"
mv generated-images/*.png frontend/public/images/characters/oliver_frost.png 2>/dev/null

echo "🎨 Generating claudia_beaumont..."
npm run generate "Portrait of an elegant woman in her early 40s, art authenticator, sophisticated appearance, wearing designer glasses and pearl necklace, gallery background, confident but secretive expression, oil painting style digital art"
mv generated-images/*.png frontend/public/images/characters/claudia_beaumont.png 2>/dev/null

# Cyber Heist crime scenes
echo "🔍 Generating cyber_crime_scene..."
npm run generate "High-tech server room at night, rows of blinking servers, emergency red lighting, computer monitors showing error messages, cyber crime scene, atmospheric fog, cyberpunk aesthetic"
mv generated-images/*.png frontend/public/images/crime-scene/cyber_crime_scene.png 2>/dev/null

echo "🔍 Generating bank_exterior..."
npm run generate "Modern glass skyscraper at night, SecureBank headquarters, financial district, neon lights reflecting on wet streets, cyberpunk cityscape, dramatic atmosphere, digital art"
mv generated-images/*.png frontend/public/images/crime-scene/bank_exterior.png 2>/dev/null

echo "🔍 Generating server_room_detail..."
npm run generate "Close-up of server racks with blinking lights, ethernet cables, one terminal showing hack in progress, green matrix-style code on screens, dark atmosphere with neon highlights"
mv generated-images/*.png frontend/public/images/crime-scene/server_room_detail.png 2>/dev/null

echo "🔍 Generating hacker_workstation..."
npm run generate "Computer workstation with multiple monitors showing code, financial data, and security logs, evidence of cyber attack, dark office setting, dramatic lighting on keyboard and screens"
mv generated-images/*.png frontend/public/images/crime-scene/hacker_workstation.png 2>/dev/null

echo "🔍 Generating vpn_logs_evidence..."
npm run generate "Computer screen showing detailed VPN connection logs with timestamps and IP addresses, green text on black background, terminal window, evidence markers highlighting suspicious entries"
mv generated-images/*.png frontend/public/images/crime-scene/vpn_logs_evidence.png 2>/dev/null

echo "🔍 Generating crypto_wallets_evidence..."
npm run generate "Computer display showing blockchain transaction flow diagram, cryptocurrency wallet addresses, money trail visualization, dark theme with neon green highlights, digital forensics style"
mv generated-images/*.png frontend/public/images/crime-scene/crypto_wallets_evidence.png 2>/dev/null

echo "✨ All remaining images generated!"