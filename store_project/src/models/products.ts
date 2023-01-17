import pool from '../database';
export type product = {
  id?: number;
  productname: string;
  price: number;
};

export class productsTable {
  async insert(s: product): Promise<product[]> {
    try {
      const conn = await pool.connect();
      const sql =
        'INSERT INTO products (productname,price) VALUES($1,$2) RETURNING *;';

      const result = await conn.query(sql, [s.productname, s.price]);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`cannot get product ${err}`);
    }
  }

  async index(): Promise<product[]> {
    try {
      const conn = await pool.connect();
      const sql = 'SELECT * FROM products;';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`cannot get product ${err}`);
    }
  }
  async delete(id: number): Promise<number> {
    try {
      const conn = await pool.connect();
      const sql = 'DELETE FROM products WHERE id=($1);';
      const result = await conn.query(sql, [id]);
      conn.release();
      const del = result.rowCount;
      return del;
    } catch (err) {
      throw new Error(`cannot get store ${err}`);
    }
  }
  async show(id: number): Promise<product[]> {
    try {
      const conn = await pool.connect();
      const sql = 'SELECT * FROM products WHERE id=($1);';
      const result = await conn.query(sql, [id]);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`cannot get store ${err}`);
    }
  }
  async update(
    id: number,
    productname: string,
    price: number
  ): Promise<product[]> {
    try {
      const conn = await pool.connect();
      const sql =
        'UPDATE products SET productname = ($1), price = ($2) WHERE id=($3) RETURNING *;';
      const result = await conn.query(sql, [productname, price, id]);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Failed to update product with the following error: ${err}`
      );
    }
  }
}
