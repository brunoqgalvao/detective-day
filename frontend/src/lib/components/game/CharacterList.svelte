<script lang="ts">
  import { currentCase, gameStore } from '../../stores/game.store';
  import type { Character } from '../../types/game.types';
  
  $: characters = $currentCase?.characters || [];
  $: currentCharacter = $gameStore.currentCharacter;
  $: chatHistories = $gameStore.chatHistories;
  
  function selectCharacter(characterId: string) {
    gameStore.selectCharacter(characterId);
  }
  
  function hasBeenInterviewed(characterId: string): boolean {
    return chatHistories[characterId] && chatHistories[characterId].length > 0;
  }
</script>

<div class="character-list">
  <h3>People of Interest</h3>
  
  <div class="characters">
    {#each characters as character}
      <div 
        class="character-card"
        class:active={currentCharacter === character.id}
        class:interviewed={hasBeenInterviewed(character.id)}
        on:click={() => selectCharacter(character.id)}
      >
        <div class="character-image">
          <img 
            src="/images/characters/{character.id}.png" 
            alt={character.name}
            on:error={(e) => e.currentTarget.style.display = 'none'}
          />
        </div>
        <div class="character-info">
          <div class="character-name">{character.name}</div>
          <div class="character-role">{character.role} • Age {character.age}</div>
        </div>
      </div>
    {/each}
  </div>
  
  <div class="special-actions">
    <button 
      class="special-btn"
      class:active={currentCharacter === 'forensics'}
      on:click={() => selectCharacter('forensics')}
    >
      <span class="icon">🔬</span>
      Crime Scene Expert
    </button>
    
    <button 
      class="special-btn prosecutor"
      class:active={currentCharacter === 'prosecutor'}
      on:click={() => selectCharacter('prosecutor')}
    >
      <span class="icon">⚖️</span>
      District Attorney
    </button>
  </div>
</div>

<style>
  .character-list {
    padding: 1rem 0;
  }

  h3 {
    color: #ffd700;
    margin-bottom: 1rem;
    font-size: 1.3rem;
  }

  .characters {
    margin-bottom: 2rem;
  }

  .character-card {
    background: rgba(255,255,255,0.05);
    padding: 1rem;
    margin-bottom: 0.8rem;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s;
    border: 1px solid transparent;
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .character-card:hover {
    background: rgba(255,255,255,0.1);
    border-color: #ffd700;
  }

  .character-card.active {
    background: rgba(255,215,0,0.2);
    border-color: #ffd700;
  }

  .character-card.interviewed {
    opacity: 0.8;
  }

  .character-card.interviewed .character-image {
    border-color: rgba(255, 255, 255, 0.1);
  }

  .character-image {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    overflow: hidden;
    border: 2px solid rgba(255, 255, 255, 0.2);
    flex-shrink: 0;
  }

  .character-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }

  .character-info {
    flex: 1;
  }

  .character-name {
    font-weight: bold;
    color: #ffffff;
    margin-bottom: 0.3rem;
  }

  .character-role {
    font-size: 0.9rem;
    color: #b0b0b0;
  }

  .special-actions {
    margin-top: 2rem;
    padding-top: 1rem;
    border-top: 1px solid rgba(255,255,255,0.1);
  }

  .special-btn {
    width: 100%;
    background: rgba(255,255,255,0.08);
    color: #e0e0e0;
    border: 1px solid rgba(255,255,255,0.2);
    padding: 1rem;
    margin-bottom: 0.8rem;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s;
    display: flex;
    align-items: center;
    gap: 0.8rem;
    font-size: 1rem;
    font-family: inherit;
  }

  .special-btn:hover {
    background: rgba(255,255,255,0.15);
    border-color: #4ecdc4;
  }

  .special-btn.active {
    background: rgba(78, 205, 196, 0.2);
    border-color: #4ecdc4;
  }

  .special-btn.prosecutor {
    background: rgba(255,107,107,0.1);
    border-color: rgba(255,107,107,0.3);
  }

  .special-btn.prosecutor:hover {
    background: rgba(255,107,107,0.2);
    border-color: #ff6b6b;
  }

  .special-btn.prosecutor.active {
    background: rgba(255,107,107,0.3);
    border-color: #ff6b6b;
  }

  .special-btn .icon {
    font-size: 1.5rem;
  }
</style>