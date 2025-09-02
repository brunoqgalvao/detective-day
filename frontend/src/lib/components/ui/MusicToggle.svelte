<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  
  let audio: HTMLAudioElement;
  let isPlaying = true;
  let isMuted = false;
  let volume = 0.3;
  let isLoaded = false;
  
  const musicUrl = '/audio/background-music.mp3';
  
  onMount(() => {
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
    
    const savedMusicState = localStorage.getItem('musicEnabled');
    if (savedMusicState !== 'false') {
      playMusic();
    }
  });
  
  onDestroy(() => {
    if (audio) {
      audio.pause();
      audio = null;
    }
  });
  
  function playMusic() {
    if (audio && isLoaded) {
      audio.play().then(() => {
        isPlaying = true;
        localStorage.setItem('musicEnabled', 'true');
      }).catch(err => {
        console.error('Failed to play music:', err);
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
</script>

<div class="music-controls">
  <button 
    class="music-toggle"
    on:click={toggleMusic}
    title={isPlaying ? 'Pause Music' : 'Play Music'}
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
  
  {#if isPlaying}
    <button 
      class="mute-toggle"
      on:click={toggleMute}
      title={isMuted ? 'Unmute' : 'Mute'}
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
      title="Volume"
    />
  {/if}
  
  {#if !isLoaded}
    <span class="no-music-text">No music file</span>
  {/if}
</div>

<style>
  .music-controls {
    position: fixed;
    bottom: 20px;
    right: 20px;
    display: flex;
    align-items: center;
    gap: 10px;
    background: rgba(30, 30, 46, 0.95);
    padding: 10px 15px;
    border-radius: 25px;
    border: 1px solid rgba(139, 92, 246, 0.3);
    backdrop-filter: blur(10px);
    z-index: 1000;
    transition: all 0.3s ease;
  }
  
  .music-controls:hover {
    border-color: rgba(139, 92, 246, 0.6);
    box-shadow: 0 4px 20px rgba(139, 92, 246, 0.2);
  }
  
  .music-toggle,
  .mute-toggle {
    background: none;
    border: none;
    color: #8b5cf6;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px;
    transition: all 0.2s ease;
  }
  
  .music-toggle:hover:not(:disabled),
  .mute-toggle:hover {
    color: #a78bfa;
    transform: scale(1.1);
  }
  
  .music-toggle:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  .volume-slider {
    width: 80px;
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
    width: 12px;
    height: 12px;
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
    width: 12px;
    height: 12px;
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
  
  .no-music-text {
    font-size: 12px;
    color: rgba(139, 92, 246, 0.6);
    margin-left: 5px;
  }
  
  @media (max-width: 768px) {
    .music-controls {
      bottom: 10px;
      right: 10px;
      padding: 8px 12px;
    }
    
    .volume-slider {
      width: 60px;
    }
  }
</style>