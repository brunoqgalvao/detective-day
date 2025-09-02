<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  
  export let showModal = false;
  
  const dispatch = createEventDispatcher();
  
  function handleClose() {
    dispatch('close');
  }
  
  function handleBackdropClick(e: MouseEvent) {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  }
</script>

{#if showModal}
  <div class="modal active" on:click={handleBackdropClick}>
    <div class="modal-content">
      <button class="close-modal" on:click={handleClose}>×</button>
      <div class="modal-header">
        <slot name="header" />
      </div>
      <div class="modal-body">
        <slot name="content" />
      </div>
    </div>
  </div>
{/if}

<style>
  .modal {
    display: none;
    position: fixed;
    z-index: 1000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.8);
    backdrop-filter: blur(5px);
  }

  .modal.active {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal-content {
    background: linear-gradient(135deg, #2d2d44 0%, #1e1e2e 100%);
    padding: 2.5rem;
    border-radius: 15px;
    max-width: 700px;
    width: 90%;
    max-height: 80vh;
    overflow-y: auto;
    position: relative;
    border: 1px solid rgba(255,255,255,0.1);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  }

  .modal-header {
    margin-bottom: 1.5rem;
  }
  
  .modal-header :global(h2) {
    color: #ffd700;
    margin: 0;
  }

  .close-modal {
    position: absolute;
    right: 1.5rem;
    top: 1.5rem;
    font-size: 2rem;
    cursor: pointer;
    color: #e0e0e0;
    opacity: 0.6;
    transition: opacity 0.3s;
    background: none;
    border: none;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .close-modal:hover {
    opacity: 1;
  }
  
  /* Scrollbar styling */
  .modal-content::-webkit-scrollbar {
    width: 8px;
  }
  
  .modal-content::-webkit-scrollbar-track {
    background: rgba(255,255,255,0.05);
    border-radius: 4px;
  }
  
  .modal-content::-webkit-scrollbar-thumb {
    background: rgba(255,255,255,0.2);
    border-radius: 4px;
  }
  
  .modal-content::-webkit-scrollbar-thumb:hover {
    background: rgba(255,255,255,0.3);
  }
</style>