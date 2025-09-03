<script lang="ts">
  import { gameStore, currentCharacterData, currentCase, uiStore, showNotification, SESSION_ID } from '../../stores/game.store';
  import { api } from '../../services/api';
  import ChatMessage from './ChatMessage.svelte';
  import EvidenceBoard from './EvidenceBoard.svelte';
  import type { ChatMessage as ChatMessageType } from '../../types/game.types';
  
  let message = '';
  let loading = false;
  let chatContainer: HTMLDivElement;
  
  $: currentCharacter = $gameStore.currentCharacter;
  $: chatHistory = currentCharacter ? ($gameStore.chatHistories[currentCharacter] || []) : [];
  $: characterData = $currentCharacterData;
  
  $: characterName = (() => {
    if (currentCharacter === 'forensics') return 'Dr. Sarah Mitchell - Crime Scene Expert';
    if (currentCharacter === 'prosecutor') return 'Patricia Hayes - District Attorney';
    return characterData ? `${characterData.name} - ${characterData.role}` : 'Select someone to interview';
  })();
  
  $: characterImage = (() => {
    if (currentCharacter === 'forensics') return '/images/characters/forensics.png';
    if (currentCharacter === 'prosecutor') return '/images/characters/prosecutor.png';
    return currentCharacter ? `/images/characters/${currentCharacter}.png` : '';
  })();
  
  async function sendMessage() {
    if (!message.trim() || !currentCharacter || loading) return;
    
    const userMessage = message.trim();
    message = '';
    loading = true;
    
    // Add user message to chat
    gameStore.addChatMessage(currentCharacter, {
      role: 'user',
      content: userMessage
    });
    
    try {
      // Check for cheating first
      const cheatCheck = await api.checkForCheating(userMessage);
      
      if (cheatCheck.isCheating) {
        gameStore.addChatMessage(currentCharacter, {
          role: 'assistant',
          content: "I'm not sure what you're trying to do, but I'm here to answer questions about the case, not discuss the investigation itself."
        });
      } else {
        // Get response from API (filter out any system messages)
        const response = await api.sendChatMessage(
          $gameStore.caseId,
          currentCharacter,
          userMessage,
          chatHistory.filter(msg => msg.role !== 'system'),
          SESSION_ID
        );
        
        // Add assistant response
        gameStore.addChatMessage(currentCharacter, {
          role: 'assistant',
          content: response.response
        });
        
        // Check for milestone discovery
        if (response.milestoneDiscovered) {
          gameStore.discoverMilestone(response.milestoneDiscovered);
          showNotification('Discovery Made!', `New information uncovered about the case.`);
        }
        
        // Check for evidence discovery
        if (response.evidenceDiscovered && response.evidenceDiscovered.length > 0) {
          response.evidenceDiscovered.forEach(id => gameStore.discoverEvidence(id));
        }
        
        // Check for confession/win
        if (response.isConfession) {
          setTimeout(() => {
            gameStore.winGame();
            uiStore.update(s => ({ ...s, currentScreen: 'win' }));
          }, 2000);
        }
      }
    } catch (error) {
      console.error('Chat error:', error);
      gameStore.addChatMessage(currentCharacter, {
        role: 'assistant',
        content: '*looks confused* I apologize, but I seem to have lost my train of thought. Could you repeat that?'
      });
    } finally {
      loading = false;
      setTimeout(() => scrollToBottom(), 100);
    }
  }
  
  function scrollToBottom() {
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }

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
</script>

