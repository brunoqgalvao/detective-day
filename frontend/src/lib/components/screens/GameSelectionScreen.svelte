<script lang="ts">
  import { fade, fly, scale } from 'svelte/transition';
  import { createEventDispatcher, onMount } from 'svelte';
  import type { GameScenario } from '../../types/scenario.types';
  import { statsStore, formatPlayTime } from '../../stores/stats.store';
  
  export let scenarios: GameScenario[] = [];
  
  const dispatch = createEventDispatcher();
  
  // Map scenario IDs to case IDs
  const scenarioToCaseMap: Record<string, string> = {
    'mansion-murder': 'westwood',
    'cyber-heist': 'cyber-heist',
    'art-forgery': 'art-forgery'
  };
  
  let caseStats: Record<string, any> = {};
  
  onMount(() => {
    // Load stats for each scenario
    const stats = statsStore.getCaseStats.bind(statsStore);
    scenarios.forEach(scenario => {
      const caseId = scenarioToCaseMap[scenario.id] || scenario.id;
      const stat = stats(caseId);
      if (stat) {
        caseStats[scenario.id] = stat;
      }
    });
  });
  
  function selectGame(scenario: GameScenario) {
    if (!scenario.isLocked) {
      dispatch('select', { scenario });
    }
  }
  
  function goBack() {
    dispatch('back');
  }
  
  function getDifficultyColor(difficulty: string) {
    switch(difficulty) {
      case 'easy': return '#4ade80';
      case 'medium': return '#fbbf24';
      case 'hard': return '#fb923c';
      case 'expert': return '#ef4444';
      default: return '#888';
    }
  }
</script>

