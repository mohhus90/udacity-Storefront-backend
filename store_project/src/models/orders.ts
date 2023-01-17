import pool from '../database';
export type order = {
  id?: number;
  status?: string;
  user_id: number;
};

export class ordersTable {
  async insert(status: string,user_id: number): Promise<order[]> {
    try {
      const conn = await pool.connect();
      const sql =
        'INSERT INTO orders (status,user_id) VALUES($1,$2) RETURNING *;';

      const result = await conn.query(sql, [status,user_id,]);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`cannot create order ${err}`);
    }
  }
  async addproduct(quantity: number,order_id:number,product_id:number): Promise<order> {
    try {
      const conn = await pool.connect();
      const sql =
        'INSERT INTO order_products (quantity,order_id,product_id) VALUES($1,$2,$3) RETURNING *;';

      const result = await conn.query(sql, [
        quantity,
        order_id,
        product_id
      ]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`cannot add product to order ${err}`);
    }
  }

  async index(): Promise<order[]> {
    try {
      const conn = await pool.connect();
      const sql = 'SELECT * FROM orders;';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`cannot get order ${err}`);
    }
  }
  async delete(id: number): Promise<number> {
    try {
      const conn = await pool.connect();
      const sql = 'DELETE FROM orders WHERE id=($1);';
      const result = await conn.query(sql, [id]);
      conn.release();
      const del = result.rowCount;
      return del;
    } catch (err) {
      throw new Error(`cannot delete order ${err}`);
    }
  }
  async show(id: number): Promise<order[]> {
    try {
      const conn = await pool.connect();
      const sql = 'SELECT * FROM orders WHERE id=($1);';
      const result = await conn.query(sql, [id]);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`cannot get order ${err}`);
    }
  }
  async orderuser(user_id: number): Promise<order[]> {
    try {
      const conn = await pool.connect();
      const sql =
        'SELECT * FROM users INNER JOIN orders ON users.id = $1;';
      const result = await conn.query(sql, [user_id]);
      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`cannot get orders ${err}`);
    }
  }
  async orderproduct(product_id: number): Promise<order[]> {
    try {
      const conn = await pool.connect();
      const sql =
        'SELECT * FROM products INNER JOIN order_products ON products.id = $1;';
      const result = await conn.query(sql, [product_id]);
      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`cannot get orders ${err}`);
    }
  }
  async update(
    id: number,
    status: string,
    user_id: number,
  ): Promise<order[]> {
    try {
      const conn = await pool.connect();
      const sql =
        'UPDATE orders SET status = ($1), user_id = ($2) WHERE id=($3) RETURNING *;';
      const result = await conn.query(sql, [
        status,
        user_id,
        id
      ]);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Failed to update order with the following error: ${err}`
      );
    }
  }
}
