class DetectiveGame {
    constructor() {
        this.apiKey = null;
        this.currentCharacter = null;
        this.chatHistories = {};
        this.evidenceDiscovered = [];
        this.milestonesDiscovered = [];
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

        // How to Play button
        document.getElementById('how-to-play-btn').addEventListener('click', () => {
            this.showHowToPlay();
        });

        // Help button (investigation screen)
        document.getElementById('help-btn').addEventListener('click', () => {
            this.showHowToPlay();
        });

        // Settings button
        document.getElementById('settings-btn').addEventListener('click', () => {
            this.showSettings();
        });

        // Update API key button
        document.getElementById('update-api-key').addEventListener('click', () => {
            this.updateApiKey();
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

        // Click outside to close modals
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal && !modal.id.includes('api-key')) {
                    modal.classList.remove('active');
                }
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

        // Milestone notification close
        document.querySelector('.milestone-close').addEventListener('click', () => {
            this.hideMilestoneNotification();
        });

        // Auto-hide milestone notification after 5 seconds
        document.getElementById('milestone-notification').addEventListener('click', (e) => {
            if (e.target.id === 'milestone-notification') {
                this.hideMilestoneNotification();
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
        
        // Update notification badges on startup
        this.updateNotificationBadges();
    }

    showInvestigation() {
        document.getElementById('intro-screen').classList.remove('active');
        document.getElementById('investigation-screen').classList.add('active');
    }

    showHowToPlay() {
        document.getElementById('how-to-play-modal').classList.add('active');
    }

    showSettings() {
        const modal = document.getElementById('settings-modal');
        const apiKeyInput = document.getElementById('settings-api-key');
        
        // Show current API key (masked)
        if (this.apiKey) {
            apiKeyInput.value = this.apiKey.substring(0, 10) + '...' + this.apiKey.substring(this.apiKey.length - 4);
        }
        
        modal.classList.add('active');
    }

    updateApiKey() {
        const newApiKey = document.getElementById('settings-api-key').value.trim();
        
        if (newApiKey && !newApiKey.includes('...')) {
            // Only update if it's a new key (not the masked display)
            this.apiKey = newApiKey;
            localStorage.setItem('anthropic_api_key', newApiKey);
            
            // Show success feedback
            const updateBtn = document.getElementById('update-api-key');
            const originalText = updateBtn.textContent;
            updateBtn.textContent = 'Updated!';
            updateBtn.style.backgroundColor = '#4ecdc4';
            
            setTimeout(() => {
                updateBtn.textContent = originalText;
                updateBtn.style.backgroundColor = '';
                document.getElementById('settings-modal').classList.remove('active');
            }, 1500);
        }
    }

    showImageViewer(imageSrc, caption) {
        const modal = document.getElementById('image-viewer-modal');
        const img = document.getElementById('viewer-image');
        const captionDiv = document.getElementById('viewer-caption');
        
        img.src = imageSrc;
        img.alt = caption;
        captionDiv.textContent = caption;
        
        modal.classList.add('active');
    }

    selectCharacter(characterId) {
        this.currentCharacter = characterId;
        const character = SCENARIO.characters.find(c => c.id === characterId);
        
        // Update UI
        document.querySelectorAll('.character-card').forEach(card => {
            card.classList.remove('active');
        });
        document.querySelector(`[data-character-id="${characterId}"]`).classList.add('active');
        
        // Show chat header and input area
        document.querySelector('.chat-header').style.display = 'flex';
        document.querySelector('.chat-input-area').style.display = 'flex';
        
        // Setup chat with character image
        document.getElementById('chat-title').textContent = `Interview: ${character.name}`;
        const chatImage = document.getElementById('chat-character-image');
        chatImage.src = `images/characters/${characterId}.png`;
        chatImage.alt = character.name;
        chatImage.style.display = 'block';
        chatImage.onclick = () => this.showImageViewer(`images/characters/${characterId}.png`, character.name);
        
        // Hide welcome content when character selected
        const welcomeContent = document.getElementById('chat-welcome');
        if (welcomeContent) welcomeContent.style.display = 'none';
        
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
        
        // Show chat header and input area
        document.querySelector('.chat-header').style.display = 'flex';
        document.querySelector('.chat-input-area').style.display = 'flex';
        
        const chatImage = document.getElementById('chat-character-image');
        
        if (type === 'forensics') {
            document.getElementById('chat-title').textContent = 'Crime Scene Expert: Dr. Sarah Mitchell';
            chatImage.src = 'images/characters/forensics.png';
            chatImage.alt = 'Dr. Sarah Mitchell';
            chatImage.style.display = 'block';
            chatImage.onclick = () => this.showImageViewer('images/characters/forensics.png', 'Dr. Sarah Mitchell');
        } else if (type === 'prosecutor') {
            document.getElementById('chat-title').textContent = 'District Attorney: Patricia Hayes';
            chatImage.src = 'images/characters/prosecutor.png';
            chatImage.alt = 'Patricia Hayes';
            chatImage.style.display = 'block';
            chatImage.onclick = () => this.showImageViewer('images/characters/prosecutor.png', 'Patricia Hayes');
        }
        
        // Hide welcome content when special character selected
        const welcomeContent = document.getElementById('chat-welcome');
        if (welcomeContent) welcomeContent.style.display = 'none';
        
        this.loadChatHistory(type);
        this.enableChat();
    }

    loadChatHistory(characterId) {
        const messages = this.chatHistories[characterId] || [];
        const chatMessages = document.getElementById('chat-messages');
        
        console.log(`Loading chat history for ${characterId}:`, messages);
        
        // Hide welcome content without removing it
        const welcomeContent = document.getElementById('chat-welcome');
        if (welcomeContent) {
            welcomeContent.style.display = 'none';
        }
        
        // Create a container for chat messages if it doesn't exist
        let chatContainer = document.getElementById('chat-messages-container');
        if (!chatContainer) {
            chatContainer = document.createElement('div');
            chatContainer.id = 'chat-messages-container';
            chatMessages.appendChild(chatContainer);
        }
        
        // Show the chat container
        chatContainer.style.display = 'block';
        
        chatContainer.innerHTML = messages.map(msg => {
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
                chatContainer.innerHTML = `
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
        document.getElementById('chat-character-image').style.display = 'none';
        
        // Hide chat header and input area for empty state
        document.querySelector('.chat-header').style.display = 'none';
        document.querySelector('.chat-input-area').style.display = 'none';
        
        // Remove the chat messages container entirely so it gets recreated fresh next time
        const chatContainer = document.getElementById('chat-messages-container');
        if (chatContainer) {
            chatContainer.remove();
        }
        
        // Show welcome content
        const welcomeContent = document.getElementById('chat-welcome');
        if (welcomeContent) {
            welcomeContent.style.display = 'flex';
        }
        
        document.getElementById('chat-input').disabled = true;
        document.getElementById('send-btn').disabled = true;
        document.getElementById('chat-input').value = '';
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
        let chatContainer = document.getElementById('chat-messages-container');
        if (!chatContainer) {
            const messagesDiv = document.getElementById('chat-messages');
            chatContainer = document.createElement('div');
            chatContainer.id = 'chat-messages-container';
            messagesDiv.appendChild(chatContainer);
        }
        
        const loadingId = `msg-${Date.now()}`;
        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'message assistant';
        loadingDiv.id = loadingId;
        loadingDiv.innerHTML = '<div class="loading-message"><span class="loading"></span><span style="margin-left: 10px; opacity: 0.7;">Thinking...</span></div>';
        chatContainer.appendChild(loadingDiv);
        chatContainer.scrollTop = chatContainer.scrollHeight;
        
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
            
            // Check for milestone discoveries
            await this.checkForMilestones(response);
            
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
                model: 'claude-sonnet-4-20250514',
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
        
        // Get the user's last message to check relevance
        const lastUserMessage = this.chatHistories[this.currentCharacter].slice(-1)[0]?.content || '';
        
        const checkPrompt = `You are a strict consistency checker for a murder mystery game.

${characterInfo}

User's question that prompted this response:
"${lastUserMessage}"

FACTS THIS CHARACTER KNOWS:
${knownFacts}

CRITICAL RULES:
1. The character should ONLY reference facts from their known facts list above
2. They should NOT know facts that aren't in their list
3. They should NOT invent new specific details (times, places, events) not mentioned
4. Character identities must be correct: Marcus=SON, Robert=BUTLER
5. Information should be RELEVANT to the question asked (with exceptions below)

Response to check:
"${response}"

Check for these violations:
1. Does the response mention facts the character shouldn't know?
2. Does it invent new specific details not in the facts?
3. Does it misidentify any character roles?
4. Does it contradict any established facts?
5. Does it volunteer completely unrelated information without motivation?
   - Exception: Characters MAY subtly deflect suspicion (mentioning others' suspicious behavior)
   - Exception: Characters MAY establish alibis (mentioning who they were with)
   - But random facts like "he studied chemistry" when asked about alibis = INCONSISTENT

Respond "CONSISTENT" if the response follows all rules.
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
                model: 'claude-sonnet-4-20250514',
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
        // Get or create the chat container
        let chatContainer = document.getElementById('chat-messages-container');
        if (!chatContainer) {
            const messagesDiv = document.getElementById('chat-messages');
            chatContainer = document.createElement('div');
            chatContainer.id = 'chat-messages-container';
            messagesDiv.appendChild(chatContainer);
        }
        
        const messageId = `msg-${Date.now()}`;
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${role}`;
        messageDiv.id = messageId;
        
        // Format content based on role
        const formattedContent = this.formatMessageContent(content, role);
        messageDiv.innerHTML = formattedContent;
        
        chatContainer.appendChild(messageDiv);
        chatContainer.scrollTop = chatContainer.scrollHeight;
        
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

    async checkForMilestones(response) {
        const newMilestones = [];
        
        // Check each milestone against the response
        for (const [id, milestone] of Object.entries(DISCOVERY_MILESTONES)) {
            // Skip already discovered milestones
            if (this.milestonesDiscovered.includes(id)) continue;
            
            // Use AI classifier to determine if milestone was discovered
            const discovered = await this.classifyMilestoneDiscovery(response, milestone);
            
            if (discovered) {
                this.milestonesDiscovered.push(id);
                newMilestones.push(milestone);
                
                // Show notification for the discovery
                this.showMilestoneNotification(milestone);
                
                // Update UI badges
                this.updateNotificationBadges();
            }
        }
        
        if (newMilestones.length > 0) {
            this.saveGameState();
        }
        
        return newMilestones;
    }

    async classifyMilestoneDiscovery(response, milestone) {
        try {
            // Create a focused prompt to detect if this specific milestone was revealed
            const classificationPrompt = `You are analyzing a detective game dialogue to detect if specific information was revealed.

MILESTONE TO DETECT: "${milestone.title}"
DESCRIPTION: ${milestone.description}
KEYWORDS: ${milestone.keywords.join(', ')}

DIALOGUE RESPONSE TO ANALYZE:
"${response}"

INSTRUCTIONS:
- Respond "YES" if the dialogue clearly reveals or confirms this specific information
- Respond "NO" if the information is not mentioned or only vaguely hinted at
- Be precise - only detect clear revelations of this exact information

RESPONSE:`;

            const classificationResponse = await fetch('https://api.anthropic.com/v1/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': this.apiKey,
                    'anthropic-version': '2023-06-01',
                    'anthropic-dangerous-direct-browser-access': 'true'
                },
                body: JSON.stringify({
                    model: 'claude-sonnet-4-20250514',
                    messages: [{ role: 'user', content: classificationPrompt }],
                    max_tokens: 5,
                    temperature: 0
                })
            });

            if (!classificationResponse.ok) {
                return false; // Default to no discovery if classification fails
            }

            const data = await classificationResponse.json();
            const result = data.content[0].text.trim().toUpperCase();
            
            return result === 'YES';
            
        } catch (error) {
            console.error('Milestone classification error:', error);
            return false;
        }
    }

    showEvidence() {
        const modal = document.getElementById('evidence-modal');
        const evidenceList = document.getElementById('evidence-list');
        
        // Clear notification badges when viewing evidence
        document.getElementById('evidence-badge').style.display = 'none';
        
        let content = '';
        
        // Show traditional evidence items
        if (this.evidenceDiscovered.length > 0) {
            content += '<h4 style="color: #4ecdc4; margin-bottom: 1rem;">🔬 Physical Evidence</h4>';
            content += this.evidenceDiscovered.map(id => {
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
        
        // Show discovered milestones organized by category
        if (this.milestonesDiscovered.length > 0) {
            content += '<h4 style="color: #ffd700; margin: 2rem 0 1rem 0;">🔍 Investigation Discoveries</h4>';
            
            // Group milestones by category
            const categorizedMilestones = {};
            this.milestonesDiscovered.forEach(milestoneId => {
                const milestone = DISCOVERY_MILESTONES[milestoneId];
                if (!categorizedMilestones[milestone.category]) {
                    categorizedMilestones[milestone.category] = [];
                }
                categorizedMilestones[milestone.category].push(milestone);
            });
            
            // Display milestones by category
            Object.entries(categorizedMilestones).forEach(([categoryKey, milestones]) => {
                const category = MILESTONE_CATEGORIES[categoryKey];
                content += `<div class="milestone-category">
                    <h5 style="color: ${category.color}; margin: 1rem 0 0.5rem 0;">${category.icon} ${category.name}</h5>
                `;
                
                milestones.forEach(milestone => {
                    const importance = MILESTONE_IMPORTANCE[milestone.importance];
                    content += `
                        <div class="evidence-item milestone-item">
                            <div class="milestone-indicator" style="background-color: ${importance.color}"></div>
                            <div class="evidence-content">
                                <div class="evidence-title" style="color: ${category.color}">${milestone.title}</div>
                                <div class="evidence-description">${milestone.description}</div>
                            </div>
                        </div>
                    `;
                });
                
                content += '</div>';
            });
        }
        
        if (this.evidenceDiscovered.length === 0 && this.milestonesDiscovered.length === 0) {
            content = '<p>No evidence or discoveries made yet. Interview suspects to gather clues and uncover information.</p>';
        }
        
        evidenceList.innerHTML = content;
        modal.classList.add('active');
    }

    showMilestoneNotification(milestone) {
        const notification = document.getElementById('milestone-notification');
        const category = MILESTONE_CATEGORIES[milestone.category] || MILESTONE_CATEGORIES.behavior;
        
        // Update notification content
        document.querySelector('.milestone-icon').textContent = category.icon;
        document.querySelector('.milestone-title').textContent = milestone.title;
        document.querySelector('.milestone-description').textContent = milestone.description;
        
        // Show notification with animation
        notification.classList.add('show');
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            this.hideMilestoneNotification();
        }, 5000);
        
        // Play discovery sound (if supported)
        this.playDiscoverySound();
    }

    hideMilestoneNotification() {
        const notification = document.getElementById('milestone-notification');
        notification.classList.remove('show');
    }

    updateNotificationBadges() {
        const evidenceBadge = document.getElementById('evidence-badge');
        const notesBadge = document.getElementById('notes-badge');
        
        // Show badge with number of new discoveries
        const newDiscoveries = this.milestonesDiscovered.length;
        
        if (newDiscoveries > 0) {
            evidenceBadge.textContent = newDiscoveries;
            evidenceBadge.style.display = 'inline-block';
            notesBadge.textContent = newDiscoveries;
            notesBadge.style.display = 'inline-block';
        }
    }

    playDiscoverySound() {
        // Create a short success tone using Web Audio API
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
            oscillator.frequency.setValueAtTime(1200, audioContext.currentTime + 0.1);
            oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.2);
            
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.3);
        } catch (error) {
            // Fallback: no sound if Web Audio API not supported
            console.log('Audio not supported');
        }
    }

    showNotes() {
        const modal = document.getElementById('notes-modal');
        
        // Clear notification badges when viewing notes  
        document.getElementById('notes-badge').style.display = 'none';
        
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
            milestonesDiscovered: this.milestonesDiscovered,
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
                if (gameState.milestonesDiscovered) {
                    this.milestonesDiscovered = gameState.milestonesDiscovered;
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
        this.milestonesDiscovered = [];
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