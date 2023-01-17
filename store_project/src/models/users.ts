import pool from '../database';
import bcrypt from 'bcrypt';
import config from '../config';
export type user = {
  id?: number;
  firstname: string;
  lastname: string;
  pass?: string;
};
const pepper = config.pepper;
const hash = (pass: string) => {
  const salt = config.salt;
  return bcrypt.hashSync(pass + pepper, parseInt(salt as string, 10));
};
export class UsersTable {
  async insert(s: user): Promise<user[]> {
    try {
      const conn = await pool.connect();
      const sql =
        'INSERT INTO users (firstName,lastName,pass) VALUES($1,$2,$3) RETURNING *;';

      const result = await conn.query(sql, [
        s.firstname,
        s.lastname,
        hash(s.pass as string)
      ]);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`cannot get user ${err}`);
    }
  }

  async index(): Promise<user[]> {
    try {
      const conn = await pool.connect();
      const sql = 'SELECT * FROM users;';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`cannot get user ${err}`);
    }
  }
  async delete(id: number): Promise<number> {
    try {
      const conn = await pool.connect();
      const sql = 'DELETE FROM users WHERE id=($1);';
      const result = await conn.query(sql, [id]);
      conn.release();
      const del = result.rowCount;
      return del;
    } catch (err) {
      throw new Error(`cannot get user ${err}`);
    }
  }
  async show(id: number): Promise<user[]> {
    try {
      const conn = await pool.connect();
      const sql = 'SELECT * FROM users WHERE id=($1);';
      const result = await conn.query(sql, [id]);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`cannot get user ${err}`);
    }
  }
  async update(
    id: number,
    firstname: string,
    lastname: string
  ): Promise<user[]> {
    try {
      const conn = await pool.connect();
      const sql =
        'UPDATE users SET firstName = ($1), lastName = ($2) WHERE id=($3) RETURNING *;';
      const result = await conn.query(sql, [firstname, lastname, id]);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Failed to update user with the following error: ${err}`);
    }
  }

  async authnticate(firstname: string, pass: string): Promise<user | null> {
    const conn = await pool.connect();
    const sql = 'SELECT pass FROM users WHERE firstname=($1);';
    const result = await conn.query(sql, [firstname]);
    // console.log(pass+pepper);
    if (result.rows.length) {
      const { pass: hash } = result.rows[0];
      // console.log(hash);
      if (bcrypt.compareSync(pass + pepper, hash)) {
        return result.rows[0];
      }
    }
    conn.release();
    return null;
  }
}
