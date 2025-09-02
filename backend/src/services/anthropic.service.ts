import dotenv from 'dotenv';
import loggingService from './logging.service';
dotenv.config();

interface AnthropicMessage {
  role: 'user' | 'assistant';
  content: string;
}

export class AnthropicService {
  private apiKey: string;
  private model: string;
  private apiUrl = 'https://api.anthropic.com/v1/messages';

  constructor() {
    this.apiKey = process.env.ANTHROPIC_API_KEY || '';
    this.model = process.env.ANTHROPIC_MODEL || 'claude-sonnet-4-20250514';
    if (!this.apiKey) {
      throw new Error('ANTHROPIC_API_KEY not found in environment variables');
    }
    console.log(`AnthropicService initialized with model: ${this.model}`);
  }

  async sendMessage(
    systemPrompt: string,
    messages: AnthropicMessage[],
    maxTokens: number = 1000,
    temperature: number = 0.7,
    gameId?: string,
    sessionId?: string,
    purpose?: string
  ): Promise<string> {
    try {
      const requestBody = {
        model: this.model,
        system: systemPrompt,
        messages,
        max_tokens: maxTokens,
        temperature,
      };

      // Log the request for debugging
      console.log('Anthropic request:', {
        model: requestBody.model,
        systemPromptLength: systemPrompt.length,
        messagesCount: messages.length,
        purpose
      });

      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': this.apiKey,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Anthropic API error response:', errorText);
        throw new Error(`Anthropic API error: ${response.status}`);
      }

      const data = await response.json() as any;
      const responseText = data.content[0].text;

      // Log the LLM call if gameId is provided
      if (gameId && sessionId) {
        const inputTokens = data.usage?.input_tokens;
        const outputTokens = data.usage?.output_tokens;
        
        loggingService.logLLMCall(
          gameId,
          sessionId,
          purpose || 'chat',
          requestBody.model,
          systemPrompt + '\n' + messages.map(m => `${m.role}: ${m.content}`).join('\n'),
          responseText,
          inputTokens,
          outputTokens
        );
      }

      return responseText;
    } catch (error) {
      console.error('Anthropic API error:', error);
      if (gameId && sessionId) {
        loggingService.logError(gameId, sessionId, error as Error, { purpose });
      }
      throw error;
    }
  }

  async checkConsistency(
    response: string,
    characterName: string,
    knownFacts: string[],
    lastUserMessage: string
  ): Promise<boolean> {
    const checkPrompt = `You are a strict consistency checker for a murder mystery game.

Current speaker: ${characterName}

User's question that prompted this response:
"${lastUserMessage}"

FACTS THIS CHARACTER KNOWS:
${knownFacts.join('\n')}

Response to check:
"${response}"

Check for these violations:
1. Does the response mention facts the character shouldn't know?
2. Does it invent new specific details not in the facts?
3. Does it misidentify any character roles?
4. Does it contradict any established facts?

Respond "CONSISTENT" if the response follows all rules.
Respond "INCONSISTENT" if it violates any rule above.`;

    const checkResponse = await this.sendMessage('', [
      { role: 'user', content: checkPrompt }
    ], 10, 0);

    return checkResponse.includes('CONSISTENT');
  }

  async classifyMilestone(
    response: string,
    milestoneTitle: string,
    milestoneDescription: string,
    keywords: string[],
    gameId?: string,
    sessionId?: string,
    milestoneId?: string
  ): Promise<boolean> {
    const classificationPrompt = `You are analyzing a detective game dialogue to detect if specific information was revealed.

MILESTONE TO DETECT: "${milestoneTitle}"
DESCRIPTION: ${milestoneDescription}
KEYWORDS: ${keywords.join(', ')}

DIALOGUE RESPONSE TO ANALYZE:
"${response}"

INSTRUCTIONS:
- Respond "YES" if the dialogue clearly reveals or confirms this specific information
- Respond "NO" if the information is not mentioned or only vaguely hinted at
- Be precise - only detect clear revelations of this exact information

RESPONSE:`;

    const result = await this.sendMessage('', [
      { role: 'user', content: classificationPrompt }
    ], 50, 0, gameId, sessionId, `milestone_classification_${milestoneTitle}`);

    const discovered = result.trim().toUpperCase() === 'YES';
    
    // Log milestone check
    if (gameId && sessionId && milestoneId) {
      loggingService.logMilestoneCheck(
        gameId,
        sessionId,
        milestoneId,
        milestoneTitle,
        response,
        discovered,
        result
      );
    }

    console.log(`[MILESTONE CHECK] "${milestoneTitle}" - Result: ${result.trim()} - Discovered: ${discovered}`);
    
    return discovered;
  }

  async classifyMilestonesBatch(
    response: string,
    milestones: Array<{
      id: string;
      title: string;
      description: string;
      keywords: string[];
    }>,
    gameId?: string,
    sessionId?: string
  ): Promise<boolean[]> {
    const milestonesJson = JSON.stringify(
      milestones.map(m => ({
        id: m.id,
        title: m.title,
        description: m.description,
        keywords: m.keywords
      })),
      null,
      2
    );

    const classificationPrompt = `You are analyzing a detective game dialogue to detect which specific information was revealed.

DIALOGUE RESPONSE TO ANALYZE:
"${response}"

MILESTONES TO CHECK:
${milestonesJson}

INSTRUCTIONS:
- For each milestone, determine if the dialogue clearly reveals or confirms that specific information
- Return a JSON array of boolean values in the same order as the milestones
- true if the milestone information was clearly revealed
- false if the information is not mentioned or only vaguely hinted at
- Be precise - only detect clear revelations of the exact information described

Return ONLY a JSON array of boolean values, e.g.: [true, false, false, true, false]

RESPONSE:`;

    try {
      const result = await this.sendMessage('', [
        { role: 'user', content: classificationPrompt }
      ], 200, 0, gameId, sessionId, 'batch_milestone_classification');

      // Parse the JSON response
      const discoveries = JSON.parse(result.trim());
      
      if (!Array.isArray(discoveries) || discoveries.length !== milestones.length) {
        console.error('[MILESTONE BATCH] Invalid response format:', result);
        // Fallback to all false if parsing fails
        return new Array(milestones.length).fill(false);
      }

      // Log each milestone check
      if (gameId && sessionId) {
        milestones.forEach((milestone, index) => {
          loggingService.logMilestoneCheck(
            gameId,
            sessionId,
            milestone.id,
            milestone.title,
            response,
            discoveries[index],
            discoveries[index] ? 'YES' : 'NO'
          );
        });
      }

      console.log(`[MILESTONE BATCH] Checked ${milestones.length} milestones, found ${discoveries.filter(d => d).length} discoveries`);
      
      return discoveries;
    } catch (error) {
      console.error('[MILESTONE BATCH] Error parsing response:', error);
      // Fallback to all false if there's an error
      return new Array(milestones.length).fill(false);
    }
  }
}

export default new AnthropicService();