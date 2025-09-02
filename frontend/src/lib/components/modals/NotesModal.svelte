<script lang="ts">
  import { gameStore, uiStore } from '../../stores/game.store';
  import Modal from '../ui/Modal.svelte';
  
  let showModal = false;
  let notesContent = '';
  
  $: showModal = $uiStore.showNotes;
  $: notesContent = $gameStore.notes;
  
  function close() {
    uiStore.update(s => ({ ...s, showNotes: false }));
  }
  
  function saveNotes() {
    gameStore.updateNotes(notesContent);
    close();
  }
</script>

<Modal {showModal} on:close={close}>
  <h2 slot="header">Your Notes</h2>
  
  <div slot="content">
    <textarea 
      bind:value={notesContent}
      placeholder="Take notes here... Track suspects, timelines, and your theories about the case."
    />
    <div class="button-container">
      <button class="btn-secondary" on:click={close}>Cancel</button>
      <button class="btn-primary" on:click={saveNotes}>Save Notes</button>
    </div>
  </div>
</Modal>

<style>
  textarea {
    width: 100%;
    min-height: 400px;
    padding: 1rem;
    background: rgba(255,255,255,0.1);
    border: 1px solid rgba(255,255,255,0.2);
    color: #e0e0e0;
    border-radius: 8px;
    font-family: inherit;
    font-size: 1rem;
    resize: vertical;
    margin-bottom: 1rem;
  }
  
  textarea:focus {
    outline: none;
    border-color: #4ecdc4;
    background: rgba(255,255,255,0.15);
  }
  
  .button-container {
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
  }
  
  .btn-primary {
    background: linear-gradient(45deg, #4ecdc4, #44a3c1);
    color: white;
    border: none;
    padding: 0.8rem 1.5rem;
    border-radius: 6px;
    cursor: pointer;
    font-size: 1rem;
    transition: all 0.3s;
  }
  
  .btn-primary:hover {
    transform: scale(1.05);
    box-shadow: 0 5px 15px rgba(78, 205, 196, 0.4);
  }
  
  .btn-secondary {
    background: rgba(255,255,255,0.1);
    color: #e0e0e0;
    border: 1px solid rgba(255,255,255,0.2);
    padding: 0.8rem 1.5rem;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.3s;
    font-size: 1rem;
  }
  
  .btn-secondary:hover {
    background: rgba(255,255,255,0.2);
  }
</style>