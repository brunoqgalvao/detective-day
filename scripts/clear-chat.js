// Quick script to clear chat histories with system messages
// Run this in the browser console if needed

// Clear all chat histories
gameStore.update(state => ({
  ...state,
  chatHistories: {}
}));

// Or just clear current character
gameStore.selectCharacter(null);

console.log('Chat histories cleared!');