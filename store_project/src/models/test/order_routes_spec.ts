import { user, UsersTable } from '../users';
import { product, productsTable } from '../products';
import { order, ordersTable } from '../orders';
import pool from '../../database';
import supertest from 'supertest';
import app from '../../server';
const request = supertest(app);
const theUser: user = {
  id: 1,
  firstname: 'mohamed1',
  lastname: 'elhussieny1',
  pass: 'pass1234'
};
const ut = new UsersTable();
let authuser: user | null;
const theproduct: product = {
  id: 1,
  productname: 'samsung',
  price: 6000
};
const theOrder: order = {
  id: 1,
  status: 'active',
  user_id: 1,
};
const ot = new ordersTable();
const pt = new productsTable();
let toke='';
const secrettoken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjpbeyJmaXJzdG5hbWUiOm51bGwsImxhc3RuYW1lIjpudWxsLCJwYXNzIjoiJDJiJDEwJHA5YXRQSmNWSU9YaExiMDFUdkZIZnVYVWIuNUU3bGU3cU52S3hhTVZYcXZiUmVlOGpVTHB1IiwiaWQiOjJ9XSwiaWF0IjoxNjczNTQzNzk0fQ.U7CtNVUjqmVWcGK5l271g4Fidhrzid3Z-zChezKQwgY';
describe('orders Routes Model', () => {
  beforeAll(async () => {
    const res = await request.post('/user').send({
      d: 2,
      firstname: 'mohamed2',
      lastname: 'elhussieny2',
      pass: 'pass1234'
    })
    expect(res.status).toBe(200);
    const usertoken=res.body;
    toke=usertoken;
    // const newuser =(await ut.insert(theUser)) as unknown as user[];
    const newproduct =(await pt.insert(theproduct)) as unknown as product[];
    const newuorder =(await ot.insert('active',1)) as unknown as order[];
    
    newproduct
    newuorder
   
    console.log(newproduct);
    console.log();
    
    authuser = await ut.authnticate(theUser.firstname, theUser.pass as string);
    spyOn(ot, 'index').and.returnValue(
      Promise.resolve([
        {
          id: 1,
          status: 'active',
          user_id: 1,
        }
      ])
    );
    spyOn(ot, 'insert').and.returnValue(
      Promise.resolve([
        {
          user_id: 1,
        }
      ])
    );
    spyOn(ot, 'delete').and.returnValue(Promise.resolve(1));
  });
  afterAll(async () => {
    const conn = await pool.connect();
    const sql =
      'DELETE FROM orders;\nALTER SEQUENCE orders_id_seq RESTART WITH 1;\nDELETE FROM products;\nALTER SEQUENCE products_id_seq RESTART WITH 1;\nDELETE FROM users;\nALTER SEQUENCE users_id_seq RESTART WITH 1;\nDELETE FROM order_products;\nALTER SEQUENCE order_products_id_seq RESTART WITH 1;';
    await conn.query(sql);
    conn.release;
  });
  describe('Test orders Route', () => {
    console.log(authuser?.pass as string);

    it('Test api it shoud get all orders', async () => {
      const res = await request.get('/order');
      expect(res.status).toBe(200);
    });
    it('Test api it shoud create order', async () => {
      const res = await request
        .post('/order')
        .set('Authorization', 'Bearer ' + toke);
      expect(res.status).toBe(200);
    });
    it('Test api it shoud delete order', async () => {
      const res = await request
        .delete('/order/2')
        .set('Authorization', 'Bearer ' + toke);
      expect(res.status).toBe(200);
    });
  });
});
