<script lang="ts">
  import { uiStore } from '../../stores/game.store';
  import Modal from '../ui/Modal.svelte';
  
  let showModal = false;
  
  $: showModal = $uiStore.showSettings;
  
  function close() {
    uiStore.update(s => ({ ...s, showSettings: false }));
  }
</script>

<Modal {showModal} on:close={close}>
  <h2 slot="header">Settings</h2>
  
  <div slot="content">
    <div class="settings-section">
      <h3>📊 Game Statistics</h3>
      <p>Games Played: {localStorage.getItem('games_played') || 0}</p>
      <p>Cases Solved: {localStorage.getItem('cases_solved') || 0}</p>
    </div>
    
    <div class="settings-section">
      <h3>🎮 Game Options</h3>
      <button class="btn-danger" on:click={() => {
        if (confirm('Clear all saved data including game progress?')) {
          localStorage.clear();
          window.location.reload();
        }
      }}>
        Clear All Data
      </button>
    </div>
  </div>
</Modal>

<style>
  .settings-section {
    margin-bottom: 2rem;
  }

  .settings-section h3 {
    color: #4ecdc4;
    margin-bottom: 1rem;
    font-size: 1.2rem;
  }

  .settings-section p {
    color: #e0e0e0;
    margin-bottom: 0.5rem;
  }
  
  .btn-danger {
    padding: 0.75rem 1.5rem;
    background: rgba(255, 107, 107, 0.2);
    color: #ff6b6b;
    border: 1px solid rgba(255, 107, 107, 0.3);
    border-radius: 8px;
    cursor: pointer;
    font-size: 1rem;
    transition: all 0.3s;
  }
  
  .btn-danger:hover {
    background: rgba(255, 107, 107, 0.3);
  }
</style>