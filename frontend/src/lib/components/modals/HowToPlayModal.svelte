<script lang="ts">
  import { uiStore } from '../../stores/game.store';
  import Modal from '../ui/Modal.svelte';
  
  let showModal = false;
  
  $: showModal = $uiStore.showHowToPlay;
  
  function close() {
    uiStore.update(s => ({ ...s, showHowToPlay: false }));
  }
</script>

<Modal {showModal} on:close={close}>
  <h2 slot="header">🕵️ How to Play Detective Day</h2>
  
  <div slot="content">
    <div class="how-to-section">
      <h3>🎯 Your Objective</h3>
      <p>Solve the murder of Victor Westwood by gathering enough evidence to identify and prosecute the killer.</p>
    </div>

    <div class="how-to-section">
      <h3>🔍 Investigation Process</h3>
      <ul>
        <li><strong>Interview Suspects:</strong> Click on any character to interview them. Ask about their whereabouts, relationships, and observations.</li>
        <li><strong>Gather Evidence:</strong> Physical evidence and discoveries will be automatically collected as you uncover them during interviews.</li>
        <li><strong>Track Progress:</strong> Watch for notification popups when you discover important information. Check your Evidence book regularly.</li>
        <li><strong>Take Notes:</strong> Use the Notes feature to track your theories and connect the dots.</li>
      </ul>
    </div>

    <div class="how-to-section">
      <h3>🔬 Special Consultants</h3>
      <ul>
        <li><strong>Crime Scene Expert:</strong> Consult Dr. Sarah Mitchell for forensic analysis and technical evidence interpretation.</li>
        <li><strong>District Attorney:</strong> When ready, present your case to Patricia Hayes. She'll determine if you have enough evidence to prosecute.</li>
      </ul>
    </div>

    <div class="how-to-section win-conditions">
      <h3>🏆 How to Win</h3>
      <p>There are two paths to victory:</p>
      <ol>
        <li><strong>Confession:</strong> Confront the killer with overwhelming evidence during interrogation to trigger a confession.</li>
        <li><strong>Prosecution:</strong> Convince the District Attorney that you have sufficient evidence to prosecute. You'll need:
          <ul>
            <li>Clear identification of the murderer</li>
            <li>Evidence of motive (why they did it)</li>
            <li>Evidence of means (how they could do it)</li>
            <li>Evidence of opportunity (when they could do it)</li>
          </ul>
        </li>
      </ol>
    </div>

    <div class="how-to-section">
      <h3>💡 Investigation Tips</h3>
      <ul>
        <li>Pay attention to timeline inconsistencies - alibis matter!</li>
        <li>Everyone has secrets - not all are related to the murder</li>
        <li>Cross-reference statements between suspects</li>
        <li>The murder method (poison) requires specific knowledge and access</li>
        <li>Check the Evidence book for discovered milestones organized by category</li>
        <li>Don't rush to the prosecutor - gather solid evidence first</li>
      </ul>
    </div>
  </div>
</Modal>

<style>
  .how-to-section {
    margin-bottom: 1.5rem;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 8px;
  }

  .how-to-section h3 {
    color: #ffd700;
    margin-bottom: 0.8rem;
    font-size: 1.2rem;
  }

  .how-to-section p {
    color: #e0e0e0;
    line-height: 1.6;
    margin-bottom: 0.5rem;
  }

  .how-to-section ul, .how-to-section ol {
    margin-left: 1.5rem;
    line-height: 1.8;
  }

  .how-to-section li {
    margin-bottom: 0.5rem;
    color: #e0e0e0;
  }

  .how-to-section strong {
    color: #4ecdc4;
  }

  .win-conditions {
    background: linear-gradient(135deg, rgba(255, 215, 0, 0.1), rgba(255, 107, 107, 0.1));
    border: 1px solid rgba(255, 215, 0, 0.3);
  }

  .win-conditions h3 {
    color: #ff6b6b;
  }
</style>