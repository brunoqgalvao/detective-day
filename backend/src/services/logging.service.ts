import pool from '../db/database';

interface LogEntry {
  timestamp: Date;
  gameId: string;
  sessionId: string;
  type: 'chat' | 'milestone' | 'evidence' | 'llm_call' | 'classification' | 'error';
  data: any;
  cost?: {
    model: string;
    inputTokens?: number;
    outputTokens?: number;
    totalCost?: number;
  };
}

class LoggingService {
  private currentGameLogs: Map<string, LogEntry[]> = new Map();
  private dbConnected: boolean = false;

  constructor() {
    this.checkDatabaseConnection();
  }

  private async checkDatabaseConnection() {
    try {
      await pool.query('SELECT NOW()');
      this.dbConnected = true;
      console.log('📊 Logging service connected to PostgreSQL');
    } catch (error) {
      this.dbConnected = false;
      console.warn('⚠️  Database not available, logging to memory only');
    }
  }

  async logGameStart(gameId: string, sessionId: string, caseId: string) {
    const entry: LogEntry = {
      timestamp: new Date(),
      gameId,
      sessionId,
      type: 'chat',
      data: {
        event: 'game_started',
        caseId,
        message: `New game started - Case: ${caseId}`
      }
    };
    
    await this.writeLog(gameId, sessionId, entry);
    console.log(`[GAME START] Game ID: ${gameId}, Session: ${sessionId}, Case: ${caseId}`);
    
    // Create or update game summary
    if (this.dbConnected) {
      try {
        await pool.query(
          `INSERT INTO game_summaries (game_id, session_id, case_id, started_at) 
           VALUES ($1, $2, $3, $4) 
           ON CONFLICT (game_id) DO UPDATE 
           SET started_at = EXCLUDED.started_at`,
          [gameId, sessionId, caseId, new Date()]
        );
      } catch (error) {
        console.error('Failed to create game summary:', error);
      }
    }
  }

  async logChat(gameId: string, sessionId: string, characterId: string, userMessage: string, aiResponse: string) {
    const entry: LogEntry = {
      timestamp: new Date(),
      gameId,
      sessionId,
      type: 'chat',
      data: {
        characterId,
        userMessage,
        aiResponse: aiResponse.substring(0, 500) + (aiResponse.length > 500 ? '...' : '')
      }
    };
    
    await this.writeLog(gameId, sessionId, entry);
    console.log(`[CHAT] Game: ${gameId}, Character: ${characterId}, User: "${userMessage.substring(0, 50)}..."`);
    
    // Update chat count in summary
    if (this.dbConnected) {
      try {
        await pool.query(
          `UPDATE game_summaries 
           SET total_chats = total_chats + 1, updated_at = NOW() 
           WHERE game_id = $1`,
          [gameId]
        );
      } catch (error) {
        console.error('Failed to update chat count:', error);
      }
    }
  }

  async logLLMCall(
    gameId: string, 
    sessionId: string, 
    purpose: string, 
    model: string, 
    prompt: string, 
    response: string,
    inputTokens?: number,
    outputTokens?: number
  ) {
    const costEstimate = this.estimateCost(model, inputTokens, outputTokens);
    
    const entry: LogEntry = {
      timestamp: new Date(),
      gameId,
      sessionId,
      type: 'llm_call',
      data: {
        purpose,
        model,
        promptLength: prompt.length,
        responseLength: response.length,
        promptPreview: prompt.substring(0, 200) + '...',
        responsePreview: response.substring(0, 200) + '...'
      },
      cost: {
        model,
        inputTokens,
        outputTokens,
        totalCost: costEstimate
      }
    };
    
    await this.writeLog(gameId, sessionId, entry);
    console.log(`[LLM] Game: ${gameId}, Purpose: ${purpose}, Model: ${model}, Cost: $${costEstimate?.toFixed(4) || 'N/A'}`);
    
    // Update LLM call count and cost in summary
    if (this.dbConnected && costEstimate) {
      try {
        await pool.query(
          `UPDATE game_summaries 
           SET total_llm_calls = total_llm_calls + 1, 
               total_cost = total_cost + $2,
               updated_at = NOW() 
           WHERE game_id = $1`,
          [gameId, costEstimate]
        );
      } catch (error) {
        console.error('Failed to update LLM stats:', error);
      }
    }
  }

