<script lang="ts">
  import { gameStore, currentCase, uiStore, discoveredEvidence } from '../../stores/game.store';
  import CharacterList from '../game/CharacterList.svelte';
  import ChatArea from '../game/ChatArea.svelte';
  import EvidenceModal from '../modals/EvidenceModal.svelte';
  import NotesModal from '../modals/NotesModal.svelte';
  import HowToPlayModal from '../modals/HowToPlayModal.svelte';
  import SettingsModal from '../modals/SettingsModal.svelte';
  
  $: evidenceCount = $discoveredEvidence.length;
  $: milestonesCount = $gameStore.milestonesDiscovered.length;
  $: hasNewEvidence = evidenceCount > 0 || milestonesCount > 0;
  
  function showEvidence() {
    uiStore.update(s => ({ ...s, showEvidence: true }));
  }
  
  function showNotes() {
    uiStore.update(s => ({ ...s, showNotes: true }));
  }
  
  function showHelp() {
    uiStore.update(s => ({ ...s, showHowToPlay: true }));
  }
  
  function showSettings() {
    uiStore.update(s => ({ ...s, showSettings: true }));
  }
  
  function resetGame() {
    if (confirm('Are you sure you want to reset the game? All progress will be lost.')) {
      gameStore.reset();
      uiStore.update(s => ({ ...s, currentScreen: 'intro' }));
    }
  }
</script>

<div class="investigation-screen">
  <div class="sidebar">
    <CharacterList />
    
    <button class="btn-secondary" on:click={showEvidence}>
      View Evidence
      {#if hasNewEvidence}
        <span class="notification-badge">{evidenceCount + milestonesCount}</span>
      {/if}
    </button>
    
    <button class="btn-secondary" on:click={showNotes}>
      View Notes
    </button>
    
    <button class="btn-secondary help-btn" on:click={showHelp}>
      <span>❓</span> Help
    </button>
    
    <button class="btn-secondary settings-btn" on:click={showSettings}>
      <span>⚙️</span> Settings
    </button>
    
    <button class="btn-secondary reset-btn" on:click={resetGame}>
      Reset Game
    </button>
  </div>
  
  <ChatArea />
</div>

<EvidenceModal />
<NotesModal />
<HowToPlayModal />
<SettingsModal />

<style>
  .investigation-screen {
    display: flex;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }
  
  .sidebar {
    width: 320px;
    min-width: 320px;
    background: rgba(0,0,0,0.5);
    padding: 1.5rem;
    overflow-y: auto;
    border-right: 1px solid rgba(255,255,255,0.1);
    flex-shrink: 0;
  }
  
  @media (max-width: 768px) {
    .investigation-screen {
      flex-direction: column;
    }
    
    .sidebar {
      width: 100%;
      min-width: unset;
      border-right: none;
      border-bottom: 1px solid rgba(255,255,255,0.1);
      max-height: 40vh;
    }
  }
  
  .btn-secondary {
    background: rgba(255,255,255,0.1);
    color: #e0e0e0;
    border: 1px solid rgba(255,255,255,0.2);
    padding: 0.7rem 1.5rem;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.3s;
    font-family: inherit;
    margin-top: 0.5rem;
    width: 100%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    font-size: 1rem;
  }
  
  .btn-secondary:hover {
    background: rgba(255,255,255,0.2);
  }
  
  .help-btn {
    background: rgba(102,126,234,0.1);
    border-color: rgba(102,126,234,0.3);
  }
  
  .help-btn:hover {
    background: rgba(102,126,234,0.2);
  }
  
  .settings-btn {
    background: rgba(78,205,196,0.1);
    border-color: rgba(78,205,196,0.3);
  }
  
  .settings-btn:hover {
    background: rgba(78,205,196,0.2);
  }
  
  .reset-btn {
    margin-top: 1rem;
    background: rgba(255,107,107,0.1);
    border-color: rgba(255,107,107,0.3);
  }
  
  .reset-btn:hover {
    background: rgba(255,107,107,0.2);
  }
  
  .notification-badge {
    position: absolute;
    top: -8px;
    right: -8px;
    background: #ff3838;
    color: white;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    font-size: 0.75rem;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: pulse 2s infinite;
  }
  
  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); }
  }
  
  /* Scrollbar styling for sidebar */
  .sidebar::-webkit-scrollbar {
    width: 6px;
  }
  
  .sidebar::-webkit-scrollbar-track {
    background: rgba(255,255,255,0.05);
  }
  
  .sidebar::-webkit-scrollbar-thumb {
    background: rgba(255,255,255,0.2);
    border-radius: 3px;
  }
  
  .sidebar::-webkit-scrollbar-thumb:hover {
    background: rgba(255,255,255,0.3);
  }
</style>