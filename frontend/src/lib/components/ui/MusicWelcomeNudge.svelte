<script lang="ts">
  import { onMount } from 'svelte';
  
  export let onAccept: () => void = () => {};
  export let onDecline: () => void = () => {};
  export let show = false;
  
  let dialog: HTMLDialogElement;
  
  $: if (dialog && show) {
    dialog.showModal();
  }
  
  function handleAccept() {
    show = false;
    dialog?.close();
    onAccept();
    // Remember user choice
    localStorage.setItem('musicNudgeShown', 'true');
    localStorage.setItem('musicEnabled', 'true');
  }
  
  function handleDecline() {
    show = false;
    dialog?.close();
    onDecline();
    // Remember user choice
    localStorage.setItem('musicNudgeShown', 'true');
    localStorage.setItem('musicEnabled', 'false');
  }
</script>

<dialog bind:this={dialog} class="music-nudge-dialog">
  <div class="nudge-content">
    <div class="nudge-icon">🎵</div>
    <h2>Welcome to Detective Day!</h2>
    <p>Would you like to enable atmospheric background music to enhance your investigation experience?</p>
    <p class="note">You can always change this later in the music controls.</p>
    
    <div class="nudge-buttons">
      <button class="btn-accept" on:click={handleAccept}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M9 18V5l12-2v13" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="18" cy="16" r="3" />
        </svg>
        Enable Music
      </button>
      <button class="btn-decline" on:click={handleDecline}>
        No Thanks
      </button>
    </div>
  </div>
</dialog>

<style>
  .music-nudge-dialog {
    border: none;
    border-radius: 20px;
    padding: 0;
    background: transparent;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(20px);
    max-width: 480px;
    width: 90%;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    margin: 0;
  }
  
  .music-nudge-dialog::backdrop {
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(5px);
  }
  
  .nudge-content {
    background: linear-gradient(135deg, rgba(15, 15, 25, 0.98), rgba(30, 30, 46, 0.98));
    border: 2px solid rgba(139, 92, 246, 0.6);
    border-radius: 20px;
    padding: 2rem;
    text-align: center;
    color: #e0e0e0;
  }
  
  .nudge-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.5));
  }
  
  .nudge-content h2 {
    color: #ffd700;
    margin: 0 0 1rem 0;
    font-size: 1.8rem;
    font-weight: 700;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  }
  
  .nudge-content p {
    margin: 0 0 1rem 0;
    line-height: 1.6;
    font-size: 1.1rem;
  }
  
  .note {
    font-size: 0.9rem;
    color: rgba(139, 92, 246, 0.8);
    margin-bottom: 2rem !important;
    font-style: italic;
  }
  
  .nudge-buttons {
    display: flex;
    gap: 1rem;
    flex-direction: column;
    align-items: center;
  }
  
  .btn-accept {
    background: linear-gradient(135deg, rgba(139, 92, 246, 0.9), rgba(124, 58, 237, 0.9));
    border: 2px solid rgba(139, 92, 246, 0.6);
    border-radius: 12px;
    color: white;
    padding: 1rem 2rem;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8);
    width: 100%;
    max-width: 200px;
  }
  
  .btn-accept:hover {
    background: linear-gradient(135deg, rgba(139, 92, 246, 1), rgba(124, 58, 237, 1));
    border-color: #8b5cf6;
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(139, 92, 246, 0.4);
  }
  
  .btn-decline {
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 8px;
    color: rgba(224, 224, 224, 0.8);
    padding: 0.8rem 1.5rem;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    width: 100%;
    max-width: 200px;
  }
  
  .btn-decline:hover {
    background: rgba(255, 255, 255, 0.15);
    color: #e0e0e0;
    border-color: rgba(255, 255, 255, 0.3);
  }
  
  @media (min-width: 480px) {
    .nudge-buttons {
      flex-direction: row;
      justify-content: center;
    }
  }
</style>