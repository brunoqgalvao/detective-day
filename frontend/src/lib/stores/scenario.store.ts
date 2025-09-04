import { writable, derived } from 'svelte/store';
import type { GameScenario, ScenarioProgress } from '../types/scenario.types';
import { scenarios, getAvailableScenarios } from '../data/scenarios';

interface ScenarioState {
  currentScreen: 'welcome' | 'selection' | 'game' | 'results';
  selectedScenario: GameScenario | null;
  completedScenarios: string[];
  scenarioProgress: Map<string, ScenarioProgress>;
}

function createScenarioStore() {
  const initialState: ScenarioState = {
    currentScreen: 'welcome',
    selectedScenario: null,
    completedScenarios: loadCompletedScenarios(),
    scenarioProgress: new Map()
  };

  const { subscribe, set, update } = writable<ScenarioState>(initialState);

  return {
    subscribe,
    
    navigateTo: (screen: ScenarioState['currentScreen']) => {
      update(state => ({ ...state, currentScreen: screen }));
    },
    
    selectScenario: (scenario: GameScenario) => {
      update(state => ({
        ...state,
        selectedScenario: scenario,
        currentScreen: 'game'
      }));
    },
    
    completeScenario: (scenarioId: string, score: number, questionsUsed: number, timeSpent: number) => {
      update(state => {
        const completedScenarios = [...state.completedScenarios];
        if (!completedScenarios.includes(scenarioId)) {
          completedScenarios.push(scenarioId);
          saveCompletedScenarios(completedScenarios);
        }
        
        const progress: ScenarioProgress = {
          scenarioId,
          status: 'completed',
          completedAt: new Date(),
          score,
          questionsUsed,
          timeSpent,
          unlockedEvidence: [],
          notes: ''
        };
        
        state.scenarioProgress.set(scenarioId, progress);
        
        return {
          ...state,
          completedScenarios,
          currentScreen: 'results'
        };
      });
    },
    
    resetToSelection: () => {
      update(state => ({
        ...state,
        selectedScenario: null,
        currentScreen: 'selection'
      }));
    },
    
    resetToWelcome: () => {
      update(state => ({
        ...state,
        selectedScenario: null,
        currentScreen: 'welcome'
      }));
    }
  };
}

export const scenarioStore = createScenarioStore();

export const availableScenarios = derived(
  scenarioStore,
  $store => getAvailableScenarios($store.completedScenarios)
);

function loadCompletedScenarios(): string[] {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('completedScenarios');
    return saved ? JSON.parse(saved) : [];
  }
  return [];
}

function saveCompletedScenarios(scenarios: string[]) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('completedScenarios', JSON.stringify(scenarios));
  }
}