<script lang="ts">
  import { gameStore, currentCase, uiStore, discoveredEvidence } from '../../stores/game.store';
  import CharacterList from '../game/CharacterList.svelte';
  import ChatArea from '../game/ChatArea.svelte';
  import NotesSidebar from '../ui/NotesSidebar.svelte';
  import ImageViewerModal from '../modals/ImageViewerModal.svelte';
  import CaseSummaryModal from '../modals/CaseSummaryModal.svelte';
  
  function showNotes() {
    uiStore.update(s => ({ ...s, showNotes: true }));
  }

  function closeCharacters() {
    uiStore.update(s => ({ ...s, showCharacters: false }));
  }
</script>

<div class="investigation-screen" class:notes-open={$uiStore.showNotes}>
  <div class="sidebar" class:open={$uiStore.showCharacters}>
    <CharacterList />
    
    <button class="close-sidebar" on:click={closeCharacters}>×</button>
    <button class="btn-secondary notes-btn" on:click={showNotes}>
      📝 Detective Notes
    </button>
  </div>
  
  <div class="main-content">
    <ChatArea />
  </div>
  
  <NotesSidebar />
  {#if $uiStore.showCharacters}
    <div class="sidebar-backdrop" on:click={closeCharacters}></div>
  {/if}
</div>

<ImageViewerModal />
<CaseSummaryModal />

<style>
  .investigation-screen {
    display: flex;
    width: 100%;
    height: 100vh;
    height: 100svh;
    height: 100dvh;
    overflow: hidden;
    padding-top: 60px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .main-content {
    flex: 1;
    display: flex;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .investigation-screen.notes-open .main-content {
    margin-right: 400px;
  }
  
  .sidebar {
    width: 320px;
    min-width: 320px;
    background: rgba(0,0,0,0.5);
    padding: 1.5rem;
    overflow-y: auto;
    border-right: 1px solid rgba(255,255,255,0.1);
    flex-shrink: 0;
    position: relative;
  }
  
  @media (max-width: 768px) {
    .investigation-screen {
      flex-direction: column;
      height: 100vh;
      height: 100svh;
      height: 100dvh;
      min-height: unset;
    }
    
    .investigation-screen.notes-open .main-content {
      margin-right: 0;
      margin-bottom: 50vh;
    }
    /* Ensure chat area fills remaining space on mobile */
    .main-content {
      flex: 1 1 auto;
      min-height: 0;
    }
    
    .sidebar {
      position: fixed;
      top: 60px;
      left: 0;
      width: 85vw;
      max-width: 420px;
      height: calc(100vh - 60px);
      height: calc(100svh - 60px);
      height: calc(100dvh - 60px);
      min-width: unset;
      border-right: 1px solid rgba(139,92,246,0.3);
      border-bottom: none;
      max-height: none;
      background: linear-gradient(135deg, rgba(15, 15, 25, 0.98), rgba(30, 30, 46, 0.98));
      transform: translateX(-100%);
      transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      z-index: 1800;
      box-shadow: 6px 0 24px rgba(0,0,0,0.5);
    }
    .sidebar.open {
      transform: translateX(0);
    }
    .close-sidebar {
      display: inline-flex;
      position: absolute;
      top: 8px;
      right: 8px;
      width: 36px;
      height: 36px;
      align-items: center;
      justify-content: center;
      border-radius: 18px;
      background: rgba(255,255,255,0.08);
      border: 1px solid rgba(255,255,255,0.2);
      color: #e0e0e0;
      cursor: pointer;
    }
    .sidebar-backdrop {
      position: fixed;
      top: 60px;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,0.5);
      z-index: 1700;
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
