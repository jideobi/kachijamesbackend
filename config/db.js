import dotenv from "dotenv";
dotenv.config(); // <- load env here first

import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // use full string
  ssl: { rejectUnauthorized: false },
});

export default pool;