<div class="selection-container" in:fade={{ duration: 300 }}>
  <header class="selection-header">
    <button class="back-button" on:click={goBack}>
      ← Back
    </button>
    <h1 class="selection-title">Choose Your Case</h1>
    <div class="header-spacer"></div>
  </header>
  
  <div class="scenarios-grid">
    {#each scenarios as scenario, i}
      <div 
        class="scenario-card {scenario.isLocked ? 'locked' : ''} {caseStats[scenario.id]?.completed ? 'completed' : ''}"
        in:fly={{ y: 50, duration: 500, delay: i * 100 }}
        on:click={() => selectGame(scenario)}
        role="button"
        tabindex="0"
        on:keydown={(e) => e.key === 'Enter' && selectGame(scenario)}
      >
        {#if scenario.isPremium}
          <div class="premium-badge">PREMIUM</div>
        {/if}
        
        {#if caseStats[scenario.id]?.completed}
          <div class="completed-badge">✓ SOLVED</div>
        {/if}
        
        {#if scenario.isLocked}
          <div class="lock-overlay">
            <span class="lock-icon">🔒</span>
            {#if scenario.unlockCondition}
              <span class="unlock-text">{scenario.unlockCondition}</span>
            {/if}
          </div>
        {/if}
        
        <div class="scenario-thumbnail" style="background: linear-gradient(135deg, {scenario.theme.primaryColor}, {scenario.theme.secondaryColor})">
          {#if scenario.thumbnailType === 'image'}
            <img src={scenario.thumbnail} alt={scenario.title} class="scenario-image" />
          {:else}
            <span class="scenario-icon">{scenario.thumbnail}</span>
          {/if}
        </div>
        
        <div class="scenario-content">
          <h3 class="scenario-title">{scenario.title}</h3>
          <p class="scenario-subtitle">{scenario.subtitle}</p>
          
          <div class="scenario-meta">
            <span class="difficulty" style="color: {getDifficultyColor(scenario.difficulty)}">
              {scenario.difficulty.toUpperCase()}
            </span>
            <span class="time">⏱️ {scenario.estimatedTime}</span>
          </div>
          
          {#if caseStats[scenario.id]}
            <div class="play-stats">
              {#if caseStats[scenario.id].playTime > 0}
                <span class="stat-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  {formatPlayTime(caseStats[scenario.id].playTime)}
                </span>
              {/if}
              {#if caseStats[scenario.id].evidenceFound > 0}
                <span class="stat-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.35-4.35" />
                  </svg>
                  {caseStats[scenario.id].evidenceFound} clues
                </span>
              {/if}
            </div>
          {/if}
          
          <p class="scenario-description">{scenario.description}</p>
          
          <div class="scenario-tags">
            {#each scenario.tags as tag}
              <span class="tag">#{tag}</span>
            {/each}
          </div>
          
          {#if !scenario.isLocked}
            <button class="play-button {caseStats[scenario.id]?.completed ? 'play-again' : ''}">
              {caseStats[scenario.id]?.completed ? 'Play Again ↻' : 'Play Now →'}
            </button>
          {/if}
        </div>
      </div>
    {/each}
  </div>
</div>

<style>
  .selection-container {
    min-height: 100vh;
    background: linear-gradient(135deg, #1a1a2e 0%, #0f0f1e 100%);
    padding: 2rem;
  }
  
  .selection-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 3rem;
    max-width: 1400px;
    margin-left: auto;
    margin-right: auto;
  }
  
  .back-button {
    padding: 0.75rem 1.5rem;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: white;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .back-button:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: translateX(-2px);
  }
  
  .selection-title {
    font-size: 2.5rem;
    font-weight: 800;
    background: linear-gradient(135deg, #ffd700, #ff6b35);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin: 0;
  }
  
  .header-spacer {
    width: 100px;
  }
  
  .scenarios-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 2rem;
    max-width: 1400px;
    margin: 0 auto;
  }
  
  .scenario-card {
    position: relative;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 1rem;
    overflow: hidden;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .scenario-card:hover:not(.locked) {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    border-color: rgba(255, 255, 255, 0.2);
  }
  
  .scenario-card.locked {
    cursor: not-allowed;
    opacity: 0.7;
  }
  
  .scenario-card.completed {
    background: rgba(74, 222, 128, 0.05);
    border-color: rgba(74, 222, 128, 0.3);
  }
  
  .scenario-card.completed:hover {
    border-color: rgba(74, 222, 128, 0.5);
    box-shadow: 0 20px 40px rgba(74, 222, 128, 0.15);
  }
  
  .premium-badge {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: linear-gradient(135deg, #ffd700, #ffed4e);
    color: #1a1a2e;
    padding: 0.25rem 0.75rem;
    border-radius: 2rem;
    font-size: 0.75rem;
    font-weight: 700;
    z-index: 2;
  }
  
  .completed-badge {
    position: absolute;
    top: 1rem;
    left: 1rem;
    background: linear-gradient(135deg, #4ade80, #22c55e);
    color: white;
    padding: 0.25rem 0.75rem;
    border-radius: 2rem;
    font-size: 0.75rem;
    font-weight: 700;
    z-index: 2;
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }
  
  .lock-overlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 3;
    backdrop-filter: blur(2px);
  }
  
  .lock-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
  }
  
  .unlock-text {
    color: #aaa;
    font-size: 0.9rem;
    text-align: center;
    padding: 0 1rem;
  }
  
  .scenario-thumbnail {
    height: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }
  
  .scenario-icon {
    font-size: 4rem;
  }
  
  .scenario-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.9;
  }
  
  .scenario-content {
    padding: 1.5rem;
  }
  
  .scenario-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: white;
    margin: 0 0 0.5rem 0;
  }
  
  .scenario-subtitle {
    color: #888;
    margin: 0 0 1rem 0;
    font-size: 0.95rem;
  }
  
  .play-stats {
    display: flex;
    gap: 1rem;
    margin: 0.75rem 0;
    padding: 0.75rem;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 0.5rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .stat-item {
    display: flex;
    align-items: center;
    gap: 0.35rem;
    color: #aaa;
    font-size: 0.85rem;
  }
  
  .stat-item svg {
    opacity: 0.7;
  }
  
  .scenario-meta {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
  }
  
  .difficulty {
    font-weight: 700;
    font-size: 0.85rem;
  }
  
  .time {
    color: #aaa;
    font-size: 0.9rem;
  }
  
  .scenario-description {
    color: #ccc;
    line-height: 1.5;
    margin: 0 0 1rem 0;
    font-size: 0.95rem;
  }
  
  .scenario-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
  }
  
  .tag {
    padding: 0.25rem 0.75rem;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 1rem;
    color: #aaa;
    font-size: 0.8rem;
  }
  
  .play-button {
    width: 100%;
    padding: 0.75rem;
    background: linear-gradient(135deg, #4ade80, #22c55e);
    color: white;
    border: none;
    border-radius: 0.5rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .play-button:hover {
    transform: scale(1.02);
    box-shadow: 0 10px 20px rgba(74, 222, 128, 0.3);
  }
  
  .play-button.play-again {
    background: linear-gradient(135deg, #60a5fa, #3b82f6);
  }
  
  .play-button.play-again:hover {
    box-shadow: 0 10px 20px rgba(59, 130, 246, 0.3);
  }
  
  @media (max-width: 768px) {
    .selection-header {
      flex-direction: column;
      gap: 1rem;
    }
    
    .header-spacer {
      display: none;
    }
    
    .scenarios-grid {
      grid-template-columns: 1fr;
    }
  }
</style>