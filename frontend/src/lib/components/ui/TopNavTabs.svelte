<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { gameStore, uiStore } from '../../stores/game.store';
  import { api } from '../../services/api';
  import GameClock from './GameClock.svelte';
  
  let audio: HTMLAudioElement;
  let isPlaying = false;
  let isMuted = false;
  let volume = 0.3;
  let isLoaded = false;
  let showVolumeControl = false;
  let showMenu = false;
  
  const musicUrl = '/audio/background-music.mp3';
  
  onMount(() => {
    document.addEventListener('click', handleClickOutside);
    window.addEventListener('startMusic', handleStartMusicEvent);
    
    audio = new Audio(musicUrl);
    audio.loop = true;
    audio.volume = volume;
    
    audio.addEventListener('canplaythrough', () => {
      isLoaded = true;
    });
    
    audio.addEventListener('error', (e) => {
      console.warn('Background music not found. Add your music file to /public/audio/background-music.mp3');
      isLoaded = false;
    });
    
    // Check if user previously enabled music
    const savedMusicState = localStorage.getItem('musicEnabled');
    if (savedMusicState === 'true') {
      // Try to autoplay if user previously enabled it, but expect it to be blocked
      setTimeout(() => {
        playMusic();
      }, 1000);
    }
  });
  
  onDestroy(() => {
    document.removeEventListener('click', handleClickOutside);
    window.removeEventListener('startMusic', handleStartMusicEvent);
    if (audio) {
      audio.pause();
      audio = null;
    }
  });
  
  function handleStartMusicEvent() {
    // This is called when the welcome nudge accepts music
    playMusic();
  }
  
  function playMusic() {
    if (audio) {
      audio.play().then(() => {
        isPlaying = true;
        localStorage.setItem('musicEnabled', 'true');
      }).catch(err => {
        console.log('Music autoplay blocked by browser. User interaction required.');
        isPlaying = false;
      });
    }
  }
  
  function pauseMusic() {
    if (audio) {
      audio.pause();
      isPlaying = false;
      localStorage.setItem('musicEnabled', 'false');
    }
  }
  
  function toggleMusic() {
    if (isPlaying) {
      pauseMusic();
    } else {
      playMusic();
    }
  }
  
  function toggleMute() {
    if (audio) {
      isMuted = !isMuted;
      audio.muted = isMuted;
    }
  }
  
  function handleVolumeChange(e: Event) {
    const target = e.target as HTMLInputElement;
    volume = parseFloat(target.value);
    if (audio) {
      audio.volume = volume;
    }
  }
  
  async function resetGame() {
    if (confirm('Are you sure you want to reset the game? All progress will be lost.')) {
      try {
        await api.resetGame();
        gameStore.reset();
        uiStore.setCurrentScreen('intro');
        window.location.reload();
      } catch (error) {
        console.error('Failed to reset game:', error);
      }
    }
  }
  
  function closeAllDropdowns() {
    showVolumeControl = false;
    showMenu = false;
  }
  
  function handleClickOutside(event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.header-bar')) {
      closeAllDropdowns();
    }
  }
</script>

