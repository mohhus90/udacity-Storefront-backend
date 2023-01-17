import { user, UsersTable } from '../users';
import pool from '../../database';
const theUser: user = {
  id: 1,
  firstname: 'mohamed1',
  lastname: 'elhussieny1',
  pass: 'pass1234'
};
const ut = new UsersTable();
let authuser: user | null;
describe('users Model', () => {
  describe('Test methods exist', () => {
    it('Test method insert exist', async () => {
      expect(ut.insert).toBeDefined();
    });
    it('Test method index exist', async () => {
      expect(ut.index).toBeDefined();
    });
    it('Test method show exist', async () => {
      expect(ut.show).toBeDefined();
    });
    it('Test method delete exist', async () => {
      expect(ut.delete).toBeDefined();
    });
    it('Test method update exist', async () => {
      expect(ut.update).toBeDefined();
    });
    beforeAll(async () => {
      // jasmine.DEFAULT_TIMEOUT_INTERVAL = 99999;
       (await ut.insert(theUser)) as unknown as user[];
      authuser = await ut.authnticate(
        theUser.firstname,
        theUser.pass as string
      );
    });
    afterAll(async () => {
      const conn = await pool.connect();
      const sql =
        'DELETE FROM users;\nALTER SEQUENCE users_id_seq RESTART WITH 1;';
      await conn.query(sql);
      conn.release;
    });
    it('Test method insert shoud create users', async () => {
      const theNewUser: user = {
        firstname: 'Ahmed',
        lastname: 'Elhussieny',
        pass: 'pass1234'
      };
      const ceateNewUser = (await ut.insert({
        firstname: 'Ahmed',
        lastname: 'Elhussieny',
        pass: 'pass1234'
      })) as unknown as user[];
      const authuser = await ut.authnticate(
        theNewUser.firstname,
        theNewUser.pass as string
      );
      expect(ceateNewUser).toEqual([
        {
          firstname: 'Ahmed',
          lastname: 'Elhussieny',
          pass: authuser?.pass as string,
          id: 2
        }
      ]);
    });
    it('Test method index should getusers', async () => {
      const result = await ut.index();
      expect(result.length).toEqual(2);
    });
    it('Test method show should get one user by id', async () => {
      const result = (await ut.show(1)) as unknown as user;
      expect(result).toEqual({
        firstname: 'mohamed1',
        lastname: 'elhussieny1',
        pass: authuser?.pass as string,
        id: 1
      });
    });
    it('Test method update should update user by id', async () => {
      const result = (await ut.update(
        1,
        'hussieny',
        'test'
      )) as unknown as user;
      expect(result).toEqual({
        firstname: 'hussieny',
        lastname: 'test',
        pass: authuser?.pass as string,
        id: 1
      });
    });
    it('Test method delete should delete one user by id', async () => {
      const result = (await ut.delete(2)) as unknown as user;
      expect(result).toBeTruthy;
    });
  });
});
