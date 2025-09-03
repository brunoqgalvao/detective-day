<script lang="ts">
  import type { ChatMessage } from '../../types/game.types';
  
  export let message: ChatMessage;
  
  function formatContent(content: string, role: string): string {
    if (role !== 'assistant') return content;
    
    // Parse actions (text between asterisks) and dialogue
    const parts = content.split(/(\*[^*]+\*)/g);
    
    return parts.map(part => {
      if (part.startsWith('*') && part.endsWith('*')) {
        // This is an action/narration
        const action = part.slice(1, -1);
        return `<span class="action-text">${action}</span>`;
      } else if (part.trim()) {
        // This is dialogue
        return `<span class="dialogue-text">${part}</span>`;
      }
      return '';
    }).join('');
  }
</script>

<div class="message {message.role}">
  {#if message.role === 'assistant'}
    {@html formatContent(message.content, message.role)}
  {:else}
    {message.content}
  {/if}
</div>

<style>
  .message {
    max-width: 70%;
    padding: 1rem;
    border-radius: 12px;
    animation: fadeIn 0.3s;
  }

  .message.user {
    align-self: flex-end;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    margin-left: auto;
  }

  .message.assistant {
    align-self: flex-start;
    background: rgba(255,255,255,0.1);
    color: #e0e0e0;
  }

  .message.system {
    align-self: center;
    background: rgba(255,215,0,0.1);
    border: 1px solid rgba(255,215,0,0.3);
    color: #ffd700;
    text-align: center;
    max-width: 90%;
    margin: 0 auto;
  }

  :global(.action-text) {
    font-style: italic;
    color: #a0a0a0;
    display: block;
    margin-bottom: 0.5rem;
    font-size: 0.95rem;
  }

  :global(.dialogue-text) {
    color: #e0e0e0;
    display: block;
    line-height: 1.5;
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

  @media (max-width: 768px) {
    .message {
      max-width: 90%;
    }
  }
</style>
