import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const defaultConnection = 'postgresql://detective_user:detective_pass_2024@localhost:5434/detective_day';
const connectionString = process.env.DATABASE_URL || defaultConnection;

// Enable SSL when using managed Postgres (e.g., Neon)
const useSSL = (process.env.DATABASE_SSL || '').toLowerCase() === 'true' || /\.neon\.(tech|one)/.test(connectionString);

// Create a connection pool
const pool = new Pool({
  connectionString,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
  ssl: useSSL ? { rejectUnauthorized: false } : undefined,
});

// Test database connection
pool.on('connect', () => {
  console.log('📊 Connected to PostgreSQL database');
});

pool.on('error', (err) => {
  console.error('❌ Unexpected error on idle database client', err);
});

export default pool;
