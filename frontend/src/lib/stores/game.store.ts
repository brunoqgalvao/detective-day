import { writable, derived } from 'svelte/store';
import type { GameState, CaseData, ChatMessage, Milestone } from '../types/game.types';
import { api } from '../services/api';

// Generate a unique session ID for this game session
export const SESSION_ID = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

// Main game state store
const initialState: GameState = {
  caseId: '',
  chatHistories: {},
  evidenceDiscovered: [],
  milestonesDiscovered: [],
  notes: '',
  gameWon: false,
  currentCharacter: null
};

function createGameStore() {
  const { subscribe, set, update } = writable<GameState>(initialState);
  
  // Load from localStorage if available
  const loadFromLocalStorage = (): GameState | null => {
    if (typeof window === 'undefined') return null;
    const saved = localStorage.getItem('detective_game_state');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return null;
      }
    }
    return null;
  };
  
  // Save to localStorage
  const saveToLocalStorage = (state: GameState) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('detective_game_state', JSON.stringify(state));
    }
  };

  return {
    subscribe,
    
    // Initialize game with a case
    async initCase(caseId: string) {
      // Set investigation start time to 11:00 PM on October 15th, 2024 (1 hour after crime)
      const investigationDate = new Date('2024-10-15T23:00:00');
      
      // Try localStorage first
      const localState = loadFromLocalStorage();
      if (localState && localState.caseId === caseId) {
        // Add investigationStartTime if it doesn't exist (backward compatibility)
        if (!localState.investigationStartTime) {
          localState.investigationStartTime = investigationDate.toISOString();
          saveToLocalStorage(localState);
        }
        set(localState);
        return;
      }
      
      // Then try server
      const savedState = await api.getGameState(SESSION_ID);
      if (savedState && savedState.caseId === caseId) {
        // Add investigationStartTime if it doesn't exist (backward compatibility)
        if (!savedState.investigationStartTime) {
          savedState.investigationStartTime = investigationDate.toISOString();
        }
        set(savedState);
        saveToLocalStorage(savedState);
      } else {
        const newState = {
          ...initialState,
          caseId,
          chatHistories: {},
          gameStartTime: new Date().toISOString(),
          investigationStartTime: investigationDate.toISOString()
        };
        update(() => newState);
        saveToLocalStorage(newState);
      }
    },

    // Select a character for interview
    selectCharacter(characterId: string | null) {
      update(state => {
        const newState = {
          ...state,
          currentCharacter: characterId
        };
        saveToLocalStorage(newState);
        return newState;
      });
    },

    // Add a message to chat history
    addChatMessage(characterId: string, message: ChatMessage) {
      update(state => {
        const history = state.chatHistories[characterId] || [];
        const newState = {
          ...state,
          chatHistories: {
            ...state.chatHistories,
            [characterId]: [...history, message]
          }
        };
        saveToLocalStorage(newState);
        return newState;
      });
    },

    // Discover evidence
    discoverEvidence(evidenceId: string) {
      update(state => {
        if (!state.evidenceDiscovered.includes(evidenceId)) {
          const newState = {
            ...state,
            evidenceDiscovered: [...state.evidenceDiscovered, evidenceId]
          };
          saveToLocalStorage(newState);
          api.saveGameState(SESSION_ID, newState);
          return newState;
        }
        return state;
      });
    },

    // Discover milestone
    discoverMilestone(milestoneId: string) {
      update(state => {
        if (!state.milestonesDiscovered.includes(milestoneId)) {
          const newState = {
            ...state,
            milestonesDiscovered: [...state.milestonesDiscovered, milestoneId]
          };
          saveToLocalStorage(newState);
          api.saveGameState(SESSION_ID, newState);
          return newState;
        }
        return state;
      });
    },

    // Update notes
    updateNotes(notes: string) {
      update(state => {
        const newState = { ...state, notes };
        saveToLocalStorage(newState);
        api.saveGameState(SESSION_ID, newState);
        return newState;
      });
    },

    // Win the game
    winGame() {
      update(state => {
        const newState = { ...state, gameWon: true };
        saveToLocalStorage(newState);
        api.saveGameState(SESSION_ID, newState);
        // Update game stats
        if (typeof window !== 'undefined') {
          const gamesPlayed = parseInt(localStorage.getItem('games_played') || '0');
          const casesSolved = parseInt(localStorage.getItem('cases_solved') || '0');
          localStorage.setItem('games_played', String(gamesPlayed + 1));
          localStorage.setItem('cases_solved', String(casesSolved + 1));
        }
        return newState;
      });
    },

    // Reset the game
    reset() {
      set(initialState);
      if (typeof window !== 'undefined') {
        localStorage.removeItem('detective_game_state');
      }
      api.resetGame(SESSION_ID);
    },

    // Save current state
    async save() {
      const currentState = await new Promise<GameState>(resolve => {
        const unsubscribe = subscribe(state => {
          unsubscribe();
          resolve(state);
        });
      });
      await api.saveGameState(SESSION_ID, currentState);
    }
  };
}

export const gameStore = createGameStore();

// Current case data store
export const currentCase = writable<CaseData | null>(null);

// Available cases store
export const availableCases = writable<Array<{ id: string; title: string; description: string }>>([]);

// UI state store
export const uiStore = writable({
  showEvidence: false,
  showNotes: false,
  showSettings: false,
  showHowToPlay: false,
  showCaseSummary: false,
  currentScreen: 'intro' as 'intro' | 'investigation' | 'win',
  loading: false,
  notification: null as { title: string; description: string } | null,
  imageViewer: {
    show: false,
    imageSrc: '',
    caption: ''
  }
});

// Derived stores
export const currentCharacterData = derived(
  [gameStore, currentCase],
  ([$gameStore, $currentCase]) => {
    if (!$gameStore.currentCharacter || !$currentCase) return null;
    return $currentCase.characters.find(c => c.id === $gameStore.currentCharacter);
  }
);

export const discoveredEvidence = derived(
  [gameStore, currentCase],
  ([$gameStore, $currentCase]) => {
    if (!$currentCase) return [];
    return $currentCase.evidence.filter(e => 
      $gameStore.evidenceDiscovered.includes(e.id)
    );
  }
);

// Notification helper
export function showNotification(title: string, description: string) {
  uiStore.update(state => ({
    ...state,
    notification: { title, description }
  }));
  
  // Auto-hide after 5 seconds
  setTimeout(() => {
    uiStore.update(state => ({
      ...state,
      notification: null
    }));
  }, 5000);
}