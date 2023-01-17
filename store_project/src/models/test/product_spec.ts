import { product, productsTable } from '../products';
import pool from '../../database';
const theproduct: product = {
  id: 1,
  productname: 'samsung',
  price: 6000
};
const pt = new productsTable();
describe('products Model', () => {
  describe('Test methods in product model exist', () => {
    it('Test method insert product exist', async () => {
      expect(pt.insert).toBeDefined();
    });
    it('Test method index product exist', async () => {
      expect(pt.index).toBeDefined();
    });
    it('Test method show product exist', async () => {
      expect(pt.show).toBeDefined();
    });
    it('Test method delete product exist', async () => {
      expect(pt.delete).toBeDefined();
    });
    it('Test method update product exist', async () => {
      expect(pt.update).toBeDefined();
    });
    beforeAll(async () => {
      const newproduct = (await pt.insert(theproduct)) as unknown as product;
    });
    afterAll(async () => {
      const conn = await pool.connect();
      const sql =
        'DELETE FROM products;\nALTER SEQUENCE products_id_seq RESTART WITH 1;';
      await conn.query(sql);
      conn.release;
    });
    it('Test method insert shoud create product', async () => {
      const theNewUser: product = {
        id: 2,
        productname: 'redme',
        price: 7000
      };
      const ceateNewUser = (await pt.insert(
        theNewUser
      )) as unknown as product[];
      expect(ceateNewUser).toEqual([
        {
          id: 2,
          productname: 'redme',
          price: 7000
        }
      ]);
    });
    it('Test method index should get products', async () => {
      const result = await pt.index();
      expect(result.length).toEqual(2);
    });
    it('Test method show should get one product by id', async () => {
      const result = (await pt.show(1)) as unknown as product;
      expect(result).toEqual({
        id: 1,
        productname: 'samsung',
        price: 6000
      });
    });
    it('Test method update should update product by id', async () => {
      const result = (await pt.update(
        1,
        'Iphone',
        20000
      )) as unknown as product;
      expect(result).toEqual({
        id: 1,
        productname: 'Iphone',
        price: 20000
      });
    });
    it('Test method delete should delete one product by id', async () => {
      const result = (await pt.delete(2)) as unknown as product;
      expect(result).toBeTruthy;
    });
  });
});
