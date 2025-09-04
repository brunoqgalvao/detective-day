<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import { createEventDispatcher } from 'svelte';
  import { currentCase } from '../../stores/game.store';
  
  export let show = false;
  
  const dispatch = createEventDispatcher();
  
  function handleClose() {
    dispatch('close');
  }
  
  function handleStart() {
    dispatch('start');
  }
</script>

{#if show && $currentCase}
  <div class="modal-overlay" transition:fade={{ duration: 300 }} on:click={handleClose}>
    <div 
      class="modal-content" 
      transition:fly={{ y: 50, duration: 400 }}
      on:click|stopPropagation
    >
      <div class="modal-header">
        <h2 class="modal-title">Case Briefing</h2>
      </div>
      
      <div class="modal-body">
        <div class="case-header">
          <h1 class="case-title">{$currentCase.title}</h1>
          {#if $currentCase.victim}
            <div class="victim-info">
              <h3>Victim</h3>
              <p><strong>{$currentCase.victim.name}</strong> ({$currentCase.victim.age || 'Age Unknown'})</p>
              <p class="victim-occupation">{$currentCase.victim.occupation}</p>
              <p class="victim-description">{$currentCase.victim.description}</p>
              {#if $currentCase.victim.timeOfDeath}
                <p class="death-info">
                  <strong>Time of Death:</strong> {$currentCase.victim.timeOfDeath}
                </p>
              {/if}
              {#if $currentCase.victim.causeOfDeath}
                <p class="death-info">
                  <strong>Cause of Death:</strong> {$currentCase.victim.causeOfDeath}
                </p>
              {/if}
            </div>
          {/if}
        </div>
        
        <div class="briefing-content">
          {#if $currentCase.initialBriefing}
            {@html $currentCase.initialBriefing}
          {:else}
            <p>No briefing available for this case.</p>
          {/if}
        </div>
        
        {#if $currentCase.characters && $currentCase.characters.length > 0}
          <div class="suspects-preview">
            <h3>Persons of Interest</h3>
            <p class="suspect-count">{$currentCase.characters.length} individuals present for questioning</p>
          </div>
        {/if}
        
        <div class="objectives">
          <h3>Your Objectives</h3>
          <ul>
            <li>Interview all suspects and witnesses</li>
            <li>Gather and analyze evidence</li>
            <li>Identify inconsistencies in testimonies</li>
            <li>Build a case strong enough for prosecution</li>
          </ul>
        </div>
      </div>
      
      <div class="modal-footer">
        <button class="btn-secondary" on:click={handleClose}>
          Review Later
        </button>
        <button class="btn-primary" on:click={handleStart}>
          Begin Investigation
        </button>
      </div>
    </div>
  </div>
{/if}

<style>
  .modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.85);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 1rem;
  }

  .modal-content {
    background: linear-gradient(135deg, #2a2a3e 0%, #1a1a2e 100%);
    border-radius: 1rem;
    max-width: 800px;
    width: 100%;
    max-height: 90vh;
    display: flex;
    flex-direction: column;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .modal-header {
    padding: 1.5rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .modal-title {
    font-size: 1.2rem;
    color: #888;
    margin: 0;
    text-transform: uppercase;
    letter-spacing: 2px;
  }

  .modal-body {
    padding: 2rem;
    overflow-y: auto;
    flex: 1;
  }

  .case-header {
    margin-bottom: 2rem;
  }

  .case-title {
    font-size: 2.5rem;
    font-weight: 800;
    background: linear-gradient(135deg, #ffd700, #ff6b35);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin: 0 0 1.5rem 0;
  }

  .victim-info {
    background: rgba(139, 0, 0, 0.1);
    border: 1px solid rgba(139, 0, 0, 0.3);
    border-radius: 0.5rem;
    padding: 1.5rem;
    margin-bottom: 2rem;
  }

  .victim-info h3 {
    color: #ff6b6b;
    margin: 0 0 1rem 0;
    font-size: 1.2rem;
  }

  .victim-info p {
    margin: 0.5rem 0;
    color: #ccc;
  }

  .victim-occupation {
    color: #888;
    font-style: italic;
  }

  .victim-description {
    margin-top: 1rem;
    line-height: 1.6;
  }

  .death-info {
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }

  .briefing-content {
    margin-bottom: 2rem;
    color: #ddd;
    line-height: 1.8;
  }

  .briefing-content :global(p) {
    margin: 1rem 0;
  }

  .briefing-content :global(ul) {
    margin: 1rem 0;
    padding-left: 2rem;
  }

  .briefing-content :global(li) {
    margin: 0.5rem 0;
  }

  .briefing-content :global(strong) {
    color: #ffd700;
  }

  .suspects-preview {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 0.5rem;
    padding: 1.5rem;
    margin-bottom: 2rem;
  }

  .suspects-preview h3 {
    color: #ffd700;
    margin: 0 0 0.5rem 0;
  }

  .suspect-count {
    color: #aaa;
    margin: 0;
  }

  .objectives {
    background: rgba(0, 100, 200, 0.1);
    border: 1px solid rgba(0, 150, 255, 0.3);
    border-radius: 0.5rem;
    padding: 1.5rem;
  }

  .objectives h3 {
    color: #4da6ff;
    margin: 0 0 1rem 0;
  }

  .objectives ul {
    margin: 0;
    padding-left: 1.5rem;
  }

  .objectives li {
    color: #bbb;
    margin: 0.5rem 0;
  }

  .modal-footer {
    padding: 1.5rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
  }

  .btn-primary, .btn-secondary {
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    border: none;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .btn-primary {
    background: linear-gradient(135deg, #ffd700, #ff6b35);
    color: #1a1a2e;
  }

  .btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(255, 107, 53, 0.3);
  }

  .btn-secondary {
    background: rgba(255, 255, 255, 0.1);
    color: #ccc;
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  .btn-secondary:hover {
    background: rgba(255, 255, 255, 0.15);
  }

  @media (max-width: 640px) {
    .modal-body {
      padding: 1rem;
    }

    .case-title {
      font-size: 1.8rem;
    }
  }
</style>