import { Pool } from 'pg';
import config from '../config';
const pool: Pool = new Pool({
  host: config.host,
  database: config.database,
  user: config.user,
  password: config.password
});
pool.on('error', (err: Error) => {
  console.error(err.message);
});

export default pool;