<div class="chat-area">
  {#if currentCharacter}
    <div class="chat-header">
      <div class="chat-header-content">
        <img 
          class="chat-character-image" 
          src={characterImage} 
          alt={characterName}
          on:error={(e) => e.currentTarget.style.display = 'none'}
        />
        <h3>{characterName}</h3>
      </div>
      <button class="close-btn" on:click={() => gameStore.selectCharacter(null)}>×</button>
    </div>
    
    <div class="chat-messages" bind:this={chatContainer}>
      {#if chatHistory.length === 0}
        <div class="message system">
          You are now interviewing {characterName}
        </div>
      {/if}
      
      {#each chatHistory as msg}
        <ChatMessage message={msg} />
      {/each}
      
      {#if loading}
        <div class="message assistant">
          <div class="loading-message">
            <span class="loading"></span>
            <span style="margin-left: 10px; opacity: 0.7;">Thinking...</span>
          </div>
        </div>
      {/if}
    </div>
    
    <div class="chat-input-area">
      <input
        type="text"
        bind:value={message}
        placeholder="Type your question..."
        disabled={loading}
        on:keypress={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
      />
      <button on:click={sendMessage} disabled={loading || !message.trim()}>
        Send
      </button>
    </div>
  {:else}
    <EvidenceBoard />
  {/if}
</div>

<style>
  .chat-area {
    flex: 1;
    display: flex;
    flex-direction: column;
    background: rgba(0,0,0,0.3);
    height: 100%;
    width: 100%;
    overflow: hidden;
  }

  .chat-header {
    background: rgba(0,0,0,0.5);
    padding: 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(255,255,255,0.1);
  }

  .chat-header-content {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .chat-character-image {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid rgba(255, 215, 0, 0.5);
  }

  .chat-header h3 {
    color: #ffd700;
  }

  .close-btn {
    background: none;
    border: none;
    color: #e0e0e0;
    font-size: 2rem;
    cursor: pointer;
    opacity: 0.6;
    transition: opacity 0.3s;
  }

  .close-btn:hover {
    opacity: 1;
  }

  .chat-messages {
    flex: 1;
    padding: 1.5rem;
    overflow-y: auto;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    min-height: 0;
  }

  .chat-input-area {
    display: flex;
    padding: 1.5rem;
    gap: 1rem;
    background: rgba(0,0,0,0.5);
    border-top: 1px solid rgba(255,255,255,0.1);
    padding-bottom: calc(1.5rem + env(safe-area-inset-bottom));
  }

  input {
    flex: 1;
    background: rgba(255,255,255,0.1);
    border: 1px solid rgba(255,255,255,0.2);
    color: #e0e0e0;
    padding: 0.8rem;
    border-radius: 8px;
    font-size: 1rem;
    font-family: inherit;
  }

  input:focus {
    outline: none;
    border-color: #ffd700;
    background: rgba(255,255,255,0.15);
  }

  button {
    background: linear-gradient(45deg, #667eea, #764ba2);
    color: white;
    border: none;
    padding: 0.8rem 2rem;
    border-radius: 8px;
    cursor: pointer;
    font-size: 1rem;
    transition: all 0.3s;
    font-family: inherit;
  }

  button:hover:not(:disabled) {
    transform: scale(1.05);
  }

  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .chat-welcome {
    padding: 2rem;
    max-width: 800px;
    margin: 0 auto;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
  }

  .chat-welcome h2 {
    color: #ffd700;
    text-align: center;
    margin-bottom: 2rem;
  }

  .welcome-section {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 10px;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
  }

  .welcome-section h3 {
    color: #4ecdc4;
    margin-bottom: 1rem;
  }

  .welcome-section ul {
    margin-left: 1.5rem;
    line-height: 1.8;
  }

  .crime-scene-gallery {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    margin-top: 1rem;
  }

  .crime-scene-gallery img {
    width: 100%;
    height: 150px;
    object-fit: cover;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s;
    border: 2px solid rgba(255,255,255,0.1);
  }

  .crime-scene-gallery img:hover {
    transform: scale(1.05);
    border-color: rgba(255,215,0,0.5);
    box-shadow: 0 4px 15px rgba(255,215,0,0.2);
  }

  .message {
    max-width: min(70%, 800px);
    padding: 1rem;
    border-radius: 12px;
    animation: fadeIn 0.3s;
  }

  .message.system {
    align-self: center;
    background: rgba(255,215,0,0.1);
    border: 1px solid rgba(255,215,0,0.3);
    color: #ffd700;
    text-align: center;
    max-width: 90%;
  }

  .message.assistant {
    align-self: flex-start;
    background: rgba(255,255,255,0.1);
    color: #e0e0e0;
  }

  .loading-message {
    display: flex;
    align-items: center;
  }

  .loading {
    display: inline-block;
    width: 24px;
    height: 24px;
    border: 3px solid rgba(255,255,255,0.2);
    border-radius: 50%;
    border-top-color: #ffd700;
    border-right-color: #ffd700;
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Responsive adjustments */
  @media (max-width: 1024px) {
    .message {
      max-width: 85%;
    }
  }

  @media (max-width: 768px) {
    .chat-header {
      padding: 1rem;
    }
    
    .chat-messages {
      padding: 1rem;
    }
    
    .chat-input-area {
      padding: 1rem;
      padding-bottom: calc(1rem + env(safe-area-inset-bottom));
    }
    
    .message {
      max-width: 90%;
    }
    
    button {
      padding: 0.8rem 1.5rem;
    }
  }
</style>
