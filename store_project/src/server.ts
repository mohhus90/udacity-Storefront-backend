import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import productRoutes from './models/Handeler/products_routes';
import userRoutes from './models/Handeler/users_routes';
import orderRoutes from './models/Handeler/orders_routes';
const app: express.Application = express();
const address: string = '127.0.0.1:5000';
app.use(bodyParser.json());

app.get('/', function (req: Request, res: Response) {
  res.send('hello');
});
productRoutes(app);
userRoutes(app);
orderRoutes(app);
app.listen(5000, function () {
  console.log(`starting app on: ${address}`);
});
export default app;
