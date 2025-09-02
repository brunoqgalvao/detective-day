<script lang="ts">
  import { gameStore, discoveredEvidence, uiStore } from '../../stores/game.store';
  import { milestones } from '../../data/milestones';
  
  $: discoveredMilestones = $gameStore.milestonesDiscovered.map(id => ({ id, ...milestones[id] }));
  $: allEvidence = [...$discoveredEvidence, ...discoveredMilestones];
  
  function showImageViewer(imageSrc: string, caption: string) {
    uiStore.update(s => ({
      ...s,
      imageViewer: {
        show: true,
        imageSrc,
        caption
      }
    }));
  }
  
  function getCategoryIcon(category: string) {
    switch(category) {
      case 'alibi': return '⏰';
      case 'motive': return '💰';
      case 'means': return '🔬';
      case 'forensic': return '🧪';
      case 'scene': return '🏠';
      default: return '📋';
    }
  }
  
  function getCategoryColor(category: string) {
    switch(category) {
      case 'alibi': return 'rgba(99, 102, 241, 0.3)'; // Blue
      case 'motive': return 'rgba(239, 68, 68, 0.3)'; // Red
      case 'means': return 'rgba(34, 197, 94, 0.3)'; // Green
      case 'forensic': return 'rgba(168, 85, 247, 0.3)'; // Purple
      case 'scene': return 'rgba(251, 191, 36, 0.3)'; // Yellow
      default: return 'rgba(156, 163, 175, 0.3)'; // Gray
    }
  }
  
  function openNotes() {
    uiStore.update(s => ({ ...s, showNotes: true }));
  }
  
  function openCaseSummary() {
    uiStore.update(s => ({ ...s, showCaseSummary: true }));
  }
</script>

