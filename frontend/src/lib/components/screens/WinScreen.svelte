<script lang="ts">
  import { gameStore, uiStore } from '../../stores/game.store';
  
  // Determine if it was a confession or prosecution
  let isConfession = false;
  
  // Check the last character interviewed
  $: lastCharacter = $gameStore.currentCharacter;
  $: isConfession = lastCharacter === 'marcus';
  
  function playAgain() {
    gameStore.reset();
    uiStore.update(s => ({ ...s, currentScreen: 'intro' }));
  }
</script>

<div class="win-screen">
  <div class="win-content">
    <h1>Case Closed!</h1>
    
    {#if isConfession}
      <div class="win-message">
        <p>Marcus Westwood has confessed to the murder!</p>
        <p>Overwhelmed by the evidence you presented—his chemistry knowledge, the annotated textbook, his gambling debts, and lack of alibi—Marcus broke down and admitted to poisoning his father's whiskey with cyanide.</p>
        <p>He was desperate for the inheritance money to pay off his dangerous creditors. When his father threatened to cut him off completely, Marcus saw no other way out.</p>
        <p>Excellent detective work!</p>
      </div>
    {:else}
      <div class="win-message">
        <p>The District Attorney has agreed to prosecute Marcus Westwood!</p>
        <p>Your thorough investigation uncovered the critical evidence: Marcus's chemistry background, his massive gambling debts, the annotated chemistry textbook with notes about cyanide, and his lack of a solid alibi during the time of murder.</p>
        <p>The case against Marcus is strong, and justice will be served.</p>
        <p>Outstanding investigative work, Detective!</p>
      </div>
    {/if}
    
    <button class="btn-primary" on:click={playAgain}>
      Play Again
    </button>
  </div>
</div>

<style>
  .win-screen {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    min-height: 100svh;
    min-height: 100dvh;
    padding: 2rem;
    padding-top: calc(60px + 2rem);
    background: radial-gradient(ellipse at center, #2d2d44 0%, #1e1e2e 100%);
  }
  
  .win-content {
    text-align: center;
    padding: 3rem;
    background: rgba(0,0,0,0.5);
    border-radius: 15px;
    max-width: 600px;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255,255,255,0.1);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  }
  
  h1 {
    font-size: 3rem;
    color: #ffd700;
    margin-bottom: 2rem;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
  }
  
  .win-message {
    color: #e0e0e0;
    line-height: 1.8;
    margin-bottom: 2rem;
    font-size: 1.2rem;
  }
  
  .win-message p {
    margin-bottom: 1rem;
  }
  
  .btn-primary {
    background: linear-gradient(45deg, #ff6b6b, #ff8787);
    color: white;
    border: none;
    padding: 1rem 2rem;
    font-size: 1.2rem;
    border-radius: 8px;
    cursor: pointer;
    margin-top: 2rem;
    transition: all 0.3s;
  }
  
  .btn-primary:hover {
    transform: scale(1.05);
    box-shadow: 0 5px 15px rgba(255,107,107,0.4);
  }

  @media (max-width: 768px) {
    .win-screen {
      padding: 1rem;
      padding-top: calc(60px + 1rem);
    }
    .win-content {
      padding: 1.5rem;
    }
    h1 {
      font-size: 2.2rem;
    }
    .win-message {
      font-size: 1rem;
    }
  }
</style>
