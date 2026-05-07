-- Initial schema for OSPP
-- Run automatically by Docker entrypoint

CREATE TYPE proposition_status AS ENUM ('draft', 'discussion', 'vote', 'adopte', 'rejete');
CREATE TYPE simulation_status AS ENUM ('pending', 'running', 'completed', 'failed');

CREATE TABLE IF NOT EXISTS propositions (
    id VARCHAR(25) PRIMARY KEY,
    country VARCHAR(10) NOT NULL DEFAULT 'global',
    domain VARCHAR(50) NOT NULL,
    language VARCHAR(10) NOT NULL DEFAULT 'en',
    title VARCHAR(255) NOT NULL,
    summary TEXT,
    content TEXT,
    status proposition_status DEFAULT 'draft',
    author VARCHAR(100),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_propositions_country ON propositions(country);
CREATE INDEX idx_propositions_domain ON propositions(domain);
CREATE INDEX idx_propositions_status ON propositions(status);

CREATE TABLE IF NOT EXISTS proposition_votes (
    id SERIAL PRIMARY KEY,
    proposition_id VARCHAR(20) REFERENCES propositions(id),
    user_id VARCHAR(100) NOT NULL,
    support SMALLINT NOT NULL CHECK (support IN (1, -1)),
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS proposition_history (
    id SERIAL PRIMARY KEY,
    proposition_id VARCHAR(20) REFERENCES propositions(id),
    version INTEGER NOT NULL,
    content TEXT,
    changed_by VARCHAR(100),
    changed_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS simulations (
    id UUID PRIMARY KEY,
    proposition_id VARCHAR(20) REFERENCES propositions(id),
    status simulation_status DEFAULT 'pending',
    n_agents INTEGER DEFAULT 10000,
    n_steps INTEGER DEFAULT 10,
    results JSONB,
    created_at TIMESTAMP DEFAULT NOW(),
    completed_at TIMESTAMP
);

CREATE INDEX idx_simulations_status ON simulations(status);

CREATE TABLE IF NOT EXISTS simulation_agents (
    id SERIAL PRIMARY KEY,
    simulation_id UUID REFERENCES simulations(id),
    age INTEGER,
    region VARCHAR(50),
    csp VARCHAR(50),
    education VARCHAR(50),
    political_position FLOAT,
    vote SMALLINT
);
