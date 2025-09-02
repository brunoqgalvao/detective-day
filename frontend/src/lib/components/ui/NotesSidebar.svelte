<script lang="ts">
  import { gameStore, uiStore } from '../../stores/game.store';
  
  let notesContent = '';
  let isAutoSaving = false;
  let autoSaveTimeout: number;
  
  $: showSidebar = $uiStore.showNotes;
  $: notesContent = $gameStore.notes;
  
  function close() {
    saveNotes();
    uiStore.update(s => ({ ...s, showNotes: false }));
  }
  
  function saveNotes() {
    gameStore.updateNotes(notesContent);
  }
  
  function handleInput() {
    // Auto-save after user stops typing for 1 second
    isAutoSaving = true;
    clearTimeout(autoSaveTimeout);
    autoSaveTimeout = setTimeout(() => {
      saveNotes();
      isAutoSaving = false;
    }, 1000);
  }
  
  function handleKeydown(event: KeyboardEvent) {
    // Prevent closing sidebar when typing
    event.stopPropagation();
    
    // Save on Ctrl+S
    if (event.ctrlKey && event.key === 's') {
      event.preventDefault();
      saveNotes();
    }
  }
  
  // Close on Escape key
  function handleGlobalKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape' && showSidebar) {
      close();
    }
  }
</script>

<svelte:window on:keydown={handleGlobalKeydown} />

{#if showSidebar}
  <div class="notes-sidebar" class:show={showSidebar}>
    <div class="notes-header">
      <div class="header-left">
        <h3>📝 Detective Notes</h3>
        <div class="auto-save-indicator" class:saving={isAutoSaving}>
          {isAutoSaving ? '💾 Saving...' : '✅ Saved'}
        </div>
      </div>
      <button class="close-btn" on:click={close}>×</button>
    </div>
    
    <div class="notes-content">
      <textarea 
        bind:value={notesContent}
        on:input={handleInput}
        on:keydown={handleKeydown}
        placeholder="📋 Your detective notes...

🕵️ Track suspects, motives, and alibis
⏰ Note important timelines and events  
🔍 Record your theories about the case
📝 Organize your thoughts and evidence

Tip: Press Ctrl+S to save manually"
        spellcheck="true"
      />
    </div>
    
    <div class="notes-footer">
      <div class="tips">
        <span>💡 Auto-saves as you type</span>
        <span>⌨️ Ctrl+S to save manually</span>
        <span>⎋ Esc to close</span>
      </div>
    </div>
  </div>
{/if}

<style>
  .notes-sidebar {
    position: fixed;
    top: 60px;
    right: -400px;
    width: 400px;
    height: calc(100vh - 60px);
    background: linear-gradient(135deg, rgba(15, 15, 25, 0.98), rgba(30, 30, 46, 0.98));
    backdrop-filter: blur(20px);
    border-left: 2px solid rgba(139, 92, 246, 0.3);
    z-index: 1000;
    display: flex;
    flex-direction: column;
    transition: right 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: -10px 0 30px rgba(0, 0, 0, 0.5);
  }
  
  .notes-sidebar.show {
    right: 0;
  }
  
  .notes-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem;
    border-bottom: 1px solid rgba(139, 92, 246, 0.2);
    background: rgba(139, 92, 246, 0.1);
  }
  
  .header-left h3 {
    color: #ffd700;
    margin: 0 0 0.5rem 0;
    font-size: 1.2rem;
  }
  
  .auto-save-indicator {
    font-size: 0.8rem;
    color: rgba(255, 255, 255, 0.6);
    transition: all 0.3s ease;
  }
  
  .auto-save-indicator.saving {
    color: #4ecdc4;
  }
  
  .close-btn {
    background: none;
    border: none;
    color: rgba(255, 255, 255, 0.7);
    font-size: 2rem;
    cursor: pointer;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
  }
  
  .close-btn:hover {
    background: rgba(255, 255, 255, 0.1);
    color: white;
  }
  
  .notes-content {
    flex: 1;
    padding: 1.5rem;
    overflow: hidden;
  }
  
  textarea {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(139, 92, 246, 0.2);
    border-radius: 8px;
    padding: 1rem;
    color: #e0e0e0;
    font-family: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;
    font-size: 0.9rem;
    line-height: 1.6;
    resize: none;
    outline: none;
    transition: all 0.2s ease;
  }
  
  textarea:focus {
    border-color: rgba(139, 92, 246, 0.5);
    background: rgba(0, 0, 0, 0.4);
    box-shadow: 0 0 0 2px rgba(139, 92, 246, 0.2);
  }
  
  textarea::placeholder {
    color: rgba(255, 255, 255, 0.4);
    line-height: 1.8;
  }
  
  .notes-footer {
    padding: 1rem 1.5rem;
    border-top: 1px solid rgba(139, 92, 246, 0.2);
    background: rgba(0, 0, 0, 0.2);
  }
  
  .tips {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    font-size: 0.75rem;
    color: rgba(255, 255, 255, 0.5);
  }
  
  .tips span {
    opacity: 0.7;
  }
  
  /* Scrollbar styling for textarea */
  textarea::-webkit-scrollbar {
    width: 6px;
  }
  
  textarea::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
  }
  
  textarea::-webkit-scrollbar-thumb {
    background: rgba(139, 92, 246, 0.3);
    border-radius: 3px;
  }
  
  textarea::-webkit-scrollbar-thumb:hover {
    background: rgba(139, 92, 246, 0.5);
  }
  
  @media (max-width: 768px) {
    .notes-sidebar {
      width: 100vw;
      height: 50vh;
      top: auto;
      bottom: -50vh;
      right: 0;
      transition: bottom 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      border-left: none;
      border-top: 2px solid rgba(139, 92, 246, 0.3);
    }
    
    .notes-sidebar.show {
      bottom: 0;
    }
    
    .notes-header {
      padding: 1rem;
    }
    
    .notes-content {
      padding: 1rem;
    }
    
    .tips {
      font-size: 0.7rem;
    }
  }
  
  @media (max-width: 480px) {
    .notes-sidebar {
      height: 60vh;
      bottom: -60vh;
    }
    
    .header-left h3 {
      font-size: 1rem;
    }
    
    textarea {
      font-size: 0.85rem;
    }
  }
</style>