import { product, productsTable } from '../products';
import { user, UsersTable } from '../users';
import pool from '../../database';
import supertest from 'supertest';
import app from '../../server';
const request = supertest(app);
const theUser: user = {
  id: 1,
  firstname: 'test1',
  lastname: 'test2',
  pass: 'pass123'
};
const ut = new UsersTable();
let authuser: user | null;
const theproduct: product = {
  id: 1,
  productname: 'samsung',
  price: 6000
};
let toke='';
const pt = new productsTable();
const secrettoken =
'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjpbeyJmaXJzdG5hbWUiOiJ0ZXN0MSIsImxhc3RuYW1lIjoidGVzdDIiLCJwYXNzIjoiJDJiJDEwJEJEZEFOUkdrVE9BUzhGSUhid0NqN2VhZFFuVkljS3ozcVFDNlBLZkNwUnZGaldlOUZSb0VlIiwiaWQiOjN9XSwiaWF0IjoxNjczNzQ0Njk0fQ.V_1vx3mbWjnTsiZ-vdGmxo7KujF3wVjEi9nds0_9Qm0';
describe('product Routes Model', () => {
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
    
    // const newUser = (await ut.insert(theUser)) as unknown as user[];
    const newproduct = (await pt.insert(theproduct)) as unknown as product[];
    // newUser
    newproduct
    authuser = await ut.authnticate(theUser.firstname, theUser.pass as string);
    spyOn(pt, 'insert').and.returnValue(
      Promise.resolve([
        {
          id: 2,
          productname: 'samsung2',
          price: 7000
        }
      ])
    );
    spyOn(pt, 'index').and.returnValue(
      Promise.resolve([
        {
          id: 1,
          productname: 'samsung',
          price: 6000
        }
      ])
    );
    spyOn(pt, 'delete').and.returnValue(Promise.resolve(1));
  });
  afterAll(async () => {
    const conn = await pool.connect();
    const sql =
      'DELETE FROM users;\nALTER SEQUENCE users_id_seq RESTART WITH 1;\nDELETE FROM products;\nALTER SEQUENCE products_id_seq RESTART WITH 1;';
    await conn.query(sql);
    conn.release;
  });
  describe('Test products Route', () => {
    it('Test api it shoud get all products', async () => {
      const res = await request.get('/product');
      expect(res.status).toBe(200);
      expect(res.body).toEqual([
        {
          id: 1,
          productname: 'samsung',
          price: 6000
        }
      ]);
    });
    it('Test api it shoud create products', async () => {
      const res = await request
        .post('/product').set('Authorization', 'Bearer ' + toke).send({
          id: 2,
          productname: 'samsung2',
          price: 7000
        });
      expect(res.status).toBe(200);
    });
    it('Test api it shoud delete product', async () => {
      const res = await request.delete('/product/2');
      expect(res.status).toBe(200);
    });
  });
});
