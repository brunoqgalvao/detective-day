<script lang="ts">
  import { availableCases, currentCase, gameStore, uiStore } from '../../stores/game.store';
  import { api } from '../../services/api';
  import HowToPlayModal from '../modals/HowToPlayModal.svelte';

  async function startCase(caseId: string) {
    try {
      uiStore.update(s => ({ ...s, loading: true }));
      
      // Load case data
      const caseData = await api.getCase(caseId);
      currentCase.set(caseData);
      
      // Initialize game state
      await gameStore.initCase(caseId);
      
      // Navigate to investigation screen
      uiStore.update(s => ({ 
        ...s, 
        currentScreen: 'investigation',
        loading: false 
      }));
    } catch (error) {
      console.error('Failed to start case:', error);
      uiStore.update(s => ({ ...s, loading: false }));
    }
  }
</script>

<div class="intro-screen">
  <h1>Detective Day</h1>
  
  <div class="cases-container">
    <h2>The Westwood Manor Murder</h2>
    
    {#if $availableCases.length > 0}
      <div class="case-intro">
        <div class="crime-scene-image">
          <img src="/images/crime-scene/manor_exterior.png" alt="Westwood Manor at night" />
        </div>
        
        <div class="case-details">
          <p><strong>Date:</strong> October 15th, 2024 - 11:47 PM</p>
          <p><strong>Location:</strong> Westwood Manor, Countryside Estate</p>
          
          <p>You've been called to investigate a murder at the prestigious Westwood Manor. The victim is <strong>Victor Westwood</strong>, 52, a wealthy tech entrepreneur and owner of the estate. He was found dead in his study at approximately 10:30 PM by the manor's butler.</p>
          
          <p><strong>Crime Scene Details:</strong></p>
          <ul>
            <li>The victim was found slumped over his desk with signs of poisoning</li>
            <li>A glass of whiskey was found on the desk, half-consumed</li>
            <li>The study door was locked from the inside</li>
            <li>No signs of struggle were apparent</li>
            <li>The window was slightly ajar despite the cold weather</li>
          </ul>
          
          <p><strong>Initial Information:</strong></p>
          <p>A dinner party was being held at the manor tonight with family and close associates. All guests are still present and have been asked to remain for questioning.</p>
        </div>
        
        <div class="intro-buttons">
          <button 
            class="btn-primary"
            on:click={() => startCase('westwood')}
            disabled={$uiStore.loading}
          >
            Begin Investigation
          </button>
          <button 
            class="btn-secondary"
            on:click={() => uiStore.update(s => ({ ...s, showHowToPlay: true }))}
          >
            How to Play
          </button>
        </div>
      </div>
    {:else}
      <p>Loading case data...</p>
    {/if}
  </div>
</div>

<HowToPlayModal />

<style>
  .intro-screen {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding: 2rem;
    background: radial-gradient(ellipse at center, #2d2d44 0%, #1e1e2e 100%);
  }

  h1 {
    font-size: 4rem;
    margin-bottom: 2rem;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
    background: linear-gradient(45deg, #ffd700, #ffed4e);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .cases-container {
    background: rgba(0,0,0,0.3);
    padding: 2rem;
    border-radius: 15px;
    max-width: 800px;
    width: 100%;
    backdrop-filter: blur(10px);
  }

  h2 {
    color: #ff6b6b;
    margin-bottom: 1.5rem;
    text-align: center;
    font-size: 2rem;
  }

  .cases-grid {
    display: grid;
    gap: 1.5rem;
  }

  .case-card {
    background: rgba(255,255,255,0.05);
    padding: 1.5rem;
    border-radius: 10px;
    border: 1px solid rgba(255,255,255,0.1);
    transition: all 0.3s;
  }

  .case-card:hover {
    background: rgba(255,255,255,0.08);
    border-color: #ffd700;
  }

  .case-card h3 {
    color: #ffd700;
    margin-bottom: 1rem;
  }

  .case-card p {
    color: #e0e0e0;
    line-height: 1.6;
    margin-bottom: 1.5rem;
  }

  .btn-primary {
    background: linear-gradient(45deg, #ff6b6b, #ff8787);
    color: white;
    border: none;
    padding: 1rem 2rem;
    font-size: 1.1rem;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s;
    font-family: inherit;
    width: 100%;
  }

  .btn-primary:hover:not(:disabled) {
    transform: scale(1.05);
    box-shadow: 0 5px 15px rgba(255,107,107,0.4);
  }

  .btn-primary:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  .case-intro {
    width: 100%;
  }
  
  .crime-scene-image {
    width: 100%;
    max-width: 600px;
    margin: 1.5rem auto;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
  }
  
  .crime-scene-image img {
    width: 100%;
    height: auto;
    display: block;
  }
  
  .case-details {
    margin-bottom: 2rem;
    line-height: 1.8;
    font-size: 1.1rem;
    text-align: left;
  }
  
  .case-details p {
    margin-bottom: 1rem;
  }
  
  .case-details ul {
    margin: 1rem 0;
    padding-left: 2rem;
  }
  
  .case-details li {
    margin-bottom: 0.5rem;
  }
  
  .case-details strong {
    color: #ffd700;
    font-weight: bold;
  }
  
  .intro-buttons {
    display: flex;
    gap: 1rem;
    flex-direction: column;
    max-width: 300px;
    margin: 0 auto;
  }
  
  .btn-secondary {
    background: rgba(255,255,255,0.1);
    color: #e0e0e0;
    border: 1px solid rgba(255,255,255,0.2);
    padding: 1rem 2rem;
    font-size: 1.1rem;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s;
    font-family: inherit;
    width: 100%;
  }
  
  .btn-secondary:hover {
    background: rgba(255,255,255,0.2);
  }
</style>