<script lang="ts">
  import { uiStore, currentCase } from '../../stores/game.store';
  
  $: showModal = $uiStore.showCaseSummary;
  
  function close() {
    uiStore.update(s => ({ ...s, showCaseSummary: false }));
  }
  
  // Close on Escape key
  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape' && showModal) {
      close();
    }
  }
  
  function getCaseNumber(caseId: string) {
    const caseNumbers: Record<string, string> = {
      'westwood': 'Case #2024-1015-WM',
      'cyber-heist': 'Case #2024-1103-CH',
      'art-forgery': 'Case #2024-1208-AF'
    };
    return caseNumbers[caseId] || 'Case #2024-XXXX';
  }
  
  function getCaseType(caseId: string) {
    const caseTypes: Record<string, string> = {
      'westwood': 'HOMICIDE INVESTIGATION',
      'cyber-heist': 'CYBER CRIME INVESTIGATION',
      'art-forgery': 'HOMICIDE & FRAUD INVESTIGATION'
    };
    return caseTypes[caseId] || 'INVESTIGATION';
  }
</script>

<svelte:window on:keydown={handleKeydown} />

{#if showModal && $currentCase}
  <div class="modal-overlay" on:click={close}>
    <div class="case-file-container" on:click|stopPropagation>
      <div class="case-file">
        <div class="file-header">
          <div class="classification-stamp">CONFIDENTIAL</div>
          <button class="close-btn" on:click={close}>×</button>
        </div>
        
        <div class="file-content">
          <div class="case-title">
            <h1>{getCaseType($currentCase.id)}</h1>
            <div class="case-number">{getCaseNumber($currentCase.id)}</div>
            <div class="case-name">{$currentCase.title}</div>
          </div>
          
          {#if $currentCase.victim}
            <div class="section">
              <h2>🎯 VICTIM INFORMATION</h2>
              <div class="info-grid">
                {#if $currentCase.victim.name}
                  <div><strong>Name:</strong> {$currentCase.victim.name}</div>
                {/if}
                {#if $currentCase.victim.age}
                  <div><strong>Age:</strong> {$currentCase.victim.age} years old</div>
                {/if}
                {#if $currentCase.victim.occupation}
                  <div><strong>Occupation:</strong> {$currentCase.victim.occupation}</div>
                {/if}
                {#if $currentCase.victim.description}
                  <div class="full-width"><strong>Background:</strong> {$currentCase.victim.description}</div>
                {/if}
                {#if $currentCase.victim.lossAmount}
                  <div><strong>Loss:</strong> {$currentCase.victim.lossAmount}</div>
                {/if}
                {#if $currentCase.victim.type}
                  <div><strong>Type:</strong> {$currentCase.victim.type}</div>
                {/if}
              </div>
            </div>
          {/if}
          
          <div class="section">
            <h2>📋 CASE BRIEFING</h2>
            <div class="briefing-text">
              {#if $currentCase.initialBriefing}
                {@html $currentCase.initialBriefing}
              {:else}
                <p>Investigation details classified.</p>
              {/if}
            </div>
          </div>
          
          {#if $currentCase.victim?.timeOfDeath || $currentCase.victim?.causeOfDeath}
            <div class="section">
              <h2>🔬 FORENSIC FINDINGS</h2>
              <div class="findings">
                {#if $currentCase.victim.timeOfDeath}
                  <p><strong>Time of Death:</strong> {$currentCase.victim.timeOfDeath}</p>
                {/if}
                {#if $currentCase.victim.causeOfDeath}
                  <p><strong>Cause of Death:</strong> {$currentCase.victim.causeOfDeath}</p>
                {/if}
              </div>
            </div>
          {/if}
          
          {#if $currentCase.characters && $currentCase.characters.length > 0}
            <div class="section">
              <h2>👥 PERSONS OF INTEREST</h2>
              <div class="suspects-grid">
                {#each $currentCase.characters as character}
                  <div class="suspect-card">
                    <h4>{character.name}</h4>
                    <p><em>{character.role}</em></p>
                    {#if character.publicInfo}
                      <p>{character.publicInfo}</p>
                    {/if}
                  </div>
                {/each}
              </div>
            </div>
          {/if}
          
          {#if $currentCase.evidence}
            <div class="section">
              <h2>🔍 EVIDENCE CATEGORIES</h2>
              <div class="evidence-types">
                {#if $currentCase.evidence.physical}
                  <div class="evidence-category">
                    <strong>Physical Evidence:</strong>
                    <ul>
                      {#each $currentCase.evidence.physical.slice(0, 3) as item}
                        <li>{item}</li>
                      {/each}
                      {#if $currentCase.evidence.physical.length > 3}
                        <li>...and {$currentCase.evidence.physical.length - 3} more items</li>
                      {/if}
                    </ul>
                  </div>
                {/if}
                {#if $currentCase.evidence.digital}
                  <div class="evidence-category">
                    <strong>Digital Evidence:</strong>
                    <ul>
                      {#each $currentCase.evidence.digital.slice(0, 3) as item}
                        <li>{item}</li>
                      {/each}
                      {#if $currentCase.evidence.digital.length > 3}
                        <li>...and {$currentCase.evidence.digital.length - 3} more items</li>
                      {/if}
                    </ul>
                  </div>
                {/if}
                {#if $currentCase.evidence.documentary}
                  <div class="evidence-category">
                    <strong>Documentary Evidence:</strong>
                    <ul>
                      {#each $currentCase.evidence.documentary.slice(0, 3) as item}
                        <li>{item}</li>
                      {/each}
                      {#if $currentCase.evidence.documentary.length > 3}
                        <li>...and {$currentCase.evidence.documentary.length - 3} more items</li>
                      {/if}
                    </ul>
                  </div>
                {/if}
              </div>
            </div>
          {/if}
          
          <div class="section">
            <h2>🎯 INVESTIGATION OBJECTIVES</h2>
            <div class="objectives">
              <div class="objective">
                <span class="icon">🔍</span>
                <span>Interview all suspects to establish motives and alibis</span>
              </div>
              <div class="objective">
                <span class="icon">🧪</span>
                <span>Consult forensics expert for technical analysis</span>
              </div>
              <div class="objective">
                <span class="icon">📝</span>
                <span>Document all evidence discoveries and testimonies</span>
              </div>
              <div class="objective">
                <span class="icon">⚖️</span>
                <span>Build a case strong enough for prosecution</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="file-footer">
          <div class="signature-line">
            <p><strong>Lead Detective:</strong> ________________</p>
            <p><strong>Case Status:</strong> Active Investigation</p>
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 3000;
    backdrop-filter: blur(3px);
    padding: 2rem;
  }
  
  .case-file-container {
    max-width: 900px;
    max-height: 90vh;
    width: 100%;
    overflow-y: auto;
    border-radius: 8px;
  }
  
  .case-file {
    background: #1a1a1a;
    color: #e8e8e8;
    font-family: 'Times New Roman', serif;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8);
    position: relative;
  }
  
  .file-header {
    background: linear-gradient(135deg, #0a0a0a, #1a1a1a);
    color: white;
    padding: 1rem 2rem;
    position: relative;
    border-bottom: 3px solid #cc0000;
  }
  
  .classification-stamp {
    font-weight: bold;
    font-size: 1.2rem;
    color: #cc0000;
    letter-spacing: 3px;
    text-align: center;
  }
  
  .close-btn {
    position: absolute;
    top: 1rem;
    right: 1.5rem;
    background: none;
    border: none;
    color: #ccc;
    font-size: 2rem;
    cursor: pointer;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
  }
  
  .close-btn:hover {
    background: rgba(255, 255, 255, 0.1);
    color: white;
  }
  
  .file-content {
    padding: 2rem;
  }
  
  .case-title {
    text-align: center;
    margin-bottom: 2rem;
    border-bottom: 2px solid #cc0000;
    padding-bottom: 1rem;
  }
  
  .case-title h1 {
    font-size: 2rem;
    color: #cc0000;
    margin: 0 0 0.5rem 0;
    letter-spacing: 2px;
  }
  
  .case-number {
    font-size: 1.1rem;
    color: #aaa;
    font-weight: bold;
  }
  
  .case-name {
    font-size: 1.5rem;
    color: #e8e8e8;
    margin-top: 0.5rem;
    font-weight: bold;
  }
  
  .section {
    margin-bottom: 2rem;
    background: #252525;
    padding: 1.5rem;
    border-left: 4px solid #cc0000;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  }
  
  .section h2 {
    color: #cc0000;
    margin: 0 0 1rem 0;
    font-size: 1.3rem;
    border-bottom: 1px solid #444;
    padding-bottom: 0.5rem;
  }
  
  .info-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 0.8rem;
  }
  
  .info-grid .full-width {
    grid-column: 1 / -1;
  }
  
  .info-grid div {
    padding: 0.5rem 0;
    border-bottom: 1px dotted #444;
  }
  
  .briefing-text {
    line-height: 1.6;
  }
  
  .briefing-text :global(p) {
    margin: 0.5rem 0;
  }
  
  .briefing-text :global(ul) {
    margin: 1rem 0;
    padding-left: 2rem;
  }
  
  .briefing-text :global(li) {
    margin: 0.5rem 0;
  }
  
  .briefing-text :global(strong) {
    color: #cc0000;
  }
  
  .findings p {
    margin: 0.5rem 0;
    padding: 0.5rem;
    background: #2a2a2a;
    border-radius: 4px;
  }
  
  .suspects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
  }
  
  .suspect-card {
    background: #2a2a2a;
    border: 1px solid #444;
    border-radius: 6px;
    padding: 1rem;
    transition: all 0.2s ease;
  }
  
  .suspect-card:hover {
    background: #333;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  }
  
  .suspect-card h4 {
    color: #cc0000;
    margin: 0 0 0.3rem 0;
    font-size: 1.1rem;
  }
  
  .suspect-card em {
    color: #aaa;
    font-size: 0.9rem;
  }
  
  .suspect-card p {
    margin: 0.5rem 0 0 0;
    line-height: 1.4;
    font-size: 0.9rem;
  }
  
  .evidence-types {
    display: grid;
    gap: 1rem;
  }
  
  .evidence-category {
    background: #2a2a2a;
    padding: 1rem;
    border-radius: 4px;
  }
  
  .evidence-category ul {
    margin: 0.5rem 0 0 0;
    padding-left: 1.5rem;
  }
  
  .evidence-category li {
    margin: 0.3rem 0;
    color: #bbb;
  }
  
  .objectives {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .objective {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    background: #2a2a2a;
    border-radius: 6px;
    border-left: 4px solid #cc0000;
  }
  
  .objective .icon {
    font-size: 1.5rem;
    min-width: 2rem;
  }
  
  .file-footer {
    background: #0f0f0f;
    padding: 2rem;
    border-top: 2px solid #cc0000;
  }
  
  .signature-line {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: 'Courier New', monospace;
  }
  
  /* Scrollbar styling */
  .case-file-container::-webkit-scrollbar {
    width: 8px;
  }
  
  .case-file-container::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.1);
  }
  
  .case-file-container::-webkit-scrollbar-thumb {
    background: #cc0000;
    border-radius: 4px;
  }
  
  .case-file-container::-webkit-scrollbar-thumb:hover {
    background: #aa0000;
  }
  
  @media (max-width: 768px) {
    .modal-overlay {
      padding: 1rem;
    }
    
    .file-content {
      padding: 1rem;
    }
    
    .case-title h1 {
      font-size: 1.5rem;
    }
    
    .suspects-grid {
      grid-template-columns: 1fr;
    }
    
    .info-grid {
      grid-template-columns: 1fr;
    }
    
    .signature-line {
      flex-direction: column;
      gap: 1rem;
    }
  }
</style>