class DetectiveGame {
    constructor() {
        this.apiKey = null;
        this.currentCharacter = null;
        this.chatHistories = {};
        this.evidenceDiscovered = [];
        this.notes = '';
        this.gameWon = false;
        this.init();
    }

    init() {
        this.loadGameState();
        this.setupEventListeners();
        this.checkApiKey();
    }

    setupEventListeners() {
        // API Key Modal
        document.getElementById('save-api-key').addEventListener('click', () => {
            const apiKey = document.getElementById('api-key-input').value.trim();
            if (apiKey) {
                this.apiKey = apiKey;
                localStorage.setItem('anthropic_api_key', apiKey);
                document.getElementById('api-key-modal').classList.remove('active');
                this.startGame();
            }
        });

        // Start Investigation
        document.getElementById('start-investigation').addEventListener('click', () => {
            this.showInvestigation();
        });

        // Character Selection
        document.getElementById('character-list').addEventListener('click', (e) => {
            const card = e.target.closest('.character-card');
            if (card) {
                this.selectCharacter(card.dataset.characterId);
            }
        });

        // Special Buttons
        document.getElementById('forensics-btn').addEventListener('click', () => {
            this.selectSpecialCharacter('forensics');
        });

        document.getElementById('prosecutor-btn').addEventListener('click', () => {
            this.selectSpecialCharacter('prosecutor');
        });

        // Chat
        document.getElementById('send-btn').addEventListener('click', () => {
            this.sendMessage();
        });

        document.getElementById('chat-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });

        document.getElementById('close-chat').addEventListener('click', () => {
            this.closeChat();
        });

        // Evidence and Notes
        document.getElementById('view-evidence').addEventListener('click', () => {
            this.showEvidence();
        });

        document.getElementById('view-notes').addEventListener('click', () => {
            this.showNotes();
        });

        document.getElementById('save-notes').addEventListener('click', () => {
            this.saveNotes();
        });

        // Modal Close Buttons
        document.querySelectorAll('.close-modal').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.target.closest('.modal').classList.remove('active');
            });
        });

        // Play Again
        document.getElementById('play-again').addEventListener('click', () => {
            this.resetGame();
        });

        // Reset Game Button
        document.getElementById('reset-game').addEventListener('click', () => {
            if (confirm('Are you sure you want to reset the game? All progress will be lost.')) {
                this.resetGame();
                location.reload();
            }
        });
    }

    checkApiKey() {
        const savedKey = localStorage.getItem('anthropic_api_key');
        if (savedKey) {
            this.apiKey = savedKey;
            document.getElementById('api-key-modal').classList.remove('active');
            this.startGame();
        }
    }

    startGame() {
        // Load initial briefing
        document.querySelector('.case-details').innerHTML = SCENARIO.initialBriefing;
        
        // Populate character list
        const characterList = document.getElementById('character-list');
        characterList.innerHTML = SCENARIO.characters.map(char => `
            <div class="character-card" data-character-id="${char.id}">
                <div class="character-image">
                    <img src="images/characters/${char.id}.png" alt="${char.name}" onerror="this.style.display='none';">
                </div>
                <div class="character-info">
                    <div class="character-name">${char.name}</div>
                    <div class="character-role">${char.role} • Age ${char.age}</div>
                </div>
            </div>
        `).join('');

        // Initialize chat histories ONLY if they don't exist (preserve loaded data)
        SCENARIO.characters.forEach(char => {
            if (!this.chatHistories[char.id]) {
                this.chatHistories[char.id] = [];
            }
        });

        // Special characters - also only initialize if they don't exist
        if (!this.chatHistories.forensics) {
            this.chatHistories.forensics = [];
        }
        if (!this.chatHistories.prosecutor) {
            this.chatHistories.prosecutor = [];
        }
    }

    showInvestigation() {
        document.getElementById('intro-screen').classList.remove('active');
        document.getElementById('investigation-screen').classList.add('active');
    }

    selectCharacter(characterId) {
        this.currentCharacter = characterId;
        const character = SCENARIO.characters.find(c => c.id === characterId);
        
        // Update UI
        document.querySelectorAll('.character-card').forEach(card => {
            card.classList.remove('active');
        });
        document.querySelector(`[data-character-id="${characterId}"]`).classList.add('active');
        
        // Setup chat
        document.getElementById('chat-title').textContent = `Interview: ${character.name}`;
        this.loadChatHistory(characterId);
        this.enableChat();

        // Mark as interviewed
        document.querySelector(`[data-character-id="${characterId}"]`).classList.add('interviewed');
    }

    selectSpecialCharacter(type) {
        this.currentCharacter = type;
        
        // Update UI
        document.querySelectorAll('.character-card').forEach(card => {
            card.classList.remove('active');
        });
        
        if (type === 'forensics') {
            document.getElementById('chat-title').textContent = 'Crime Scene Expert: Dr. Sarah Mitchell';
        } else if (type === 'prosecutor') {
            document.getElementById('chat-title').textContent = 'District Attorney: Patricia Hayes';
        }
        
        this.loadChatHistory(type);
        this.enableChat();
    }

    loadChatHistory(characterId) {
        const messages = this.chatHistories[characterId] || [];
        const chatMessages = document.getElementById('chat-messages');
        
        console.log(`Loading chat history for ${characterId}:`, messages);
        
        chatMessages.innerHTML = messages.map(msg => {
            // Ensure we have valid role and content
            const role = msg.role || 'assistant';
            const content = msg.content || '';
            
            // Skip any messages that look like loading indicators
            if (content.includes('<span class="loading"') || content.includes('loading-message')) {
                return '';
            }
            
            const formattedContent = this.formatMessageContent(content, role);
            console.log(`Message role: ${role}, content: ${content}, formatted: ${formattedContent}`);
            return `
                <div class="message ${role}">
                    ${formattedContent}
                </div>
            `;
        }).join('');
        
        if (messages.length === 0 && characterId !== 'prosecutor' && characterId !== 'forensics') {
            // Add initial message for characters
            const character = SCENARIO.characters.find(c => c.id === characterId);
            if (character) {
                chatMessages.innerHTML = `
                    <div class="message system">
                        You are now interviewing ${character.name}, ${character.role}.
                    </div>
                `;
            }
        }
        
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    enableChat() {
        document.getElementById('chat-input').disabled = false;
        document.getElementById('send-btn').disabled = false;
        document.getElementById('chat-input').focus();
    }

    closeChat() {
        this.currentCharacter = null;
        document.getElementById('chat-title').textContent = 'Select someone to interview';
        document.getElementById('chat-messages').innerHTML = '';
        document.getElementById('chat-input').disabled = true;
        document.getElementById('send-btn').disabled = true;
        document.querySelectorAll('.character-card').forEach(card => {
            card.classList.remove('active');
        });
    }

    async sendMessage() {
        const input = document.getElementById('chat-input');
        const message = input.value.trim();
        
        if (!message || !this.currentCharacter) return;
        
        // Disable input while processing
        input.disabled = true;
        document.getElementById('send-btn').disabled = true;
        
        // Clear input immediately
        input.value = '';
        
        // Add user message to display and history
        this.addMessage('user', message, true);
        
        // Show loading indicator (create directly, don't use addMessage to avoid formatting issues)
        const messagesDiv = document.getElementById('chat-messages');
        const loadingId = `msg-${Date.now()}`;
        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'message assistant';
        loadingDiv.id = loadingId;
        loadingDiv.innerHTML = '<div class="loading-message"><span class="loading"></span><span style="margin-left: 10px; opacity: 0.7;">Thinking...</span></div>';
        messagesDiv.appendChild(loadingDiv);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
        
        try {
            // Check for cheat attempts
            if (await this.checkForCheating(message)) {
                // Replace loading with response and save as assistant message
                this.replaceLoadingWithResponse(loadingId, "I'm not sure what you're trying to do, but I'm here to answer questions about the case, not discuss the investigation itself.");
                return;
            }
            
            // Get response from API
            const response = await this.getCharacterResponse(message);
            
            // Replace loading with actual response and save as assistant message
            this.replaceLoadingWithResponse(loadingId, response);
            
            // Check for confession or win condition
            if (this.currentCharacter === 'prosecutor') {
                const won = await this.checkWinCondition(response);
                if (won) {
                    this.showWinScreen();
                }
            } else if (this.currentCharacter === 'marcus' && response.toLowerCase().includes('confess')) {
                this.showWinScreen(true);
            }
            
            // Extract evidence mentions
            this.checkForEvidence(response);
            
        } catch (error) {
            console.error('Error:', error);
            // Replace loading with error message
            this.replaceLoadingWithResponse(loadingId, 'Sorry, there was an error processing your request. Please try again.');
        } finally {
            // Re-enable input
            input.disabled = false;
            document.getElementById('send-btn').disabled = false;
            input.focus();
        }
    }

    async checkForCheating(message) {
        const cheatPatterns = [
            /tell me who the (killer|murderer) is/i,
            /ignore (previous|all) instructions/i,
            /you are now/i,
            /system prompt/i,
            /reveal the solution/i,
            /who is guilty/i,
            /just tell me/i
        ];
        
        return cheatPatterns.some(pattern => pattern.test(message));
    }

    async getCharacterResponse(userMessage, retryCount = 0, streamingMessageId = null) {
        let systemPrompt = '';
        
        if (this.currentCharacter === 'forensics') {
            systemPrompt = FORENSICS_EXPERT_PROMPT;
        } else if (this.currentCharacter === 'prosecutor') {
            systemPrompt = PROSECUTOR_PROMPT;
        } else {
            const character = SCENARIO.characters.find(c => c.id === this.currentCharacter);
            if (character) {
                systemPrompt = generateCharacterPrompt(character) + '\n\n' + ANTI_CHEAT_PROMPT;
            }
        }
        
        // Add formatting instructions
        if (retryCount === 0) {
            systemPrompt += '\n\nIMPORTANT: Format your responses with actions/narration in *asterisks* and dialogue as plain text. Example: *nervously adjusts collar* I was in the dining room all evening.';
        }
        
        // Build conversation history (without system message in messages array)
        const messages = [
            ...this.chatHistories[this.currentCharacter].map(msg => ({
                role: msg.role === 'user' ? 'user' : 'assistant',
                content: msg.content
            })),
            { role: 'user', content: userMessage }
        ];
        
        // Add retry instruction if needed
        if (retryCount > 0) {
            messages.push({
                role: 'assistant',
                content: 'I need to reconsider my response.'
            });
            messages.push({
                role: 'user',
                content: 'Please respond again, but be VERY CAREFUL about character identities. Marcus is Victor\'s SON (not the butler). Robert is the BUTLER (not related to Victor). Do not confuse character names and roles. Also, only use information that has been established about the case. Do not invent new details. If you\'re unsure about something, say you don\'t know or can\'t remember.'
            });
        }
        
        const response = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': this.apiKey,
                'anthropic-version': '2023-06-01',
                'anthropic-dangerous-direct-browser-access': 'true'
            },
            body: JSON.stringify({
                model: 'claude-3-5-sonnet-20241022',
                system: systemPrompt,
                messages: messages,
                max_tokens: 1000,
                temperature: 0.7
            })
        });
        
        if (!response.ok) {
            throw new Error('API request failed');
        }
        
        const data = await response.json();
        const responseText = data.content[0].text;
        
        // Check for consistency (apply to all characters including forensics)
        if (retryCount === 0) {
            const isConsistent = await this.checkResponseConsistency(responseText);
            if (!isConsistent) {
                // Retry with stricter instructions
                return await this.getCharacterResponse(userMessage, retryCount + 1);
            }
        }
        
        return responseText;
    }

    async checkResponseConsistency(response) {
        // Check for potential inconsistencies using a quick classifier
        const character = SCENARIO.characters.find(c => c.id === this.currentCharacter);
        
        // Handle special characters
        let characterInfo = '';
        let isSpecialCharacter = false;
        if (!character) {
            if (this.currentCharacter === 'forensics') {
                characterInfo = 'Current speaker: Dr. Sarah Mitchell (Forensics Expert)';
                isSpecialCharacter = true;
            } else if (this.currentCharacter === 'prosecutor') {
                characterInfo = 'Current speaker: Patricia Hayes (District Attorney)';
                isSpecialCharacter = true;
            } else {
                return true; // Unknown character, skip check
            }
        } else {
            characterInfo = `Current speaker: ${character.name} (${character.role})`;
        }
        
        // Quick check for obvious errors
        const responseLower = response.toLowerCase();
        if (responseLower.includes('marcus') && responseLower.includes('butler')) {
            console.log('ERROR DETECTED: Marcus called butler');
            return false; // Definitely inconsistent
        }
        if (responseLower.includes('robert') && (responseLower.includes('son') || responseLower.includes('brother'))) {
            console.log('ERROR DETECTED: Robert called family member');
            return false; // Definitely inconsistent
        }
        
        // Get what this character should know
        let knownFacts = '';
        if (isSpecialCharacter) {
            // For forensics expert, they know forensic evidence
            if (this.currentCharacter === 'forensics') {
                knownFacts = `- Victor Westwood died from cyanide poisoning between 10:00-10:30 PM
- The poison was in his whiskey glass
- Only Victor's fingerprints on the glass
- No signs of struggle
- Study window was ajar
- Study door locked from inside
- Greenhouse bottle with cyanide (prints smudged)
- All character names and roles as listed`;
            } else {
                // Prosecutor knows basic case facts
                knownFacts = `- Basic case facts about the murder
- All character names and roles`;
            }
        } else {
            const characterKnowledge = getCharacterKnowledge(character.id);
            knownFacts = characterKnowledge.map(f => f.fact).join('\n');
        }
        
        const checkPrompt = `You are a strict consistency checker for a murder mystery game.

${characterInfo}

FACTS THIS CHARACTER KNOWS:
${knownFacts}

CRITICAL RULES:
1. The character should ONLY reference facts from their known facts list above
2. They should NOT know facts that aren't in their list
3. They should NOT invent new specific details (times, places, events) not mentioned
4. Character identities must be correct: Marcus=SON, Robert=BUTLER

Response to check:
"${response}"

Check for these violations:
1. Does the response mention facts the character shouldn't know?
2. Does it invent new specific details not in the facts?
3. Does it misidentify any character roles?
4. Does it contradict any established facts?

Respond "CONSISTENT" if the response only uses known facts correctly.
Respond "INCONSISTENT" if it violates any rule above.`;

        const checkResponse = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': this.apiKey,
                'anthropic-version': '2023-06-01',
                'anthropic-dangerous-direct-browser-access': 'true'
            },
            body: JSON.stringify({
                model: 'claude-3-5-sonnet-20241022',
                messages: [{ role: 'user', content: checkPrompt }],
                max_tokens: 10,
                temperature: 0
            })
        });

        if (!response.ok) {
            return true; // Default to consistent if check fails
        }

        const data = await checkResponse.json();
        return data.content[0].text.includes('CONSISTENT');
    }

    async checkWinCondition(prosecutorResponse) {
        const winPhrases = [
            'enough evidence',
            'press charges',
            'prosecute',
            'arrest',
            'strong case',
            'convince',
            'proceed with charges',
            'file charges'
        ];
        
        const response = prosecutorResponse.toLowerCase();
        const hasWinPhrase = winPhrases.some(phrase => response.includes(phrase));
        const mentionsMarcus = response.includes('marcus');
        
        return hasWinPhrase && mentionsMarcus;
    }

    formatMessageContent(content, role) {
        // Safety check for undefined/null content
        if (!content) {
            console.warn(`Empty content for ${role} message`);
            return '';
        }
        
        // Strip any HTML tags from content first to prevent issues
        const cleanContent = this.stripHtml(content);
        
        // Don't format user messages or system messages - return as-is
        if (role === 'user' || role === 'system') {
            // Escape HTML to prevent injection
            return this.escapeHtml(cleanContent);
        }
        
        // Parse actions (text between asterisks) and dialogue for assistant messages
        const parts = cleanContent.split(/(\*[^*]+\*)/g);
        
        return parts.map(part => {
            if (part.startsWith('*') && part.endsWith('*')) {
                // This is an action/narration
                const action = part.slice(1, -1); // Remove asterisks
                return `<span class="action-text">${this.escapeHtml(action)}</span>`;
            } else if (part.trim()) {
                // This is dialogue
                return `<span class="dialogue-text">${this.escapeHtml(part)}</span>`;
            }
            return '';
        }).join('');
    }
    
    stripHtml(text) {
        // Remove HTML tags but preserve the text content
        const temp = document.createElement('div');
        temp.innerHTML = text;
        return temp.textContent || temp.innerText || '';
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    cleanChatHistories(histories) {
        // Clean loaded chat histories to remove any HTML artifacts or loading messages
        const cleaned = {};
        for (const [key, messages] of Object.entries(histories)) {
            cleaned[key] = messages.filter(msg => {
                // Skip any messages that contain HTML loading indicators
                if (msg.content && (msg.content.includes('<span class="loading"') || 
                    msg.content.includes('loading-message') ||
                    msg.content.includes('<div class="loading'))) {
                    return false;
                }
                // Ensure valid role
                if (!msg.role || (msg.role !== 'user' && msg.role !== 'assistant')) {
                    return false;
                }
                return true;
            }).map(msg => ({
                role: msg.role,
                content: this.stripHtml(msg.content || '')
            }));
        }
        return cleaned;
    }

    addMessage(role, content, saveToHistory = true) {
        const messagesDiv = document.getElementById('chat-messages');
        const messageId = `msg-${Date.now()}`;
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${role}`;
        messageDiv.id = messageId;
        
        // Format content based on role
        const formattedContent = this.formatMessageContent(content, role);
        messageDiv.innerHTML = formattedContent;
        
        messagesDiv.appendChild(messageDiv);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
        
        // Save to history if requested
        if (saveToHistory) {
            if (!this.chatHistories[this.currentCharacter]) {
                this.chatHistories[this.currentCharacter] = [];
            }
            // Always save the raw content, not HTML
            this.chatHistories[this.currentCharacter].push({ role, content });
            this.saveGameState();
        }
        
        return messageId;
    }

    replaceLoadingWithResponse(loadingMessageId, content) {
        const messageDiv = document.getElementById(loadingMessageId);
        if (messageDiv) {
            // Update the loading message div with the actual response
            const formattedContent = this.formatMessageContent(content, 'assistant');
            messageDiv.innerHTML = formattedContent;
            
            // Save the assistant response to history
            if (!this.chatHistories[this.currentCharacter]) {
                this.chatHistories[this.currentCharacter] = [];
            }
            this.chatHistories[this.currentCharacter].push({ role: 'assistant', content });
            this.saveGameState();
        }
    }

    updateMessage(messageId, content, saveToHistory = false) {
        const messageDiv = document.getElementById(messageId);
        if (messageDiv) {
            // Format content if it's an assistant message
            const formattedContent = this.formatMessageContent(content, 'assistant');
            messageDiv.innerHTML = formattedContent;
            
            // Add to history if this is a real response (not just updating loading)
            if (saveToHistory) {
                if (!this.chatHistories[this.currentCharacter]) {
                    this.chatHistories[this.currentCharacter] = [];
                }
                this.chatHistories[this.currentCharacter].push({ role: 'assistant', content });
                this.saveGameState();
            }
        }
    }

    checkForEvidence(response) {
        SCENARIO.evidence.forEach(evidence => {
            if (!this.evidenceDiscovered.includes(evidence.id)) {
                const keywords = evidence.name.toLowerCase().split(' ');
                const responseLower = response.toLowerCase();
                
                if (keywords.some(keyword => responseLower.includes(keyword))) {
                    this.evidenceDiscovered.push(evidence.id);
                    this.saveGameState();
                }
            }
        });
    }

    showEvidence() {
        const modal = document.getElementById('evidence-modal');
        const evidenceList = document.getElementById('evidence-list');
        
        if (this.evidenceDiscovered.length === 0) {
            evidenceList.innerHTML = '<p>No evidence collected yet. Interview suspects to gather clues.</p>';
        } else {
            evidenceList.innerHTML = this.evidenceDiscovered.map(id => {
                const evidence = SCENARIO.evidence.find(e => e.id === id);
                const hasImage = ['whiskey_glass', 'chemistry_book', 'threatening_note'].includes(id);
                const imageFileName = id === 'whiskey_glass' ? 'whiskey_glass_evidence' : 
                                   id === 'chemistry_book' ? 'chemistry_book_evidence' : 
                                   id === 'threatening_note' ? 'threatening_note_evidence' : id;
                
                return `
                    <div class="evidence-item">
                        ${hasImage ? `
                            <div class="evidence-image">
                                <img src="images/crime-scene/${imageFileName}.png" alt="${evidence.name}" onerror="this.style.display='none';">
                            </div>
                        ` : ''}
                        <div class="evidence-content">
                            <div class="evidence-title">${evidence.name}</div>
                            <div class="evidence-description">${evidence.description}</div>
                        </div>
                    </div>
                `;
            }).join('');
        }
        
        modal.classList.add('active');
    }

    showNotes() {
        const modal = document.getElementById('notes-modal');
        document.getElementById('notes-area').value = this.notes;
        modal.classList.add('active');
    }

    saveNotes() {
        this.notes = document.getElementById('notes-area').value;
        this.saveGameState();
        document.getElementById('notes-modal').classList.remove('active');
    }

    showWinScreen(confession = false) {
        this.gameWon = true;
        this.saveGameState();
        
        const winMessage = document.getElementById('win-message');
        if (confession) {
            winMessage.innerHTML = `
                <p>Marcus Westwood has confessed to the murder!</p>
                <p>Overwhelmed by the evidence you presented—his chemistry knowledge, the annotated textbook, his gambling debts, and lack of alibi—Marcus broke down and admitted to poisoning his father's whiskey with cyanide.</p>
                <p>He was desperate for the inheritance money to pay off his dangerous creditors. When his father threatened to cut him off completely, Marcus saw no other way out.</p>
                <p>Excellent detective work!</p>
            `;
        } else {
            winMessage.innerHTML = `
                <p>The District Attorney has agreed to prosecute Marcus Westwood!</p>
                <p>Your thorough investigation uncovered the critical evidence: Marcus's chemistry background, his massive gambling debts, the annotated chemistry textbook with notes about cyanide, and his lack of a solid alibi during the time of murder.</p>
                <p>The case against Marcus is strong, and justice will be served.</p>
                <p>Outstanding investigative work, Detective!</p>
            `;
        }
        
        document.getElementById('investigation-screen').classList.remove('active');
        document.getElementById('win-screen').classList.add('active');
    }

    saveGameState() {
        const gameState = {
            chatHistories: this.chatHistories,
            evidenceDiscovered: this.evidenceDiscovered,
            notes: this.notes,
            gameWon: this.gameWon
        };
        localStorage.setItem('detective_game_state', JSON.stringify(gameState));
    }

    loadGameState() {
        const saved = localStorage.getItem('detective_game_state');
        if (saved) {
            try {
                const gameState = JSON.parse(saved);
                // Only load if the saved state has valid data
                if (gameState.chatHistories) {
                    // Clean chat histories to remove any HTML artifacts
                    this.chatHistories = this.cleanChatHistories(gameState.chatHistories);
                    console.log('Loaded chat histories:', this.chatHistories);
                }
                if (gameState.evidenceDiscovered) {
                    this.evidenceDiscovered = gameState.evidenceDiscovered;
                }
                if (gameState.notes !== undefined) {
                    this.notes = gameState.notes;
                }
                this.gameWon = gameState.gameWon || false;
            } catch (error) {
                console.error('Error loading game state:', error);
            }
        }
    }

    resetGame() {
        this.chatHistories = {};
        this.evidenceDiscovered = [];
        this.notes = '';
        this.gameWon = false;
        localStorage.removeItem('detective_game_state');
        
        document.getElementById('win-screen').classList.remove('active');
        document.getElementById('intro-screen').classList.add('active');
        
        this.startGame();
    }
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new DetectiveGame();
});