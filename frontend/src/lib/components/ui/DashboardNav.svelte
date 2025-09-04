<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { gameStore, uiStore, currentCase } from '../../stores/game.store';
  import { scenarioStore } from '../../stores/scenario.store';
  import { statsStore } from '../../stores/stats.store';
  import GameClock from './GameClock.svelte';
  
  let timeElapsed = 0;
  let sessionTimeElapsed = 0;
  let interval: number;
  let statsInterval: number;
  
  $: caseTitle = $currentCase?.title || 'Investigation';
  $: gameStartTime = $gameStore.gameStartTime;
  
  onMount(() => {
    // Load previous play time for this case
    if ($gameStore.caseId) {
      const caseStats = statsStore.getCaseStats($gameStore.caseId);
      if (caseStats) {
        timeElapsed = caseStats.playTime;
      }
    }
    
    // Update time every second
    interval = setInterval(() => {
      if (gameStartTime) {
        const start = new Date(gameStartTime).getTime();
        const now = Date.now();
        sessionTimeElapsed = Math.floor((now - start) / 1000);
      }
    }, 1000);
    
    // Update stats every 10 seconds
    statsInterval = setInterval(() => {
      if ($gameStore.caseId && sessionTimeElapsed > 0) {
        statsStore.updatePlayTime($gameStore.caseId, 10);
        timeElapsed += 10;
      }
    }, 10000);
  });
  
  onDestroy(() => {
    if (interval) clearInterval(interval);
    if (statsInterval) clearInterval(statsInterval);
    
    // Save final play time
    if ($gameStore.caseId && sessionTimeElapsed > 0) {
      const remainingSeconds = sessionTimeElapsed % 10;
      if (remainingSeconds > 0) {
        statsStore.updatePlayTime($gameStore.caseId, remainingSeconds);
      }
    }
  });
  
  function formatTime(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    } else if (minutes > 0) {
      return `${minutes}m ${secs}s`;
    } else {
      return `${secs}s`;
    }
  }
  
  function handleBackToCases() {
    if (confirm('Return to case selection? Your progress will be saved.')) {
      scenarioStore.navigateTo('selection');
    }
  }
  
  function openHelp() {
    uiStore.update(s => ({ ...s, showHowToPlay: true }));
  }
  
  function openSettings() {
    uiStore.update(s => ({ ...s, showSettings: true }));
  }
  
  function openCharacters() {
    uiStore.update(s => ({ ...s, showCharacters: !s.showCharacters }));
  }
</script>

<div class="dashboard-nav">
  <!-- Left Section -->
  <div class="nav-section nav-left">
    <button class="nav-btn back-btn" on:click={handleBackToCases} title="Back to Cases">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="15 18 9 12 15 6" />
      </svg>
      <span class="btn-text">Cases</span>
    </button>
    
    <div class="case-info">
      <div class="case-title">{caseTitle}</div>
      <div class="case-stats">
        <span class="stat-item">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          {formatTime(timeElapsed)}
        </span>
        <span class="stat-item">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
          </svg>
          {$gameStore.evidenceDiscovered.length} clues
        </span>
      </div>
    </div>
  </div>
  
  <!-- Center Section - Game Actions -->
  <div class="nav-section nav-center">
    <button 
      class="nav-btn primary-btn mobile-only"
      class:active={$uiStore.showCharacters}
      on:click={openCharacters}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
      <span class="btn-text">People</span>
    </button>
  </div>
  
  <!-- Right Section -->
  <div class="nav-section nav-right">
    <GameClock />
    
    <button class="nav-btn icon-btn" on:click={openHelp} title="Help">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    </button>
    
    <button class="nav-btn icon-btn" on:click={openSettings} title="Settings">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v6m0 6v6m4.22-13.22l4.24 4.24M3.54 18.46l4.24-4.24M1 12h6m6 0h6m-13.22 4.22l4.24-4.24M18.46 3.54l-4.24 4.24" />
      </svg>
    </button>
  </div>
</div>

<style>
  .dashboard-nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 70px;
    background: linear-gradient(135deg, rgba(20, 20, 35, 0.98), rgba(30, 30, 50, 0.98));
    backdrop-filter: blur(20px);
    border-bottom: 2px solid rgba(255, 215, 0, 0.2);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1.5rem;
    z-index: 2000;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.5);
  }
  
  .nav-section {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  
  .nav-left {
    flex: 1;
    justify-content: flex-start;
  }
  
  .nav-center {
    flex: 0 1 auto;
    justify-content: center;
    gap: 0.5rem;
  }
  
  .nav-right {
    flex: 1;
    justify-content: flex-end;
  }
  
  .nav-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.6rem 1rem;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 0.5rem;
    color: #ccc;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 0.9rem;
    font-weight: 500;
  }
  
  .nav-btn:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 215, 0, 0.3);
    color: #fff;
    transform: translateY(-1px);
  }
  
  .back-btn {
    background: rgba(139, 92, 246, 0.1);
    border-color: rgba(139, 92, 246, 0.3);
  }
  
  .back-btn:hover {
    background: rgba(139, 92, 246, 0.2);
    border-color: rgba(139, 92, 246, 0.5);
  }
  
  .primary-btn {
    background: linear-gradient(135deg, rgba(255, 215, 0, 0.1), rgba(255, 107, 0, 0.1));
    border-color: rgba(255, 215, 0, 0.3);
    color: #ffd700;
  }
  
  .primary-btn:hover {
    background: linear-gradient(135deg, rgba(255, 215, 0, 0.2), rgba(255, 107, 0, 0.2));
    border-color: rgba(255, 215, 0, 0.5);
    box-shadow: 0 2px 12px rgba(255, 215, 0, 0.2);
  }
  
  .primary-btn.active {
    background: linear-gradient(135deg, rgba(255, 215, 0, 0.3), rgba(255, 107, 0, 0.3));
    border-color: rgba(255, 215, 0, 0.6);
    color: #fff;
    box-shadow: 0 2px 16px rgba(255, 215, 0, 0.3);
  }
  
  .icon-btn {
    padding: 0.6rem;
    background: rgba(255, 255, 255, 0.05);
  }
  
  .btn-text {
    font-weight: 500;
  }
  
  .case-info {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    padding-left: 1rem;
    border-left: 2px solid rgba(255, 215, 0, 0.3);
  }
  
  .case-title {
    font-size: 1.1rem;
    font-weight: 700;
    color: #ffd700;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  }
  
  .case-stats {
    display: flex;
    gap: 1rem;
    font-size: 0.85rem;
    color: #aaa;
  }
  
  .stat-item {
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }
  
  .stat-item svg {
    opacity: 0.7;
  }
  
  .mobile-only {
    display: none;
  }
  
  @media (max-width: 768px) {
    .mobile-only {
      display: flex;
    }
  }
  
  @media (max-width: 1024px) {
    .dashboard-nav {
      padding: 0 1rem;
    }
    
    .nav-center {
      padding: 0 1rem;
    }
    
    .btn-text {
      display: none;
    }
    
    .nav-btn {
      padding: 0.6rem;
    }
    
    .primary-btn {
      padding: 0.6rem 0.8rem;
    }
  }
  
  @media (max-width: 640px) {
    .dashboard-nav {
      height: 60px;
      padding: 0 0.5rem;
    }
    
    .nav-section {
      gap: 0.5rem;
    }
    
    .case-info {
      display: none;
    }
    
    .nav-left {
      flex: 0;
    }
    
    .nav-center {
      flex: 1;
      padding: 0;
    }
    
    .nav-btn svg {
      width: 18px;
      height: 18px;
    }
  }
</style>