  async logMilestoneCheck(
    gameId: string,
    sessionId: string,
    milestoneId: string,
    milestoneTitle: string,
    response: string,
    discovered: boolean,
    classificationResponse?: string
  ) {
    const entry: LogEntry = {
      timestamp: new Date(),
      gameId,
      sessionId,
      type: 'milestone',
      data: {
        milestoneId,
        milestoneTitle,
        responseAnalyzed: response.substring(0, 300),
        discovered,
        classificationResponse,
        reason: discovered ? 'Milestone keywords detected' : 'Keywords not found'
      }
    };
    
    await this.writeLog(gameId, sessionId, entry);
    console.log(`[MILESTONE] Game: ${gameId}, Milestone: ${milestoneTitle}, Discovered: ${discovered}`);
    
    // Update milestone count in summary if discovered
    if (this.dbConnected && discovered) {
      try {
        await pool.query(
          `UPDATE game_summaries 
           SET milestones_discovered = milestones_discovered + 1,
               updated_at = NOW() 
           WHERE game_id = $1`,
          [gameId]
        );
      } catch (error) {
        console.error('Failed to update milestone count:', error);
      }
    }
  }

  async logClassification(
    gameId: string,
    sessionId: string,
    type: 'milestone' | 'evidence' | 'confession',
    input: string,
    result: boolean,
    details?: any
  ) {
    const entry: LogEntry = {
      timestamp: new Date(),
      gameId,
      sessionId,
      type: 'classification',
      data: {
        classificationType: type,
        inputAnalyzed: input.substring(0, 200),
        result,
        details
      }
    };
    
    await this.writeLog(gameId, sessionId, entry);
    console.log(`[CLASSIFY] Game: ${gameId}, Type: ${type}, Result: ${result}`);
  }

  async logError(gameId: string, sessionId: string, error: Error, context?: any) {
    const entry: LogEntry = {
      timestamp: new Date(),
      gameId,
      sessionId,
      type: 'error',
      data: {
        error: error.message,
        stack: error.stack,
        context
      }
    };
    
    await this.writeLog(gameId, sessionId, entry);
    console.error(`[ERROR] Game: ${gameId}, Error: ${error.message}`, context);
    
    // Update error count in summary
    if (this.dbConnected) {
      try {
        await pool.query(
          `UPDATE game_summaries 
           SET errors_count = errors_count + 1,
               updated_at = NOW() 
           WHERE game_id = $1`,
          [gameId]
        );
      } catch (error) {
        console.error('Failed to update error count:', error);
      }
    }
  }

  private estimateCost(model: string, inputTokens?: number, outputTokens?: number): number | undefined {
    if (!inputTokens || !outputTokens) return undefined;

    // Updated pricing per 1M tokens (as of 2025)
    const pricing: Record<string, { input: number; output: number }> = {
      // Claude 4 Models (Latest - May 2025)
      'claude-opus-4-20250514': { input: 15, output: 75 },
      'claude-opus-4-1-20250805': { input: 15, output: 75 },
      'claude-sonnet-4-20250514': { input: 3, output: 15 },
      
      // Claude 3.5 Models
      'claude-3.5-haiku-20241022': { input: 0.8, output: 4 },
      'claude-3.5-sonnet-20241022': { input: 3, output: 15 },
      'claude-3.5-sonnet-20240620': { input: 3, output: 15 },
      
      // Claude 3 Models (Legacy)
      'claude-3-opus-20240229': { input: 15, output: 75 },
      'claude-3-sonnet-20240229': { input: 3, output: 15 },
      'claude-3-haiku-20240307': { input: 0.25, output: 1.25 },
      
      // Simplified model names (for backward compatibility)
      'claude-4-opus': { input: 15, output: 75 },
      'claude-4-sonnet': { input: 3, output: 15 },
      'claude-3.5-haiku': { input: 0.8, output: 4 },
      'claude-3.5-sonnet': { input: 3, output: 15 },
      'claude-3-opus': { input: 15, output: 75 },
      'claude-3-sonnet': { input: 3, output: 15 },
      'claude-3-haiku': { input: 0.25, output: 1.25 },
      
      // GPT Models (for comparison)
      'gpt-4': { input: 30, output: 60 },
      'gpt-3.5-turbo': { input: 0.5, output: 1.5 }
    };

    const modelPricing = pricing[model] || pricing['claude-3.5-haiku'];
    // Convert from per 1M tokens to actual cost
    const inputCost = (inputTokens / 1000000) * modelPricing.input;
    const outputCost = (outputTokens / 1000000) * modelPricing.output;
    
    return inputCost + outputCost;
  }

