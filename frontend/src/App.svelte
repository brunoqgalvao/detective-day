<script lang="ts">
  import { onMount } from 'svelte';
  import { gameStore, currentCase, availableCases, uiStore } from './lib/stores/game.store';
  import { api } from './lib/services/api';
  import IntroScreen from './lib/components/screens/IntroScreen.svelte';
  import InvestigationScreen from './lib/components/screens/InvestigationScreen.svelte';
  import WinScreen from './lib/components/screens/WinScreen.svelte';
  import Notification from './lib/components/ui/Notification.svelte';
  import TopNavTabs from './lib/components/ui/TopNavTabs.svelte';

  let currentScreen = 'intro';
  
  $: currentScreen = $uiStore.currentScreen;

  onMount(async () => {
    // Load available cases
    try {
      const cases = await api.getAllCases();
      availableCases.set(cases);
    } catch (error) {
      console.error('Failed to load cases:', error);
    }
  });
</script>

<main>
  {#if currentScreen === 'intro'}
    <IntroScreen />
  {:else if currentScreen === 'investigation'}
    <InvestigationScreen />
  {:else if currentScreen === 'win'}
    <WinScreen />
  {/if}

  <TopNavTabs />
  <Notification />
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
</style>
