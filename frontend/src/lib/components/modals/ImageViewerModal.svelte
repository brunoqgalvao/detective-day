<script lang="ts">
  import { uiStore } from '../../stores/game.store';

  $: imageViewer = $uiStore.imageViewer;

  function closeModal() {
    uiStore.update(s => ({
      ...s,
      imageViewer: { show: false, imageSrc: '', caption: '' }
    }));
  }
</script>

{#if imageViewer.show}
  <div class="modal-overlay" on:click={closeModal} on:keydown>
    <div class="image-viewer-content" on:click|stopPropagation on:keydown>
      <button class="close-btn" on:click={closeModal}>×</button>
      <img src={imageViewer.imageSrc} alt={imageViewer.caption} />
      <div class="image-caption">{imageViewer.caption}</div>
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
    background: rgba(0, 0, 0, 0.9);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    padding: 2rem;
  }

  .image-viewer-content {
    position: relative;
    max-width: 90vw;
    max-height: 90vh;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .close-btn {
    position: absolute;
    top: -40px;
    right: -10px;
    background: none;
    border: none;
    color: white;
    font-size: 2rem;
    cursor: pointer;
    opacity: 0.8;
    transition: opacity 0.3s;
    z-index: 1001;
  }

  .close-btn:hover {
    opacity: 1;
  }

  img {
    max-width: 100%;
    max-height: calc(90vh - 80px);
    object-fit: contain;
    border-radius: 8px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
  }

  .image-caption {
    color: #e0e0e0;
    text-align: center;
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    background: rgba(0, 0, 0, 0.8);
    border-radius: 4px;
    font-size: 1rem;
  }

  @media (max-width: 768px) {
    .modal-overlay {
      padding: 1rem;
    }
    
    .close-btn {
      top: -30px;
      right: 0;
      font-size: 1.5rem;
    }
    
    img {
      max-height: calc(90vh - 60px);
    }
  }
</style>