<div class="header-bar">
  <div class="header-left">
    <div class="game-logo">🕵️</div>
    <div class="game-title">Westwood Manor</div>
  </div>
  
  <div class="header-right">
    <GameClock />
    
    <div class="header-tabs">
      <button 
        class="header-tab people-tab"
        class:active={$uiStore.showCharacters}
        on:click={() => uiStore.update(s => ({ ...s, showCharacters: !s.showCharacters }))}
        title="People"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
        <span class="tab-label">People</span>
      </button>
      <button 
        class="header-tab music-tab"
        class:active={showVolumeControl}
        on:click={() => {
          closeAllDropdowns();
          showVolumeControl = !showVolumeControl;
        }}
        title="Music Controls"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M9 18V5l12-2v13" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="18" cy="16" r="3" />
        </svg>
        <span class="tab-label">Music</span>
      </button>
      
      <button 
        class="header-tab menu-tab"
        class:active={showMenu}
        on:click={() => {
          closeAllDropdowns();
          showMenu = !showMenu;
        }}
        title="Menu"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
        <span class="tab-label">Menu</span>
      </button>
    </div>
  </div>
  
  {#if showVolumeControl}
    <div class="dropdown music-dropdown">
      <div class="dropdown-content">
        <div class="music-controls">
          <button 
            class="control-button"
            on:click={toggleMusic}
            disabled={!isLoaded}
          >
            {#if isPlaying}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="6" y="4" width="4" height="16" />
                <rect x="14" y="4" width="4" height="16" />
              </svg>
            {:else}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            {/if}
          </button>
          
          <button 
            class="control-button"
            on:click={toggleMute}
          >
            {#if isMuted}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <line x1="23" y1="9" x2="17" y2="15" />
                <line x1="17" y1="9" x2="23" y2="15" />
              </svg>
            {:else}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
              </svg>
            {/if}
          </button>
          
          <input 
            type="range" 
            min="0" 
            max="1" 
            step="0.1" 
            value={volume}
            on:input={handleVolumeChange}
            class="volume-slider"
          />
        </div>
        {#if !isLoaded}
          <div class="no-music-text">No music file loaded</div>
        {:else if !isPlaying}
          <div class="music-hint">Click play to start music</div>
        {/if}
      </div>
    </div>
  {/if}
  
  {#if showMenu}
    <div class="dropdown menu-dropdown">
      <div class="dropdown-content">
        <div class="menu-section">
          <h3>Settings</h3>
          <div class="settings-list">
            <label class="setting-item">
              <input type="checkbox" checked />
              <span>Show hints</span>
            </label>
            <label class="setting-item">
              <input type="checkbox" checked />
              <span>Auto-save progress</span>
            </label>
            <label class="setting-item">
              <input type="checkbox" />
              <span>Reduced motion</span>
            </label>
          </div>
        </div>
        
        <div class="menu-divider"></div>
        
        <div class="menu-section">
          <h3>Help</h3>
          <div class="help-content">
            <p><strong>Objective:</strong> Solve the mystery by gathering clues and identifying the culprit.</p>
            <p><strong>Investigation:</strong> Interview suspects, examine evidence, and build your case.</p>
            <p><strong>Deduction:</strong> Use logic to connect clues and uncover the truth.</p>
            <p><strong>Win Condition:</strong> Successfully identify the correct culprit with supporting evidence.</p>
          </div>
        </div>
        
        <div class="menu-divider"></div>
        
        <div class="menu-section">
          <button class="reset-button" on:click={resetGame}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="23 4 23 10 17 10" />
              <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
            </svg>
            Reset Game
          </button>
        </div>
      </div>
    </div>
  {/if}
</div>

<style>
  .header-bar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 60px;
    background: linear-gradient(135deg, rgba(15, 15, 25, 0.98), rgba(30, 30, 46, 0.98));
    backdrop-filter: blur(20px);
    border-bottom: 2px solid rgba(139, 92, 246, 0.3);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 2rem;
    z-index: 2000;
    box-shadow: 0 4px 32px rgba(139, 92, 246, 0.2);
  }

  .header-left {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .game-logo {
    font-size: 2rem;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.5));
  }

  .game-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: #ffd700;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
    font-family: 'Georgia', serif;
  }

  .header-right {
    display: flex;
    align-items: center;
    gap: 1.5rem;
  }

  .header-tabs {
    display: flex;
    gap: 2px;
    height: 100%;
    align-items: flex-end;
  }
  
  .header-tab {
    background: linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(30, 30, 46, 0.8));
    border: 1px solid rgba(139, 92, 246, 0.3);
    border-bottom: none;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    padding: 8px 16px;
    color: #c4b5fd;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    font-weight: 500;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    height: 40px;
    backdrop-filter: blur(10px);
  }
  /* Hide People tab by default (desktop) */
  .people-tab { display: none; }
  
  .header-tab:hover {
    background: linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(30, 30, 46, 0.9));
    border-color: rgba(139, 92, 246, 0.5);
    color: #ddd6fe;
    box-shadow: 0 2px 12px rgba(139, 92, 246, 0.3);
  }
  
  .header-tab.active {
    background: linear-gradient(135deg, rgba(139, 92, 246, 0.4), rgba(30, 30, 46, 0.98));
    border-color: rgba(139, 92, 246, 0.8);
    color: #f3f4f6;
    box-shadow: 0 2px 12px rgba(139, 92, 246, 0.4);
  }
  
  .tab-label {
    transition: all 0.3s ease;
    font-weight: 500;
  }
  
  .dropdown {
    position: fixed;
    top: 60px;
    animation: slideDown 0.3s ease;
    z-index: 2001;
  }
  
  .music-dropdown {
    right: 140px;
  }
  
  .menu-dropdown {
    right: 40px;
  }
  
  .dropdown-content {
    background: rgba(15, 15, 25, 0.98);
    border: 2px solid rgba(139, 92, 246, 0.8);
    border-radius: 12px;
    padding: 24px;
    backdrop-filter: blur(15px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.7);
    width: 320px;
    max-width: calc(100vw - 40px);
    max-height: 500px;
    overflow-y: auto;
  }
  
  
  .music-controls {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  
  .control-button {
    background: none;
    border: 1px solid rgba(139, 92, 246, 0.3);
    border-radius: 6px;
    color: #8b5cf6;
    cursor: pointer;
    padding: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
  }
  
  .control-button:hover:not(:disabled) {
    background: rgba(139, 92, 246, 0.1);
    border-color: #8b5cf6;
    transform: scale(1.05);
  }
  
  .control-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  .volume-slider {
    width: 100px;
    height: 4px;
    -webkit-appearance: none;
    appearance: none;
    background: rgba(139, 92, 246, 0.2);
    border-radius: 2px;
    outline: none;
  }
  
  .volume-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 14px;
    height: 14px;
    background: #8b5cf6;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  
  .volume-slider::-webkit-slider-thumb:hover {
    background: #a78bfa;
    transform: scale(1.2);
  }
  
  .volume-slider::-moz-range-thumb {
    width: 14px;
    height: 14px;
    background: #8b5cf6;
    border-radius: 50%;
    cursor: pointer;
    border: none;
    transition: all 0.2s ease;
  }
  
  .volume-slider::-moz-range-thumb:hover {
    background: #a78bfa;
    transform: scale(1.2);
  }
  
  .no-music-text,
  .music-hint {
    margin-top: 10px;
    font-size: 12px;
    color: rgba(139, 92, 246, 0.6);
    text-align: center;
  }
  
  .music-hint {
    color: rgba(139, 92, 246, 0.8);
  }
  
  .dropdown h3 {
    margin: 0 0 15px 0;
    color: #a78bfa;
    font-size: 16px;
    font-weight: 600;
  }
  
  .settings-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  
  .setting-item {
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    color: #e0e0e0;
    font-size: 14px;
  }
  
  .setting-item input[type="checkbox"] {
    width: 18px;
    height: 18px;
    accent-color: #8b5cf6;
  }
  
  .setting-item:hover {
    color: #a78bfa;
  }
  
  .help-content {
    color: #e0e0e0;
    font-size: 14px;
    line-height: 1.6;
  }
  
  .help-content p {
    margin: 0 0 12px 0;
  }
  
  .help-content p:last-child {
    margin-bottom: 0;
  }
  
  .help-content strong {
    color: #a78bfa;
  }
  
  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .menu-section {
    margin-bottom: 20px;
  }
  
  .menu-section:last-child {
    margin-bottom: 0;
  }
  
  .menu-divider {
    height: 2px;
    background: linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.5), transparent);
    margin: 20px 0;
    border-radius: 1px;
  }
  
  .reset-button {
    width: 100%;
    background: linear-gradient(135deg, rgba(220, 38, 38, 0.8), rgba(185, 28, 28, 0.8));
    border: 2px solid rgba(239, 68, 68, 0.6);
    border-radius: 8px;
    color: #fecaca;
    padding: 12px 16px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transition: all 0.2s ease;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8);
  }
  
  .reset-button:hover {
    background: linear-gradient(135deg, rgba(239, 68, 68, 0.9), rgba(220, 38, 38, 0.9));
    border-color: #ef4444;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(239, 68, 68, 0.4);
  }
  
  @media (max-width: 768px) {
    .header-bar {
      padding: 0 1rem;
      height: 56px;
    }
    /* Hide logo and title to reduce crowding on mobile */
    .game-title,
    .game-logo { display: none; }
    .header-right {
      gap: 0.75rem;
    }
    .header-tab {
      padding: 6px 10px;
      font-size: 12px;
      height: 36px;
    }
    /* Icon-only tabs to reduce crowding */
    .tab-label { display: none; }
    /* Show People tab on mobile and place first */
    .people-tab { display: flex; order: -1; }
    .people-tab {
      order: -1;
    }
    .header-tab svg {
      width: 16px;
      height: 16px;
    }
    /* Compact dropdown on small screens */
    .dropdown-content {
      min-width: 200px;
      padding: 15px;
    }
    /* Keep dropdowns inside viewport */
    .music-dropdown {
      right: 110px;
    }
    .menu-dropdown {
      right: 10px;
    }
  }

  @media (max-width: 420px) {
    /* Hide text labels to save space; use icons only */
    .tab-label {
      display: none;
    }
    .game-title {
      display: none;
    }
    .header-right {
      gap: 0.5rem;
    }
  }
</style>
