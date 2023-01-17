import { user, UsersTable } from '../users';
import pool from '../../database';
const ut = new UsersTable();

describe('users Model', () => {
  it('Test authontication method exist', async () => {
    expect(ut.authnticate).toBeDefined();
  });
});
describe('Test authontication logic', () => {
  const theUser = {
    firstname: 'test1' as string,
    lastname: 'test2',
    pass: 'pass1233' as string
  } as user;
  beforeAll(async () => {
    // const newUser = (await ut.insert(theUser)) as unknown as user;
    // theUser.id = newUser.id;
    // console.log(theUser.id);
    
  });
  afterAll(async () => {
    const conn = await pool.connect();
    const sql =
      'DELETE FROM users;\nALTER SEQUENCE users_id_seq RESTART WITH 1;';
    await conn.query(sql);
    conn.release;
  });
  it('authontication method should return authenticated user', async () => {
    const authuser = await ut.authnticate(
      theUser.firstname,
      theUser.pass as string
    );
    expect(authuser?.pass).toBeTrue;
  });
  it('authontication method should return null for wrong user', async () => {
    const authuser = await ut.authnticate('wrong name', 'wrong pass');
    expect(authuser).toBe(null);
  });
});
