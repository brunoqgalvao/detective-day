<script lang="ts">
  import { discoveredEvidence, gameStore, uiStore, currentCase } from '../../stores/game.store';
  import Modal from '../ui/Modal.svelte';
  import { milestones as allMilestones } from '../../data/milestones';
  
  let showModal = false;
  
  $: showModal = $uiStore.showEvidence;
  $: evidence = $discoveredEvidence;
  $: discoveredMilestoneIds = $gameStore.milestonesDiscovered;
  
  // Get actual milestone data for discovered milestones
  $: discoveredMilestones = discoveredMilestoneIds.map(id => allMilestones[id]).filter(Boolean);
  
  // Group milestones by category
  $: categorizedMilestones = discoveredMilestones.reduce((acc, milestone) => {
    if (!acc[milestone.category]) {
      acc[milestone.category] = [];
    }
    acc[milestone.category].push(milestone);
    return acc;
  }, {} as Record<string, typeof discoveredMilestones>);
  
  function close() {
    uiStore.update(s => ({ ...s, showEvidence: false }));
  }
  
  // Milestone categories for organization
  const MILESTONE_CATEGORIES: Record<string, {name: string, icon: string, color: string}> = {
    alibi: { name: "Alibis & Whereabouts", icon: "📍", color: "#4ecdc4" },
    motive: { name: "Motives & Conflicts", icon: "⚔️", color: "#ff6b6b" },
    means: { name: "Access & Capabilities", icon: "🔑", color: "#ffd700" },
    forensic: { name: "Forensic Evidence", icon: "🔬", color: "#9b59b6" },
    scene: { name: "Crime Scene", icon: "🏚️", color: "#e67e22" },
    behavior: { name: "Behavioral Clues", icon: "🎭", color: "#95a5a6" }
  };
  
  const MILESTONE_IMPORTANCE = {
    critical: { weight: 3, color: "#ff3838" },
    high: { weight: 2, color: "#ff6b6b" }, 
    medium: { weight: 1.5, color: "#ffd700" },
    low: { weight: 1, color: "#95a5a6" }
  };
</script>

<Modal {showModal} on:close={close}>
  <h2 slot="header">Evidence Collected</h2>
  
  <div slot="content">
    {#if evidence.length > 0}
      <h4 class="section-header">🔬 Physical Evidence</h4>
      {#each evidence as item}
        <div class="evidence-item">
          {#if item.id === 'whiskey_glass' || item.id === 'chemistry_book' || item.id === 'threatening_note'}
            <div class="evidence-image">
              <img 
                src="/images/crime-scene/{item.id}_evidence.png" 
                alt={item.name}
                on:error={(e) => e.currentTarget.style.display = 'none'}
              />
            </div>
          {/if}
          <div class="evidence-content">
            <div class="evidence-title">{item.name}</div>
            <div class="evidence-description">{item.description}</div>
          </div>
        </div>
      {/each}
    {/if}
    
    {#if discoveredMilestones.length > 0}
      <h4 class="section-header milestone-header">🔍 Investigation Discoveries</h4>
      <div class="milestone-info">
        You've made {discoveredMilestones.length} important discoveries during your investigation.
      </div>
      
      {#each Object.entries(categorizedMilestones) as [categoryKey, categoryMilestones]}
        {@const category = MILESTONE_CATEGORIES[categoryKey]}
        <div class="milestone-category">
          <h5 style="color: {category.color}; margin: 1rem 0 0.5rem 0;">
            {category.icon} {category.name}
          </h5>
          
          {#each categoryMilestones as milestone}
            {@const importance = MILESTONE_IMPORTANCE[milestone.importance] || MILESTONE_IMPORTANCE.medium}
            <div class="milestone-item" style="border-left-color: {category.color}">
              <div class="milestone-indicator" style="background: {importance.color}"></div>
              <div class="milestone-content">
                <div class="milestone-title" style="color: {category.color}">{milestone.title}</div>
                <div class="milestone-description">{milestone.description}</div>
              </div>
            </div>
          {/each}
        </div>
      {/each}
    {/if}
    
    {#if evidence.length === 0 && discoveredMilestones.length === 0}
      <p class="empty-state">No evidence or discoveries made yet. Interview suspects to gather clues and uncover information.</p>
    {/if}
  </div>
</Modal>

<style>
  .section-header {
    color: #4ecdc4;
    margin: 1.5rem 0 1rem 0;
    font-size: 1.2rem;
  }
  
  .section-header:first-child {
    margin-top: 0;
  }
  
  .milestone-header {
    color: #ffd700;
  }
  
  .milestone-info {
    color: #a0a0a0;
    font-size: 0.9rem;
    margin-bottom: 1rem;
  }

  .evidence-item {
    background: rgba(255,255,255,0.05);
    padding: 1rem;
    border-radius: 8px;
    border-left: 3px solid #4ecdc4;
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  .evidence-image {
    width: 120px;
    height: 90px;
    border-radius: 6px;
    overflow: hidden;
    flex-shrink: 0;
    border: 1px solid rgba(78, 205, 196, 0.3);
  }

  .evidence-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }

  .evidence-content {
    flex: 1;
  }

  .evidence-title {
    font-weight: bold;
    color: #4ecdc4;
    margin-bottom: 0.5rem;
  }

  .evidence-description {
    color: #e0e0e0;
    line-height: 1.6;
  }
  
  .milestone-category {
    margin-bottom: 1.5rem;
  }
  
  .milestone-item {
    background: rgba(255,255,255,0.05);
    padding: 1rem;
    border-radius: 8px;
    border-left: 3px solid #ffd700;
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
    align-items: flex-start;
  }
  
  .milestone-indicator {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin-top: 0.5rem;
    flex-shrink: 0;
  }
  
  .milestone-content {
    flex: 1;
  }
  
  .milestone-title {
    font-weight: bold;
    margin-bottom: 0.5rem;
  }
  
  .milestone-description {
    color: #e0e0e0;
    line-height: 1.6;
    font-size: 0.95rem;
  }
  
  .empty-state {
    text-align: center;
    color: #a0a0a0;
    padding: 2rem;
  }
</style>