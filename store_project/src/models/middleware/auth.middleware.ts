import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../../config';

const author = (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.get('authorization') as unknown as string;
  const token = authorization.split(' ')[1];
  try {
    jwt.verify(token as string, config.token as string);
    next();
  } catch (err) {
    console.log(token);
    res.status(401);
    res.json('Access denied, invalid token');
  }
};
export default author;
