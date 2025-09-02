<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { gameStore } from '../../stores/game.store';
  
  let currentTime = '';
  let startTime: Date | null = null;
  let investigationStartTime: Date | null = null;
  let interval: number | null = null;
  let isTabActive = true;
  
  // Get the times from the store
  $: if ($gameStore.gameStartTime && $gameStore.investigationStartTime && !startTime) {
    startTime = new Date($gameStore.gameStartTime);
    investigationStartTime = new Date($gameStore.investigationStartTime);
    updateClock();
    
    // Start interval if not already running
    if (!interval) {
      interval = setInterval(updateClock, 1000);
    }
  }
  
  function formatTime(date: Date): string {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    
    return `${displayHours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ${ampm}`;
  }
  
  function updateClock() {
    if (!startTime || !investigationStartTime || !isTabActive) return;
    
    const now = new Date();
    const elapsed = now.getTime() - startTime.getTime();
    const gameTime = new Date(investigationStartTime.getTime() + elapsed);
    
    currentTime = formatTime(gameTime);
  }
  
  function handleVisibilityChange() {
    isTabActive = !document.hidden;
    if (isTabActive && startTime) {
      updateClock();
      if (!interval) {
        interval = setInterval(updateClock, 1000);
      }
    } else if (interval) {
      clearInterval(interval);
      interval = null;
    }
  }
  
  onMount(() => {
    // Set up visibility change listener
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Start the clock if game has started
    if ($gameStore.gameStartTime && $gameStore.investigationStartTime) {
      startTime = new Date($gameStore.gameStartTime);
      investigationStartTime = new Date($gameStore.investigationStartTime);
      updateClock();
      interval = setInterval(updateClock, 1000);
    }
  });
  
  onDestroy(() => {
    if (interval) {
      clearInterval(interval);
    }
    document.removeEventListener('visibilitychange', handleVisibilityChange);
  });
</script>

{#if currentTime}
  <div class="game-clock">
    <div class="clock-icon">🕐</div>
    <div class="clock-display">
      <div class="clock-label">Investigation Time</div>
      <div class="clock-time">{currentTime}</div>
    </div>
  </div>
{:else if $gameStore.gameStartTime}
  <div class="game-clock">
    <div class="clock-icon">🕐</div>
    <div class="clock-display">
      <div class="clock-label">Investigation Time</div>
      <div class="clock-time">Starting...</div>
    </div>
  </div>
{/if}

<style>
  .game-clock {
    background: rgba(255, 215, 0, 0.1);
    border: 1px solid rgba(255, 215, 0, 0.3);
    border-radius: 8px;
    padding: 8px 12px;
    display: flex;
    align-items: center;
    gap: 8px;
    backdrop-filter: blur(10px);
    animation: slideIn 0.5s ease-out;
  }
  
  .clock-icon {
    font-size: 1.2rem;
    animation: tick 2s ease-in-out infinite;
  }
  
  .clock-display {
    display: flex;
    flex-direction: column;
    gap: 1px;
  }
  
  .clock-label {
    font-size: 0.65rem;
    color: #ffd700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    opacity: 0.9;
    line-height: 1;
  }
  
  .clock-time {
    font-family: 'Courier New', monospace;
    font-size: 0.9rem;
    color: #ffffff;
    font-weight: bold;
    letter-spacing: 0.5px;
    line-height: 1;
  }
  
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes tick {
    0%, 100% {
      transform: rotate(0deg);
    }
    25% {
      transform: rotate(10deg);
    }
    75% {
      transform: rotate(-10deg);
    }
  }
  
  @media (max-width: 768px) {
    .game-clock {
      top: 10px;
      right: 10px;
      padding: 8px 12px;
    }
    
    .clock-icon {
      font-size: 1.2rem;
    }
    
    .clock-label {
      font-size: 0.65rem;
    }
    
    .clock-time {
      font-size: 0.9rem;
    }
  }
</style>