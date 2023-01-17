import { user, UsersTable } from '../users';
import pool from '../../database';
import supertest from 'supertest';
import app from '../../server';
const request = supertest(app);
const theUser: user = {
  id: 1,
  firstname: 'mohamed1',
  lastname: 'elhussieny1',
  pass: 'pass123'
};
const ut = new UsersTable();
let authuser: user | null;
let toke='';
const secrettoken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjpbeyJmaXJzdG5hbWUiOm51bGwsImxhc3RuYW1lIjpudWxsLCJwYXNzIjoiJDJiJDEwJHA5YXRQSmNWSU9YaExiMDFUdkZIZnVYVWIuNUU3bGU3cU52S3hhTVZYcXZiUmVlOGpVTHB1IiwiaWQiOjJ9XSwiaWF0IjoxNjczNTQzNzk0fQ.U7CtNVUjqmVWcGK5l271g4Fidhrzid3Z-zChezKQwgY';
describe('users Routes Model', () => {
  beforeAll(async () => {
    // jasmine.DEFAULT_TIMEOUT_INTERVAL = 999999;
    const newUser = (await ut.insert(theUser)) as unknown as user;
    console.log(`this new user : ${newUser.firstname}`);
    authuser = await ut.authnticate(theUser.firstname, theUser.pass as string);
    spyOn(ut, 'index').and.returnValue(
      Promise.resolve([
        {
          id: 1,
          firstname: 'mohamed1',
          lastname: 'elhussieny1',
          pass: 'pass1234'
        }
      ])
    );
    spyOn(ut, 'insert').and.returnValue(
      Promise.resolve([
        {
          d: 2,
          firstname: 'mohamed2',
          lastname: 'elhussieny2',
          pass: 'pass1234'
        }
      ])
    );
    spyOn(ut, 'delete').and.returnValue(Promise.resolve(1));
  });
  afterAll(async () => {
    const conn = await pool.connect();
    const sql =
      'DELETE FROM users;\nALTER SEQUENCE users_id_seq RESTART WITH 1;';
    await conn.query(sql);
    conn.release;
  });
  describe('Test users Route', () => {
    it('Test api it shoud get all users', async () => {
      const res = await request.get('/user').set('Authorization', 'Bearer ' + secrettoken);
      expect(res.status).toBe(200);
      expect(res.body).toEqual([
        {
          id: 1,
          firstname: 'mohamed1',
          lastname: 'elhussieny1',
          pass: authuser?.pass as string
        }
      ]);
    });
    it('Test api it shoud create user', async () => {
      const res = await request.post('/user').send({
        d: 2,
        firstname: 'mohamed2',
        lastname: 'elhussieny2',
        pass: 'pass1234'
      })
      expect(res.status).toBe(200);
      const usertoken=res.body;
      toke=usertoken;
      // console.log('token'+toke);
      
    });
    it('Test api it shoud delete user', async () => {
      const res = await request
        .delete('/user/2')
        .set('Authorization', 'Bearer ' + toke);
      expect(res.status).toBe(200);
    });
  });
});
