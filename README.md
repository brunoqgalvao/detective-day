# 🕵️ Detective Day - Murder Mystery Game

An interactive murder mystery game where you play as a detective investigating the murder of Victor Westwood. Interview suspects, gather evidence, and solve the case!

## 🎮 Game Features

- **Interactive Interviews**: Question 8 unique suspects, each with their own secrets and motives
- **Evidence Collection**: Discover physical evidence and witness testimonies
- **AI-Powered Characters**: Each character responds naturally to your questions using Claude AI
- **Crime Scene Analysis**: Consult with forensic experts to understand the evidence
- **Multiple Win Conditions**: Extract a confession or convince the District Attorney to prosecute
- **Note-Taking System**: Keep track of your theories and discoveries

## 🏗️ Architecture

The game is built with a secure client-server architecture:

### Backend (Node.js + Express + TypeScript)
- Secure API endpoints for game logic
- Anthropic Claude AI integration for character responses
- Case management system supporting multiple mysteries
- All sensitive data (API keys, solutions) kept server-side

### Frontend (Svelte + TypeScript)
- Reactive UI with Svelte components
- Type-safe development with TypeScript
- Responsive design for desktop and tablet
- Real-time state management with Svelte stores

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ installed
- Anthropic API key ([Get one here](https://console.anthropic.com))

### Installation

1. **Clone the repository**
```bash
git clone [repository-url]
cd detective-day
```

2. **Install dependencies**
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
cd ..
```

3. **Configure API key**
```bash
# Copy the example environment file
cp backend/.env.example backend/.env

# Edit backend/.env and add your Anthropic API key
# ANTHROPIC_API_KEY=your_actual_api_key_here
```

4. **Start the game**
```bash
# From the root directory
./start.sh

# Or manually:
# Terminal 1: cd backend && npm run dev
# Terminal 2: cd frontend && npm run dev
```

5. **Play the game**
   - Open http://localhost:5435 in your browser
   - Click "Begin Investigation" to start

## 🎯 How to Play

### Your Mission
Solve the murder of Victor Westwood by gathering enough evidence to identify and prosecute the killer.

### Investigation Process
1. **Interview Suspects**: Click on any character to begin questioning them
2. **Gather Evidence**: Discoveries are automatically collected as you uncover them
3. **Track Progress**: Check your Evidence book for important findings
4. **Take Notes**: Use the Notes feature to organize your thoughts
5. **Consult Experts**: 
   - **Crime Scene Expert**: Get forensic analysis
   - **District Attorney**: Present your case when ready

### Winning the Game
There are two paths to victory:
- **Confession**: Confront the murderer with overwhelming evidence
- **Prosecution**: Convince the DA you have sufficient evidence (motive, means, opportunity)

### Tips
- Pay attention to timeline inconsistencies
- Cross-reference statements between suspects
- Not all secrets are related to the murder
- The poison requires specific knowledge and access
- Don't rush to the prosecutor - gather solid evidence first!

## 📁 Project Structure

```
detective-day/
├── backend/              # Express + TypeScript server
│   ├── src/
│   │   ├── app.ts       # Express server setup
│   │   ├── routes/      # API endpoints
│   │   ├── controllers/ # Request handlers
│   │   ├── services/    # Business logic & AI
│   │   ├── cases/       # Case definitions
│   │   └── types/       # TypeScript types
│   └── .env             # API keys (create from .env.example)
│
├── frontend/            # Svelte application
│   ├── src/
│   │   ├── lib/
│   │   │   ├── components/  # UI components
│   │   │   ├── stores/      # State management
│   │   │   ├── services/    # API client
│   │   │   └── types/       # TypeScript types
│   │   └── App.svelte       # Main app component
│   └── public/
│       └── images/          # Character portraits & scenes
│
├── old/                 # Legacy vanilla JavaScript implementation
│   ├── index.html      # Original HTML interface
│   ├── style.css       # Original styles
│   ├── game.js         # Original game logic
│   └── ...             # Other original files
│
├── scripts/            # Utility and generation scripts
│   ├── lighthouse-*.js # Alternative case scenarios
│   └── clear-chat.js   # Chat history cleanup utility
│
└── start.sh            # Startup script for both servers
```

## 🔧 Development

### Backend Development
```bash
cd backend
npm run dev    # Start with hot reload
npm run build  # Build for production
npm start      # Run production build
```

### Frontend Development
```bash
cd frontend
npm run dev    # Start dev server
npm run build  # Build for production
npm run preview # Preview production build
```

### Adding New Cases

1. Create a new folder in `backend/src/cases/[case-name]/`
2. Add these files:
   - `case.json` - Public case data
   - `characters.ts` - Private character information
   - `milestones.ts` - Discovery milestones
   - `facts.ts` - Character knowledge
   - `timelines.ts` - Event timelines
3. Register the case in `backend/src/services/case.service.ts`

## 🔒 Security Features

- **API Keys Protected**: All sensitive keys stored server-side only
- **Character Prompts Hidden**: AI prompts never sent to frontend
- **Solution Secure**: Murder solution kept on backend
- **Anti-Cheat Measures**: Detection for prompt injection attempts
- **Session Management**: Individual game sessions tracked securely

## 🛠️ Technologies Used

- **Frontend**: Svelte, TypeScript, Vite
- **Backend**: Node.js, Express, TypeScript
- **AI**: Anthropic Claude API
- **Styling**: CSS with custom design system
- **State Management**: Svelte stores
- **Build Tools**: Vite, TypeScript Compiler

## 📝 License

This project is for educational purposes. Feel free to use and modify for your own projects.

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Add new murder cases
- Improve character dialogue
- Enhance the UI/UX
- Fix bugs or improve performance

## 🐛 Troubleshooting

### "API error" when interviewing characters
- Check that your Anthropic API key is correctly set in `backend/.env`
- Ensure you have credits in your Anthropic account

### Frontend won't connect to backend
- Make sure both servers are running (ports 3010 and 5435)
- Check that the API URL in frontend is set to http://localhost:3010

### Characters not responding properly
- Verify the backend is running without errors
- Check the browser console for error messages
- Ensure your API key has access to the Claude model

## 🎉 Enjoy the Game!

Put on your detective hat and solve the mystery! Can you identify the killer and bring them to justice?