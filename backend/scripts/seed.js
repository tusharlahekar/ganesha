require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

const runSql = async (fileName) => {
  const sql = fs.readFileSync(path.join(__dirname, '..', 'db', fileName), 'utf-8');
  await pool.query(sql);
};

const seed = async () => {
  try {
    await runSql('schema.sql');
    await runSql('seed.sql');
    console.log('Database seeded.');
  } catch (error) {
    console.error('Seed failed', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
};

seed();
