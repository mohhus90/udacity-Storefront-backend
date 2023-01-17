import express, { Request, Response } from 'express';
import { ordersTable } from '../orders';
import author from '../middleware/auth.middleware';


const pro = new ordersTable();
const insert = async (req: Request, res: Response) => {
  try {
     
    const status = 'active' ;
    const user_id = req.body.user_id as unknown as number;
    
    const neworder = await pro.insert(status,user_id);
    res.json(neworder);
  } catch (err) {
    res.json(400);
    res.json(err);
  }
};
const addproduct = async (req: Request, res: Response) => {
  try {
    
      const quantity= req.body.quantity as unknown as number;
      const order_id = req.params.order_id as unknown as number;
      const product_id = req.body.product_id as unknown as number;
  
    const addpro = await pro.addproduct(quantity,order_id,product_id) ;
    res.json(addpro);
  } catch (err) {
    res.json(400);
    res.json(err);
  }
};
const index = async (_req: Request, res: Response) => {
  try {
    const orders = await pro.index();
    res.json(orders);
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
const orderuser = async (req: Request, res: Response) => {
  try {
    const user_id = req.params.user_id as unknown as number;
    const showed = await pro.orderuser(user_id);
    res.json(showed);
  } catch (err) {
    res.status(400).json({ err });
    return;
  }
};
const orderproduct = async (req: Request, res: Response) => {
  try {
    const product_id = req.params.product_id as unknown as number;
    const showed = await pro.orderproduct(product_id);
    res.json(showed);
  } catch (err) {
    res.status(400).json({ err });
    return;
  }
};
const up = async (req: Request, res: Response) => {
  try {
    
    const status:string = req.body.status;
    if(status == 'active' || status == 'complete' ){
      return status;

    }else{
      res.send('Enter active or complete')
    }
    const id = req.params.id as unknown as number;
    const user_id = req.body.user_id as unknown as number;
    
    const updated = await pro.update(id,status, user_id);
    res.json(updated);
  } catch (err) {
    res.status(400).json({ err });
    return;
  }
};

const orderRoutes = (app: express.Application) => {
  app.post('/order', author, insert);
  app.post('/order/:id/product', author, addproduct);
  app.get('/order', index);
  app.get('/order/:id', author, show);
  app.get('/order/:user_id', author, orderuser);
  app.get('/order/:product_id', author, orderproduct);
  app.put('/order/:id', author, up);
  app.delete('/order/:id', author, destroy);
  
  
};

export default orderRoutes;
