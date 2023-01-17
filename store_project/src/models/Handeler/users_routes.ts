import express, { Request, Response } from 'express';
import { user, UsersTable } from '../users';
import jwt from 'jsonwebtoken';
import config from '../../config';
import author from '../middleware/auth.middleware';

const st = new UsersTable();
const insert = async (req: Request, res: Response) => {
  try {
    const result: user = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      pass: req.body.pass
    };

    const newUser = await st.insert(result);
    const token = jwt.sign({ user: newUser }, config.token as string);
    res.json(token);
  } catch (err) {
    res.status(400).json({ err });
    return;
  }
};
const index = async (_req: Request, res: Response) => {
  try {
    const users = await st.index();
    res.json(users);
  } catch (err) {
    res.json(400);
    res.json(err);
  }
};
const destroy = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as unknown as number;
    const deleted = await st.delete(id);
    res.json(deleted);
  } catch (err) {
    res.status(400).json({ err });
    return;
  }
};
const show = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as unknown as number;
    const showed = await st.show(id);
    res.json(showed);
  } catch (err) {
    res.status(400).json({ err });
    return;
  }
};
const up = async (req: Request, res: Response) => {
  try {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const id = req.params.id as unknown as number;
    const updated = await st.update(id, firstname, lastname);
    res.json(updated);
  } catch (err) {
    res.status(400).json({ err });
    return;
  }
};
const authnticate = async (req: Request, res: Response) => {
  try {
    const firstname = req.body.firstname;
    const pass = req.body.pass;
    const showed = await st.authnticate(firstname, pass);
    res.json(showed);
  } catch (err) {
    res.status(400).json({ err });
    return;
  }
};

const userRoutes = (app: express.Application) => {
  app.post('/user', insert);
  app.get('/user', author, index);
  app.get('/user/:id', author, show);
  app.put('/user/:id', author, up);
  app.delete('/user/:id', author, destroy);
  app.get('/authnticate', author, authnticate);
};

export default userRoutes;
