-- Database: detective_day (created by Docker Compose)
-- This file will be automatically executed when the container starts

-- Create logs table
CREATE TABLE IF NOT EXISTS game_logs (
    id SERIAL PRIMARY KEY,
    timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    game_id VARCHAR(255) NOT NULL,
    session_id VARCHAR(255) NOT NULL,
    log_type VARCHAR(50) NOT NULL,
    data JSONB NOT NULL,
    cost JSONB,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for efficient querying
CREATE INDEX IF NOT EXISTS idx_game_logs_game_id ON game_logs(game_id);
CREATE INDEX IF NOT EXISTS idx_game_logs_session_id ON game_logs(session_id);
CREATE INDEX IF NOT EXISTS idx_game_logs_log_type ON game_logs(log_type);
CREATE INDEX IF NOT EXISTS idx_game_logs_timestamp ON game_logs(timestamp);

-- Create game_summaries table for aggregated stats
CREATE TABLE IF NOT EXISTS game_summaries (
    game_id VARCHAR(255) PRIMARY KEY,
    session_id VARCHAR(255) NOT NULL,
    case_id VARCHAR(255) NOT NULL,
    started_at TIMESTAMP NOT NULL,
    ended_at TIMESTAMP,
    total_chats INTEGER DEFAULT 0,
    total_llm_calls INTEGER DEFAULT 0,
    milestones_discovered INTEGER DEFAULT 0,
    total_cost DECIMAL(10, 6) DEFAULT 0,
    errors_count INTEGER DEFAULT 0,
    game_won BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create index for game summaries
CREATE INDEX IF NOT EXISTS idx_game_summaries_session_id ON game_summaries(session_id);
CREATE INDEX IF NOT EXISTS idx_game_summaries_case_id ON game_summaries(case_id);