  private async writeLog(gameId: string, sessionId: string, entry: LogEntry) {
    // Store in memory
    if (!this.currentGameLogs.has(gameId)) {
      this.currentGameLogs.set(gameId, []);
    }
    this.currentGameLogs.get(gameId)!.push(entry);

    // Write to database if connected
    if (this.dbConnected) {
      try {
        await pool.query(
          `INSERT INTO game_logs (timestamp, game_id, session_id, log_type, data, cost) 
           VALUES ($1, $2, $3, $4, $5, $6)`,
          [entry.timestamp, gameId, sessionId, entry.type, JSON.stringify(entry.data), entry.cost ? JSON.stringify(entry.cost) : null]
        );
      } catch (error) {
        console.error('Failed to write log to database:', error);
      }
    }
  }

  async getGameLogs(gameId: string): Promise<LogEntry[]> {
    // Try to get from database first
    if (this.dbConnected) {
      try {
        const result = await pool.query(
          'SELECT * FROM game_logs WHERE game_id = $1 ORDER BY timestamp ASC',
          [gameId]
        );
        
        return result.rows.map(row => ({
          timestamp: row.timestamp,
          gameId: row.game_id,
          sessionId: row.session_id,
          type: row.log_type,
          data: row.data,
          cost: row.cost
        }));
      } catch (error) {
        console.error('Failed to get logs from database:', error);
      }
    }
    
    // Fallback to memory
    return this.currentGameLogs.get(gameId) || [];
  }

  async generateGameSummary(gameId: string): Promise<any> {
    // Try to get from database first
    if (this.dbConnected) {
      try {
        const result = await pool.query(
          'SELECT * FROM game_summaries WHERE game_id = $1',
          [gameId]
        );
        
        if (result.rows.length > 0) {
          const summary = result.rows[0];
          console.log(`[SUMMARY] Game ${gameId}:`, {
            totalChats: summary.total_chats,
            totalLLMCalls: summary.total_llm_calls,
            milestonesDiscovered: summary.milestones_discovered,
            totalCost: parseFloat(summary.total_cost),
            errors: summary.errors_count
          });
          return summary;
        }
      } catch (error) {
        console.error('Failed to get summary from database:', error);
      }
    }
    
    // Fallback to calculating from memory logs
    const logs = await this.getGameLogs(gameId);
    
    const summary = {
      gameId,
      totalChats: logs.filter(l => l.type === 'chat').length,
      totalLLMCalls: logs.filter(l => l.type === 'llm_call').length,
      milestonesDiscovered: logs.filter(l => l.type === 'milestone' && l.data.discovered).length,
      totalCost: logs.reduce((sum, l) => sum + (l.cost?.totalCost || 0), 0),
      errors: logs.filter(l => l.type === 'error').length,
      duration: logs.length > 0 ? 
        new Date(logs[logs.length - 1].timestamp).getTime() - new Date(logs[0].timestamp).getTime() : 0
    };

    console.log(`[SUMMARY] Game ${gameId}:`, summary);
    return summary;
  }
}

export default new LoggingService();