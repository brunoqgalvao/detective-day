<script lang="ts">
  import { onMount } from 'svelte';
  import { gameStore, currentCase, availableCases, uiStore } from './lib/stores/game.store';
  import { scenarioStore, availableScenarios } from './lib/stores/scenario.store';
  import { api } from './lib/services/api';
  import WelcomeScreen from './lib/components/screens/WelcomeScreen.svelte';
  import GameSelectionScreen from './lib/components/screens/GameSelectionScreen.svelte';
  import IntroScreen from './lib/components/screens/IntroScreen.svelte';
  import InvestigationScreen from './lib/components/screens/InvestigationScreen.svelte';
  import WinScreen from './lib/components/screens/WinScreen.svelte';
  import CaseIntroModal from './lib/components/modals/CaseIntroModal.svelte';
  import Notification from './lib/components/ui/Notification.svelte';
  import TopNavTabs from './lib/components/ui/TopNavTabs.svelte';
  import DashboardNav from './lib/components/ui/DashboardNav.svelte';
  
  let currentScreen = 'welcome';
  let showNewFlow = true; // Toggle between new and old flow
  let showCaseIntro = false;
  
  $: if (showNewFlow) {
    currentScreen = $scenarioStore.currentScreen;
  } else {
    currentScreen = $uiStore.currentScreen;
  }

  onMount(async () => {
    // Load available cases for legacy flow
    if (!showNewFlow) {
      try {
        const cases = await api.getAllCases();
        availableCases.set(cases);
      } catch (error) {
        console.error('Failed to load cases:', error);
      }
    }
  });

  function handleWelcomeStart() {
    scenarioStore.navigateTo('selection');
  }

  async function handleGameSelection(event: CustomEvent) {
    const { scenario } = event.detail;
    
    // Map frontend scenario IDs to backend case IDs
    const caseIdMap: Record<string, string> = {
      'mansion-murder': 'westwood',
      'cyber-heist': 'cyber-heist',
      'art-forgery': 'art-forgery'
    };
    
    const caseId = caseIdMap[scenario.id] || scenario.id;
    
    // Load the case from backend
    try {
      const response = await api.getCase(caseId);
      if (response) {
        // Set the current case for the game
        currentCase.set(response);
        await gameStore.initCase(caseId);
        // Navigate to game screen
        scenarioStore.selectScenario(scenario);
        // Show intro modal first
        showCaseIntro = true;
      }
    } catch (error) {
      console.error('Failed to load case:', error);
    }
  }
  
  function handleIntroClose() {
    showCaseIntro = false;
    uiStore.update(state => ({ ...state, currentScreen: 'investigation' }));
  }
  
  function handleIntroStart() {
    showCaseIntro = false;
    uiStore.update(state => ({ ...state, currentScreen: 'investigation' }));
  }

  function handleBackToWelcome() {
    scenarioStore.resetToWelcome();
  }

  function handleBackToSelection() {
    scenarioStore.resetToSelection();
  }
</script>

<main>
  {#if showNewFlow}
    {#if currentScreen === 'welcome'}
      <WelcomeScreen on:start={handleWelcomeStart} />
    {:else if currentScreen === 'selection'}
      <GameSelectionScreen 
        scenarios={$availableScenarios} 
        on:select={handleGameSelection}
        on:back={handleBackToWelcome}
      />
    {:else if currentScreen === 'game'}
      {#if $scenarioStore.selectedScenario}
        <InvestigationScreen />
      {/if}
    {:else if currentScreen === 'results'}
      <WinScreen />
      <button class="back-to-selection" on:click={handleBackToSelection}>
        Choose Another Case
      </button>
    {/if}
  {:else}
    {#if currentScreen === 'intro'}
      <IntroScreen />
    {:else if currentScreen === 'investigation'}
      <InvestigationScreen />
    {:else if currentScreen === 'win'}
      <WinScreen />
    {/if}
  {/if}

  {#if currentScreen !== 'welcome' && currentScreen !== 'selection'}
    <DashboardNav />
  {/if}
  <Notification />
  
  <!-- Case Intro Modal -->
  <CaseIntroModal 
    show={showCaseIntro}
    on:close={handleIntroClose}
    on:start={handleIntroStart}
  />
</main>

<style>
  :global(*) {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :global(body) {
    font-family: 'Georgia', serif;
    background: linear-gradient(135deg, #1e1e2e 0%, #2d2d44 100%);
    background-attachment: fixed;
    color: #e0e0e0;
    min-height: 100vh;
    min-height: 100dvh;
    margin: 0;
    padding: 0;
  }

  @media (max-width: 768px) {
    :global(body) {
      /* Avoid iOS Safari layout quirks with fixed backgrounds */
      background-attachment: scroll;
    }
  }

  /* Ensure app content can stretch to full viewport */
  :global(#app) {
    display: flex;
    min-height: 100vh;
    min-height: 100svh;
    min-height: 100dvh;
  }

  main {
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 100vh;
    min-height: 100svh;
    min-height: 100dvh;
  }

  .back-to-selection {
    position: fixed;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    padding: 1rem 2rem;
    background: linear-gradient(135deg, #ffd700, #ff6b35);
    color: #1a1a2e;
    border: none;
    border-radius: 2rem;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    z-index: 100;
    transition: all 0.3s ease;
  }

  .back-to-selection:hover {
    transform: translateX(-50%) translateY(-2px);
    box-shadow: 0 10px 20px rgba(255, 107, 53, 0.3);
  }
</style>
