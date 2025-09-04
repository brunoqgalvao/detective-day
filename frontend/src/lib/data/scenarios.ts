import type { GameScenario } from '../types/scenario.types';

export const scenarios: GameScenario[] = [
  {
    id: 'mansion-murder',
    title: 'The Mansion Murder',
    subtitle: 'A deadly dinner party',
    description: 'A wealthy industrialist is found dead during his own dinner party. Navigate through lies, secrets, and hidden motives to uncover the killer among the guests.',
    thumbnail: '/images/cases/mansion-murder.png',
    thumbnailType: 'image',
    difficulty: 'medium',
    estimatedTime: '30-45 min',
    tags: ['murder', 'classic', 'whodunit'],
    isLocked: false,
    isPremium: false,
    theme: {
      primaryColor: '#8B4513',
      secondaryColor: '#2F4F4F',
      atmosphere: 'mystery'
    },
    gameConfig: {
      timeLimit: 45,
      maxQuestions: 15,
      startingEvidence: ['victim-photo', 'crime-scene'],
      winConditions: {
        requiredSolution: 'butler',
        requiredEvidence: ['poison-bottle', 'inheritance-document']
      }
    },
    content: {
      briefing: 'You have been called to investigate the sudden death of Mr. Harrison Blackwood during his annual charity dinner.',
      initialScene: 'The grand dining room, where the victim collapsed during the main course.',
      characters: [],
      locations: [],
      evidence: [],
      dialogues: []
    }
  },
  {
    id: 'cyber-heist',
    title: 'Digital Shadows',
    subtitle: 'A high-tech conspiracy',
    description: 'Millions vanished from a secure bank server. Trace the digital footprints through cyberspace to catch the hacker before they disappear forever.',
    thumbnail: '/images/cases/cyber-heist.png',
    thumbnailType: 'image',
    difficulty: 'hard',
    estimatedTime: '45-60 min',
    tags: ['cybercrime', 'modern', 'tech'],
    isLocked: false,
    isPremium: false,
    theme: {
      primaryColor: '#00ff41',
      secondaryColor: '#0d0208',
      atmosphere: 'thriller'
    },
    gameConfig: {
      timeLimit: 60,
      maxQuestions: 20,
      startingEvidence: ['server-logs', 'security-footage'],
      winConditions: {
        requiredSolution: 'insider-job',
        requiredEvidence: ['backdoor-code', 'transfer-records', 'vpn-logs']
      }
    },
    content: {
      briefing: 'A sophisticated cyber attack has drained $50 million from SecureBank. You have one hour before the trail goes cold.',
      initialScene: 'The bank\'s server room, where IT staff discovered the breach.',
      characters: [],
      locations: [],
      evidence: [],
      dialogues: []
    }
  },
  {
    id: 'art-forgery',
    title: 'The Painted Lie',
    subtitle: 'Art, deception, and murder',
    description: 'A famous art dealer is found dead next to a controversial painting. Unravel the world of forgeries, rivalries, and deadly secrets.',
    thumbnail: '/images/cases/art-forgery.png',
    thumbnailType: 'image',
    difficulty: 'medium',
    estimatedTime: '35-50 min',
    tags: ['art', 'forgery', 'mystery'],
    isLocked: false,
    isPremium: true,
    price: 4.99,
    theme: {
      primaryColor: '#FFD700',
      secondaryColor: '#4B0082',
      atmosphere: 'noir'
    },
    gameConfig: {
      timeLimit: 50,
      maxQuestions: 18,
      startingEvidence: ['painting-photo', 'victim-body'],
      winConditions: {
        requiredSolution: 'rival-dealer',
        requiredEvidence: ['forgery-proof', 'threatening-letter']
      }
    },
    content: {
      briefing: 'Vincent Monet, renowned art dealer, has been murdered in his gallery. The centerpiece painting may hold the key.',
      initialScene: 'The exclusive gallery after hours, paintings watching from every wall.',
      characters: [],
      locations: [],
      evidence: [],
      dialogues: []
    }
  },
  {
    id: 'train-mystery',
    title: 'Midnight Express',
    subtitle: 'Murder on the rails',
    description: 'A passenger vanishes from a moving train. With no stops and nowhere to hide, find out what happened before you reach the station.',
    thumbnail: '🚂',
    difficulty: 'easy',
    estimatedTime: '20-30 min',
    tags: ['train', 'classic', 'locked-room'],
    isLocked: true,
    isPremium: false,
    unlockCondition: 'Complete any other case first',
    theme: {
      primaryColor: '#8B0000',
      secondaryColor: '#4169E1',
      atmosphere: 'mystery'
    },
    gameConfig: {
      timeLimit: 30,
      maxQuestions: 12,
      startingEvidence: ['passenger-list', 'compartment-photo'],
      winConditions: {
        requiredSolution: 'conductor',
        requiredEvidence: ['ticket-stub', 'witness-testimony']
      }
    },
    content: {
      briefing: 'Mrs. Charlotte Webb has disappeared from the overnight express. The train hasn\'t stopped, so where is she?',
      initialScene: 'The narrow corridors of the sleeper car, swaying with the train\'s motion.',
      characters: [],
      locations: [],
      evidence: [],
      dialogues: []
    }
  },
  {
    id: 'cold-case',
    title: 'Frozen in Time',
    subtitle: '20 years later',
    description: 'New evidence has emerged in a decades-old disappearance. Dig through old files and faded memories to finally bring closure.',
    thumbnail: '🗄️',
    difficulty: 'expert',
    estimatedTime: '60-90 min',
    tags: ['cold-case', 'investigation', 'complex'],
    isLocked: true,
    isPremium: true,
    price: 6.99,
    unlockCondition: 'Complete 3 cases with perfect score',
    theme: {
      primaryColor: '#696969',
      secondaryColor: '#000080',
      atmosphere: 'noir'
    },
    gameConfig: {
      timeLimit: 90,
      maxQuestions: 25,
      startingEvidence: ['old-case-file'],
      winConditions: {
        requiredSolution: 'family-friend',
        requiredEvidence: ['dna-match', 'alibi-contradiction', 'buried-evidence', 'witness-recant']
      }
    },
    content: {
      briefing: 'Sarah Mitchell vanished 20 years ago. A construction crew just found something that changes everything.',
      initialScene: 'The dusty evidence locker, boxes of yellowed papers and faded photographs.',
      characters: [],
      locations: [],
      evidence: [],
      dialogues: []
    }
  },
  {
    id: 'ghost-ship',
    title: 'The Empty Vessel',
    subtitle: 'Lost at sea',
    description: 'A yacht is found drifting with no crew aboard. Piece together the ship\'s log and evidence to discover what happened to everyone.',
    thumbnail: '⛵',
    difficulty: 'hard',
    estimatedTime: '40-55 min',
    tags: ['maritime', 'disappearance', 'mystery'],
    isLocked: true,
    isPremium: true,
    price: 5.99,
    unlockCondition: 'Solve Digital Shadows',
    theme: {
      primaryColor: '#006994',
      secondaryColor: '#1F4788',
      atmosphere: 'mystery'
    },
    gameConfig: {
      timeLimit: 55,
      maxQuestions: 20,
      startingEvidence: ['ship-log', 'weather-report'],
      winConditions: {
        requiredSolution: 'mutiny',
        requiredEvidence: ['blood-evidence', 'radio-transcript', 'hidden-cargo']
      }
    },
    content: {
      briefing: 'The luxury yacht "Serenity" was found adrift in international waters. All five crew members are missing.',
      initialScene: 'The eerily quiet deck of the yacht, gently rocking on calm seas.',
      characters: [],
      locations: [],
      evidence: [],
      dialogues: []
    }
  }
];

export function getScenarioById(id: string): GameScenario | undefined {
  return scenarios.find(s => s.id === id);
}

export function getAvailableScenarios(completedScenarios: string[] = []): GameScenario[] {
  return scenarios.map(scenario => {
    let isLocked = scenario.isLocked;
    
    if (scenario.unlockCondition) {
      if (scenario.unlockCondition.includes('Complete any other case') && completedScenarios.length > 0) {
        isLocked = false;
      }
      if (scenario.unlockCondition.includes('Complete 3 cases') && completedScenarios.length >= 3) {
        isLocked = false;
      }
      if (scenario.unlockCondition.includes('Solve Digital Shadows') && completedScenarios.includes('cyber-heist')) {
        isLocked = false;
      }
    }
    
    return { ...scenario, isLocked };
  });
}