<div class="evidence-board">
  <div class="board-header">
    <div class="header-content">
      <h2>🕵️ Detective Evidence Board</h2>
      <p>Connect the clues • Find the truth • Solve the case</p>
    </div>
    
    <div class="header-actions">
      <button class="action-btn case-summary-btn" on:click={openCaseSummary}>
        📋 Case File
      </button>
      <button class="action-btn notes-btn" on:click={openNotes}>
        📝 My Notes
      </button>
    </div>
  </div>
  
  <div class="cork-board">
    <div class="board-background"></div>
    
    {#if allEvidence.length === 0}
      <div class="empty-board">
        <div class="empty-message">
          <h3>🔍 Start Your Investigation</h3>
          <p>Interview suspects to discover evidence and facts.</p>
          <p>Each discovery will appear on your evidence board.</p>
        </div>
      </div>
    {:else}
      <div class="evidence-grid">
        {#each allEvidence as evidence, index}
          <div 
            class="evidence-card" 
            style="--delay: {index * 0.1}s; --bg-color: {getCategoryColor(evidence.category || 'default')}"
          >
            <div class="evidence-pin"></div>
            <div class="evidence-content">
              <div class="evidence-header">
                <span class="category-icon">{getCategoryIcon(evidence.category || 'default')}</span>
                <span class="category-label">{evidence.category?.toUpperCase() || 'EVIDENCE'}</span>
              </div>
              <h4>{evidence.title}</h4>
              <p>{evidence.description}</p>
              {#if evidence.character}
                <div class="evidence-character">
                  Related to: <strong>{evidence.character}</strong>
                </div>
              {/if}
            </div>
            <div class="evidence-string"></div>
          </div>
        {/each}
      </div>
    {/if}
    
    <!-- Crime Scene Photos Section -->
    <div class="crime-scene-section">
      <h3>📸 Crime Scene Evidence</h3>
      <div class="crime-scene-photos">
        <div class="photo-card">
          <img 
            src="/images/crime-scene/crime_scene_overview.png" 
            alt="Crime Scene Overview"
            on:click={() => showImageViewer('/images/crime-scene/crime_scene_overview.png', 'Crime Scene - Victor\'s Study')}
            on:error={(e) => e.currentTarget.style.display='none'}
          />
          <div class="photo-label">Study Overview</div>
        </div>
        
        <div class="photo-card">
          <img 
            src="/images/crime-scene/whiskey_glass_evidence.png" 
            alt="Poisoned Whiskey"
            on:click={() => showImageViewer('/images/crime-scene/whiskey_glass_evidence.png', 'Evidence - Poisoned Whiskey Glass')}
            on:error={(e) => e.currentTarget.style.display='none'}
          />
          <div class="photo-label">Poisoned Whiskey</div>
        </div>
        
        <div class="photo-card">
          <img 
            src="/images/crime-scene/study_desk_detail.png" 
            alt="Desk Detail"
            on:click={() => showImageViewer('/images/crime-scene/study_desk_detail.png', 'Victor\'s Desk Detail')}
            on:error={(e) => e.currentTarget.style.display='none'}
          />
          <div class="photo-label">Desk Evidence</div>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .evidence-board {
    height: 100%;
    overflow-y: auto;
    background: linear-gradient(135deg, #2d2d44 0%, #1e1e2e 100%);
    position: relative;
  }
  
  .board-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2rem 2rem 1rem;
    background: rgba(0, 0, 0, 0.3);
    border-bottom: 2px solid rgba(255, 215, 0, 0.3);
  }
  
  .header-content {
    text-align: center;
    flex: 1;
  }
  
  .header-content h2 {
    color: #ffd700;
    margin-bottom: 0.5rem;
    font-size: 1.8rem;
  }
  
  .header-content p {
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.9rem;
  }
  
  .header-actions {
    display: flex;
    gap: 1rem;
    align-items: center;
  }
  
  .action-btn {
    background: linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(30, 30, 46, 0.8));
    border: 1px solid rgba(139, 92, 246, 0.4);
    color: #c4b5fd;
    padding: 0.75rem 1.25rem;
    border-radius: 8px;
    cursor: pointer;
    font-size: 0.9rem;
    font-weight: 500;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
    white-space: nowrap;
  }
  
  .action-btn:hover {
    background: linear-gradient(135deg, rgba(139, 92, 246, 0.3), rgba(30, 30, 46, 0.9));
    border-color: rgba(139, 92, 246, 0.6);
    color: #ddd6fe;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
  }
  
  .case-summary-btn {
    background: linear-gradient(135deg, rgba(255, 215, 0, 0.2), rgba(30, 30, 46, 0.8));
    border-color: rgba(255, 215, 0, 0.4);
    color: #ffd700;
  }
  
  .case-summary-btn:hover {
    background: linear-gradient(135deg, rgba(255, 215, 0, 0.3), rgba(30, 30, 46, 0.9));
    border-color: rgba(255, 215, 0, 0.6);
    color: #fff;
    box-shadow: 0 4px 12px rgba(255, 215, 0, 0.3);
  }
  
  .cork-board {
    position: relative;
    padding: 2rem;
    min-height: calc(100vh - 200px);
  }
  
  .board-background {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 25% 25%, rgba(139, 69, 19, 0.1) 1px, transparent 1px),
      radial-gradient(circle at 75% 25%, rgba(139, 69, 19, 0.1) 1px, transparent 1px),
      radial-gradient(circle at 25% 75%, rgba(139, 69, 19, 0.1) 1px, transparent 1px),
      radial-gradient(circle at 75% 75%, rgba(139, 69, 19, 0.1) 1px, transparent 1px);
    background-size: 50px 50px;
    opacity: 0.3;
  }
  
  .empty-board {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 400px;
  }
  
  .empty-message {
    text-align: center;
    padding: 3rem;
    border: 2px dashed rgba(255, 215, 0, 0.3);
    border-radius: 15px;
    background: rgba(0, 0, 0, 0.2);
  }
  
  .empty-message h3 {
    color: #ffd700;
    margin-bottom: 1rem;
    font-size: 1.5rem;
  }
  
  .empty-message p {
    color: rgba(255, 255, 255, 0.7);
    margin-bottom: 0.5rem;
    line-height: 1.6;
  }
  
  .evidence-grid {
    position: relative;
    z-index: 1;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 2rem;
    margin-bottom: 2rem;
  }
  
  .evidence-card {
    background: var(--bg-color);
    border: 1px solid rgba(139, 69, 19, 0.3);
    border-radius: 8px;
    position: relative;
    transform: rotate(-1deg);
    transition: all 0.3s ease;
    animation: pinDrop 0.6s ease-out var(--delay);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }
  
  .evidence-card:nth-child(even) {
    transform: rotate(1deg);
  }
  
  .evidence-card:hover {
    transform: rotate(0deg) scale(1.02);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
    z-index: 10;
  }
  
  .evidence-pin {
    position: absolute;
    top: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 16px;
    height: 16px;
    background: radial-gradient(circle, #ff6b6b, #cc5555);
    border-radius: 50%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }
  
  .evidence-content {
    padding: 1.5rem;
    padding-top: 1rem;
  }
  
  .evidence-header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }
  
  .category-icon {
    font-size: 1.2rem;
  }
  
  .category-label {
    font-size: 0.75rem;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.8);
    letter-spacing: 0.5px;
  }
  
  .evidence-content h4 {
    color: #ffd700;
    margin-bottom: 0.8rem;
    font-size: 1.1rem;
    line-height: 1.3;
  }
  
  .evidence-content p {
    color: rgba(255, 255, 255, 0.9);
    line-height: 1.5;
    font-size: 0.9rem;
  }
  
  .evidence-character {
    margin-top: 1rem;
    padding: 0.5rem;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 4px;
    font-size: 0.8rem;
    color: rgba(255, 255, 255, 0.7);
  }
  
  .evidence-character strong {
    color: #4ecdc4;
    text-transform: capitalize;
  }
  
  .crime-scene-section {
    position: relative;
    z-index: 1;
    margin-top: 3rem;
    padding: 2rem;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 12px;
    border: 1px solid rgba(255, 215, 0, 0.3);
  }
  
  .crime-scene-section h3 {
    color: #ffd700;
    margin-bottom: 1.5rem;
    text-align: center;
    font-size: 1.3rem;
  }
  
  .crime-scene-photos {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
  }
  
  .photo-card {
    position: relative;
    transform: rotate(-2deg);
    transition: all 0.3s ease;
  }
  
  .photo-card:nth-child(even) {
    transform: rotate(2deg);
  }
  
  .photo-card:hover {
    transform: rotate(0deg) scale(1.05);
    z-index: 5;
  }
  
  .photo-card img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 8px;
    cursor: pointer;
    border: 3px solid #fff;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }
  
  .photo-label {
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    background: #fff;
    color: #333;
    padding: 0.25rem 0.75rem;
    font-size: 0.8rem;
    font-weight: 600;
    border-radius: 4px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  }
  
  @keyframes pinDrop {
    0% {
      opacity: 0;
      transform: translateY(-100px) rotate(-10deg);
    }
    70% {
      transform: translateY(10px) rotate(2deg);
    }
    100% {
      opacity: 1;
      transform: translateY(0) rotate(-1deg);
    }
  }
  
  /* Scrollbar styling */
  .evidence-board::-webkit-scrollbar {
    width: 8px;
  }
  
  .evidence-board::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
  }
  
  .evidence-board::-webkit-scrollbar-thumb {
    background: rgba(255, 215, 0, 0.3);
    border-radius: 4px;
  }
  
  .evidence-board::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 215, 0, 0.5);
  }
  
  @media (max-width: 768px) {
    .evidence-grid {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }
    
    .crime-scene-photos {
      grid-template-columns: 1fr;
    }
    
    .board-header {
      padding: 1.5rem 1rem 1rem;
    }
    
    .cork-board {
      padding: 1.5rem;
    }
  }
</style>