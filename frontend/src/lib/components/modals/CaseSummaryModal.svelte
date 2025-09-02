<script lang="ts">
  import { uiStore } from '../../stores/game.store';
  
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
</script>

<svelte:window on:keydown={handleKeydown} />

{#if showModal}
  <div class="modal-overlay" on:click={close}>
    <div class="case-file-container" on:click|stopPropagation>
      <div class="case-file">
        <div class="file-header">
          <div class="classification-stamp">CONFIDENTIAL</div>
          <button class="close-btn" on:click={close}>×</button>
        </div>
        
        <div class="file-content">
          <div class="case-title">
            <h1>HOMICIDE INVESTIGATION</h1>
            <div class="case-number">Case #2024-1015-WM</div>
            <div class="date-stamp">Filed: October 15th, 2024 • 11:47 PM</div>
          </div>
          
          <div class="section">
            <h2>🎯 VICTIM INFORMATION</h2>
            <div class="info-grid">
              <div><strong>Name:</strong> Victor Westwood</div>
              <div><strong>Age:</strong> 52 years old</div>
              <div><strong>Occupation:</strong> Tech Entrepreneur & CEO</div>
              <div><strong>Status:</strong> Owner of Westwood Manor Estate</div>
            </div>
          </div>
          
          <div class="section">
            <h2>🏠 CRIME SCENE DETAILS</h2>
            <div class="location-info">
              <p><strong>Location:</strong> Westwood Manor, Private Study</p>
              <p><strong>Discovery Time:</strong> 10:30 PM by manor butler (Robert)</p>
              <p><strong>Time of Death:</strong> Between 10:00-10:30 PM</p>
            </div>
            
            <div class="scene-findings">
              <h3>Physical Evidence:</h3>
              <ul>
                <li>💀 <strong>Cause of Death:</strong> Cyanide poisoning</li>
                <li>🥃 <strong>Delivery Method:</strong> Poisoned whiskey glass (half-consumed)</li>
                <li>🔒 <strong>Room Status:</strong> Study door locked from inside</li>
                <li>🪟 <strong>Window:</strong> Slightly ajar despite cold weather</li>
                <li>🗂️ <strong>No Struggle:</strong> No signs of forced entry or fight</li>
              </ul>
            </div>
          </div>
          
          <div class="section">
            <h2>👥 PERSONS OF INTEREST</h2>
            <div class="suspects-grid">
              <div class="suspect-card">
                <h4>Sophia Westwood</h4>
                <p><em>Victim's Wife</em></p>
                <p>Present at dinner party. Recently discovered husband's affair.</p>
              </div>
              
              <div class="suspect-card">
                <h4>Marcus Westwood</h4>
                <p><em>Victim's Son</em></p>
                <p>Chemistry background. Serious gambling debts threatening inheritance.</p>
              </div>
              
              <div class="suspect-card">
                <h4>Elena Rodriguez</h4>
                <p><em>Personal Assistant</em></p>
                <p>Last person to see victim alive. Had private meeting at 9:30 PM.</p>
              </div>
              
              <div class="suspect-card">
                <h4>James Patterson</h4>
                <p><em>Business Partner</em></p>
                <p>Financial irregularities recently discovered by victim.</p>
              </div>
              
              <div class="suspect-card">
                <h4>Isabella Westwood</h4>
                <p><em>Victim's Daughter</em></p>
                <p>Relationship conflicts with father. Alone during time of death.</p>
              </div>
              
              <div class="suspect-card">
                <h4>Margaret Chen</h4>
                <p><em>Sister-in-law</em></p>
                <p>Financial troubles. Recently denied loan request by victim.</p>
              </div>
              
              <div class="suspect-card">
                <h4>Robert Sterling</h4>
                <p><em>Manor Butler</em></p>
                <p>25 years of service. Discovered the body. Prepared victim's whiskey.</p>
              </div>
            </div>
          </div>
          
          <div class="section">
            <h2>📋 INVESTIGATION TIMELINE</h2>
            <div class="timeline">
              <div class="timeline-item">
                <span class="time">8:00 PM</span>
                <span class="event">Dinner party begins at Westwood Manor</span>
              </div>
              <div class="timeline-item">
                <span class="time">9:30 PM</span>
                <span class="event">Elena's private meeting with Victor begins</span>
              </div>
              <div class="timeline-item">
                <span class="time">9:45 PM</span>
                <span class="event">Elena leaves Victor's study</span>
              </div>
              <div class="timeline-item">
                <span class="time">10:00-10:30 PM</span>
                <span class="event critical">🚨 ESTIMATED TIME OF DEATH</span>
              </div>
              <div class="timeline-item">
                <span class="time">10:30 PM</span>
                <span class="event">Robert discovers Victor's body</span>
              </div>
              <div class="timeline-item">
                <span class="time">11:47 PM</span>
                <span class="event">Police arrive, investigation begins</span>
              </div>
            </div>
          </div>
          
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
                <span>Present case to District Attorney when ready</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="file-footer">
          <div class="signature-line">
            <p><strong>Lead Detective:</strong> ________________</p>
            <p><strong>Badge #:</strong> Your Investigation</p>
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
    background: #f8f6f0;
    color: #2d2d2d;
    font-family: 'Times New Roman', serif;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
    position: relative;
  }
  
  .file-header {
    background: linear-gradient(135deg, #1a1a1a, #2d2d2d);
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
    font-size: 2.5rem;
    color: #cc0000;
    margin: 0 0 0.5rem 0;
    letter-spacing: 2px;
  }
  
  .case-number {
    font-size: 1.1rem;
    color: #666;
    font-weight: bold;
  }
  
  .date-stamp {
    font-size: 0.9rem;
    color: #888;
    margin-top: 0.5rem;
  }
  
  .section {
    margin-bottom: 2rem;
    background: white;
    padding: 1.5rem;
    border-left: 4px solid #cc0000;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  .section h2 {
    color: #cc0000;
    margin: 0 0 1rem 0;
    font-size: 1.3rem;
    border-bottom: 1px solid #eee;
    padding-bottom: 0.5rem;
  }
  
  .info-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 0.8rem;
  }
  
  .info-grid div {
    padding: 0.5rem 0;
    border-bottom: 1px dotted #ccc;
  }
  
  .location-info p {
    margin: 0.5rem 0;
    line-height: 1.6;
  }
  
  .scene-findings h3 {
    color: #444;
    margin: 1rem 0 0.5rem 0;
    font-size: 1.1rem;
  }
  
  .scene-findings ul {
    list-style: none;
    padding-left: 0;
  }
  
  .scene-findings li {
    margin: 0.5rem 0;
    padding: 0.5rem;
    background: #f9f9f9;
    border-radius: 4px;
    line-height: 1.5;
  }
  
  .suspects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1rem;
  }
  
  .suspect-card {
    background: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 6px;
    padding: 1rem;
    transition: all 0.2s ease;
  }
  
  .suspect-card:hover {
    background: #f0f0f0;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  .suspect-card h4 {
    color: #cc0000;
    margin: 0 0 0.3rem 0;
    font-size: 1.1rem;
  }
  
  .suspect-card em {
    color: #666;
    font-size: 0.9rem;
  }
  
  .suspect-card p {
    margin: 0.5rem 0 0 0;
    line-height: 1.4;
    font-size: 0.9rem;
  }
  
  .timeline {
    border-left: 3px solid #cc0000;
    padding-left: 1rem;
    margin-left: 1rem;
  }
  
  .timeline-item {
    display: flex;
    margin: 1rem 0;
    position: relative;
  }
  
  .timeline-item::before {
    content: '•';
    position: absolute;
    left: -1.3rem;
    color: #cc0000;
    font-size: 1.5rem;
    background: white;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .time {
    font-weight: bold;
    color: #cc0000;
    min-width: 100px;
    margin-right: 1rem;
  }
  
  .event {
    flex: 1;
    line-height: 1.5;
  }
  
  .event.critical {
    color: #cc0000;
    font-weight: bold;
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
    background: #f9f9f9;
    border-radius: 6px;
    border-left: 4px solid #cc0000;
  }
  
  .objective .icon {
    font-size: 1.5rem;
    min-width: 2rem;
  }
  
  .file-footer {
    background: #f0f0f0;
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
      padding: 1.5rem;
    }
    
    .case-title h1 {
      font-size: 2rem;
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