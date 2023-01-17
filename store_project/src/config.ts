import dotenv from 'dotenv';

dotenv.config();
const {
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_DB_test,
  POSTGRES_PASSWORD,
  BCRYPT_PASSWORD,
  SALT_ROUNDS,
  TOKEN_SERCRET,
  ENV
} = process.env;

export default {
  host: POSTGRES_HOST,
  database: ENV === 'dev' ? POSTGRES_DB : POSTGRES_DB_test,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  salt: SALT_ROUNDS,
  pepper: BCRYPT_PASSWORD,
  token: TOKEN_SERCRET
};
