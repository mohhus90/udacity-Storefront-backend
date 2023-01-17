import { order, ordersTable } from '../orders';
import { user, UsersTable } from '../users';
import pool from '../../database';
import { product, productsTable } from '../products';
type orderpro = {
  id?: number;
  quantity: number;
  order_id: number;
  product_id: number;
}
const theproduct: product = {
  id: 1,
  productname: 'samsung3',
  price: 60003
};
const pt = new productsTable();
const theUser: user = {
  id: 1,
  firstname: 'mohamed1',
  lastname: 'elhussieny1',
  pass: 'pass1234'
};
const ut = new UsersTable();
const theOrder: order = {
  id: 1 as number,
  status: 'active',
  user_id: 1 as number,
};
const ot = new ordersTable();
describe('orders Model', () => {
  describe('Test methods in order model exist', () => {
    it('Test method insert order exist', async () => {
      expect(ot.insert).toBeDefined();
    });
    it('Test method index order exist', async () => {
      expect(ot.index).toBeDefined();
    });
    it('Test method show order exist', async () => {
      expect(ot.show).toBeDefined();
    });
    it('Test method delete order exist', async () => {
      expect(ot.delete).toBeDefined();
    });
    it('Test method update order exist', async () => {
      expect(ot.update).toBeDefined();
    });
    it('Test method addproduct order exist', async () => {
      expect(ot.addproduct).toBeDefined();
    });
    beforeAll(async () => {
      const newUser = (await ut.insert(theUser)) as unknown as user[];
      const newproduct = (await pt.insert(theproduct)) as unknown as product[];
      const neworder = (await ot.insert('active',1,)) as unknown as order[];
      newproduct
      
    });
    afterAll(async () => {
      const conn = await pool.connect();
      const sql =
        'DELETE FROM orders CASCADE;\nALTER SEQUENCE orders_id_seq RESTART WITH 1;DELETE FROM order_products CASCADE;\nALTER SEQUENCE order_products_id_seq RESTART WITH 1;\nDELETE FROM products CASCADE;\nALTER SEQUENCE products_id_seq RESTART WITH 1;\nDELETE FROM users CASCADE;\nALTER SEQUENCE users_id_seq RESTART WITH 1;';
      await conn.query(sql);
      conn.release;
    });
    it('Test method insert shoud crete order', async () => {
      const ceateNeworder = (await ot.insert('active',1)) as unknown as order[];
      console.log(ceateNeworder);
      expect(ceateNeworder).toEqual([
        {
          status: 'active',
          user_id:'1' as unknown as number,
          id:2
        }
      ]);
    });
    it('Test method addproduct shoud crete order', async () => {
      const ceateNeworder = (await ot.addproduct(5,1,1) as unknown as orderpro);
      console.log(ceateNeworder);
      expect(ceateNeworder.id).toEqual(1);
      expect(ceateNeworder.quantity).toEqual(5);
      expect(ceateNeworder.order_id).toEqual('1' as unknown as number);
      expect(ceateNeworder.product_id).toEqual('1' as unknown as number);
    });
    it('Test method index should get orders', async () => {
      const result = await ot.index();
      expect(result.length).toEqual(2);
    });
    it('Test method orderuser should get orders of one user', async () => {
      const result = await ot.orderuser(1);
      expect(result.length).toEqual(2);
    });
    it('Test method orderproduct should get orders of one product', async () => {
      const result = await ot.orderproduct(1);
      expect(result.length).toEqual(1);
    });
    it('Test method show should get one order by id', async () => {
      const result = (await ot.show(1)) as unknown as order;
      expect(result).toEqual({
        id: 1,
        status: 'active',
        user_id: '1' as unknown as number,
      });
    });
    it('Test method update should update order by id', async () => {
      const result = (await ot.update(1, 'complete', 1)) as unknown as order;
      expect(result.id).toBe(1);
      expect(result.status).toBe('complete');
      expect(result.user_id).toBe('1' as unknown as number,);
    });
    it('Test method delete should delete one order by id', async () => {
      const result = (await ot.delete(2)) as unknown as order;
      expect(result).toBeTruthy;
    });
  });
});
