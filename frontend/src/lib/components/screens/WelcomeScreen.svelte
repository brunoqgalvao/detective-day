<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  function startGame() {
    dispatch('start');
  }
</script>

<div class="welcome-container" in:fade={{ duration: 500 }}>
  <div class="welcome-content" in:fly={{ y: 50, duration: 800, delay: 300 }}>
    <div class="logo-container">
      <h1 class="logo-text">🕵️</h1>
    </div>
    
    <h1 class="welcome-title">Detective Chronicles</h1>
    <p class="welcome-subtitle">Solve mysteries, uncover secrets, find the truth</p>
    
    <div class="features">
      <div class="feature">
        <span class="feature-icon">🔍</span>
        <span class="feature-text">Multiple Cases</span>
      </div>
      <div class="feature">
        <span class="feature-icon">🧩</span>
        <span class="feature-text">Challenging Puzzles</span>
      </div>
      <div class="feature">
        <span class="feature-icon">📊</span>
        <span class="feature-text">Track Your Progress</span>
      </div>
    </div>
    
    <button class="start-button" on:click={startGame}>
      <span>Choose Your Case</span>
      <span class="arrow">→</span>
    </button>
  </div>
</div>

<style>
  .welcome-container {
    position: fixed;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #1a1a2e 0%, #0f0f1e 100%);
    z-index: 100;
  }

  .welcome-content {
    text-align: center;
    padding: 3rem;
    max-width: 600px;
  }

  .logo-container {
    margin-bottom: 2rem;
  }

  .logo-text {
    font-size: 5rem;
    margin: 0;
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
  }

  .welcome-title {
    font-size: 3rem;
    font-weight: 800;
    background: linear-gradient(135deg, #ffd700, #ff6b35);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin: 0 0 1rem 0;
    letter-spacing: -0.02em;
  }

  .welcome-subtitle {
    font-size: 1.2rem;
    color: #888;
    margin: 0 0 3rem 0;
  }

  .features {
    display: flex;
    gap: 2rem;
    justify-content: center;
    margin-bottom: 3rem;
    flex-wrap: wrap;
  }

  .feature {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.25rem;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 2rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .feature-icon {
    font-size: 1.5rem;
  }

  .feature-text {
    color: #ccc;
    font-size: 0.95rem;
  }

  .start-button {
    display: inline-flex;
    align-items: center;
    gap: 1rem;
    padding: 1.25rem 2.5rem;
    font-size: 1.2rem;
    font-weight: 600;
    background: linear-gradient(135deg, #ffd700, #ff6b35);
    color: #1a1a2e;
    border: none;
    border-radius: 3rem;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 10px 30px rgba(255, 107, 53, 0.3);
  }

  .start-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 15px 40px rgba(255, 107, 53, 0.4);
  }

  .arrow {
    display: inline-block;
    transition: transform 0.3s ease;
  }

  .start-button:hover .arrow {
    transform: translateX(5px);
  }

  @media (max-width: 640px) {
    .welcome-title {
      font-size: 2rem;
    }

    .features {
      flex-direction: column;
      gap: 1rem;
    }

    .logo-text {
      font-size: 3rem;
    }
  }
</style>