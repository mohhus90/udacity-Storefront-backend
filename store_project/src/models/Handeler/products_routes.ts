import express, { Request, Response } from 'express';
import { product, productsTable } from '../products';
import author from '../middleware/auth.middleware';

const pro = new productsTable();
const insert = async (req: Request, res: Response) => {
  try {
    const result: product = {
      productname: req.body.productname,
      price: req.body.price as unknown as number
    };
    const newproduct = await pro.insert(result);
    res.json(newproduct);
  } catch (err) {
    res.json(400);
    res.json(err);
  }
};
const index = async (_req: Request, res: Response) => {
  try {
    const products = await pro.index();
    res.json(products);
  } catch (err) {
    res.json(400);
    res.json(err);
  }
};
const destroy = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as unknown as number;
    const deleted = await pro.delete(id);
    res.json(deleted);
  } catch (err) {
    res.status(400).json({ err });
    return;
  }
};
const show = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as unknown as number;
    const showed = await pro.show(id);
    res.json(showed);
  } catch (err) {
    res.status(400).json({ err });
    return;
  }
};
const up = async (req: Request, res: Response) => {
  try {
    const productname = req.body.productname;
    const price = req.body.price as unknown as number;
    const id = req.params.id as unknown as number;
    const updated = await pro.update(id, productname, price);
    res.json(updated);
  } catch (err) {
    res.status(400).json({ err });
    return;
  }
};

const productRoutes = (app: express.Application) => {
  app.post('/product', author, insert);
  app.get('/product', index);
  app.get('/product/:id', show);
  app.put('/product/:id', up);
  app.delete('/product/:id', destroy);
};

export default productRoutes;
