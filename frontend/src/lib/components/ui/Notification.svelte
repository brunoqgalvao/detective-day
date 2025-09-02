<script lang="ts">
  import { uiStore } from '../../stores/game.store';
  
  $: notification = $uiStore.notification;
</script>

{#if notification}
  <div class="notification show">
    <div class="notification-content">
      <div class="notification-icon">🔍</div>
      <div class="notification-text">
        <div class="notification-title">{notification.title}</div>
        <div class="notification-description">{notification.description}</div>
      </div>
      <button 
        class="notification-close"
        on:click={() => uiStore.update(s => ({ ...s, notification: null }))}
      >
        ×
      </button>
    </div>
  </div>
{/if}

<style>
  .notification {
    position: fixed;
    top: 20px;
    right: 20px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    transform: translateX(100%);
    opacity: 0;
    transition: all 0.3s ease-out;
    z-index: 1000;
    max-width: 350px;
    border: 2px solid rgba(255, 255, 255, 0.2);
  }

  .notification.show {
    transform: translateX(0);
    opacity: 1;
  }

  .notification-content {
    display: flex;
    align-items: center;
    padding: 1rem;
    gap: 1rem;
    position: relative;
  }

  .notification-icon {
    font-size: 2rem;
    flex-shrink: 0;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .notification-text {
    flex: 1;
    color: white;
  }

  .notification-title {
    font-weight: bold;
    margin-bottom: 0.3rem;
    font-size: 1.1rem;
  }

  .notification-description {
    font-size: 0.9rem;
    opacity: 0.9;
    line-height: 1.4;
  }

  .notification-close {
    position: absolute;
    top: 8px;
    right: 12px;
    color: rgba(255, 255, 255, 0.7);
    cursor: pointer;
    font-size: 1.5rem;
    background: none;
    border: none;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: all 0.2s;
  }

  .notification-close:hover {
    background: rgba(255, 255, 255, 0.2);
    color: white;
  }
</style>