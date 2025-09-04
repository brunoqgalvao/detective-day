import { writable, derived } from 'svelte/store';

export interface CaseStats {
  caseId: string;
  playTime: number; // in seconds
  completed: boolean;
  completedAt?: string;
  lastPlayed: string;
  questionsAsked: number;
  evidenceFound: number;
}

export interface GameStats {
  cases: Record<string, CaseStats>;
  totalPlayTime: number;
  totalCasesCompleted: number;
}

function createStatsStore() {
  const { subscribe, set, update } = writable<GameStats>({
    cases: {},
    totalPlayTime: 0,
    totalCasesCompleted: 0
  });

  // Load from localStorage
  const loadFromLocalStorage = (): GameStats => {
    if (typeof window === 'undefined') return { cases: {}, totalPlayTime: 0, totalCasesCompleted: 0 };
    const saved = localStorage.getItem('detective_game_stats');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return { cases: {}, totalPlayTime: 0, totalCasesCompleted: 0 };
      }
    }
    return { cases: {}, totalPlayTime: 0, totalCasesCompleted: 0 };
  };

  // Save to localStorage
  const saveToLocalStorage = (stats: GameStats) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('detective_game_stats', JSON.stringify(stats));
    }
  };

  // Initialize with saved data
  set(loadFromLocalStorage());

  return {
    subscribe,

    // Update play time for a case
    updatePlayTime(caseId: string, seconds: number) {
      update(stats => {
        const caseStats = stats.cases[caseId] || {
          caseId,
          playTime: 0,
          completed: false,
          lastPlayed: new Date().toISOString(),
          questionsAsked: 0,
          evidenceFound: 0
        };

        const newStats = {
          ...stats,
          cases: {
            ...stats.cases,
            [caseId]: {
              ...caseStats,
              playTime: caseStats.playTime + seconds,
              lastPlayed: new Date().toISOString()
            }
          },
          totalPlayTime: stats.totalPlayTime + seconds
        };

        saveToLocalStorage(newStats);
        return newStats;
      });
    },

    // Mark a case as completed
    completeCase(caseId: string, questionsAsked: number, evidenceFound: number) {
      update(stats => {
        const caseStats = stats.cases[caseId] || {
          caseId,
          playTime: 0,
          completed: false,
          lastPlayed: new Date().toISOString(),
          questionsAsked: 0,
          evidenceFound: 0
        };

        if (!caseStats.completed) {
          const newStats = {
            ...stats,
            cases: {
              ...stats.cases,
              [caseId]: {
                ...caseStats,
                completed: true,
                completedAt: new Date().toISOString(),
                questionsAsked,
                evidenceFound
              }
            },
            totalCasesCompleted: stats.totalCasesCompleted + 1
          };

          saveToLocalStorage(newStats);
          return newStats;
        }

        return stats;
      });
    },

    // Get stats for a specific case
    getCaseStats(caseId: string): CaseStats | null {
      const stats = loadFromLocalStorage();
      return stats.cases[caseId] || null;
    },

    // Reset all stats
    reset() {
      const newStats = { cases: {}, totalPlayTime: 0, totalCasesCompleted: 0 };
      set(newStats);
      saveToLocalStorage(newStats);
    }
  };
}

export const statsStore = createStatsStore();

// Derived store for completion status
export const caseCompletionStatus = derived(statsStore, $stats => {
  const status: Record<string, boolean> = {};
  Object.values($stats.cases).forEach(caseStats => {
    status[caseStats.caseId] = caseStats.completed;
  });
  return status;
});

// Helper function to format play time
export function formatPlayTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  } else if (minutes > 0) {
    return `${minutes}m`;
  } else {
    return '<1m';
  }
}