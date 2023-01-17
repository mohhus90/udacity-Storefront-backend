# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index: `'/product' [GET]`
- Show: `'/product/:id' [GET]`
- Create (args: Product)[token required]: `'/product' [POST] (token)`
- Delete: `'/product/:id  [DELETE]`
- UPDATE: `'/product/:id  [PUT]`

#### Users
- Index [token required]: `/user' [GET] (token)`
- Show [token required]: `'/user/:id' [GET] (token)`
- Create (args: User): `'/user' [POST] `
- Delete [token required]: `'/user/:id' [DELETE] (token)`
- UPDATE [token required]: `'/user/:id' [PUT] (token)`
- authnticate [token required]: `'/authnticate' [GET] (token)`

#### Orders
- Index [token required]: `'/order' [GET] (token)`
- Current Order by user [token required]: `'/order/:user_id' [GET] (token)`
- Show [token required]: `'/order/:id' [GET] (token)`
- Orders of user [token required]: `'/order/:user_id' [GET] (token)`
- Orders of product [token required]: `'/order/:product_id' [GET] (token)`
- Add product (args: order)[token required]: `'/order/:id/product' [POST] (token)`
- Create (args: order)[token required]: `'/order' [POST] (token)`
- Delete [token required]: `'/order/:id' [DELETE] (token)`
- UPDATE [token required]: `'/order/:id' [PUT] (token)`

## Data Shapes
#### Product
- id SERIAL PRIMARY KEY,   
- productname VARCHAR(100) NOT NULL,
- price integer NOT NULL

  Column    |          Type          | Collation | Nullable |               Default
-------------+------------------------+-----------+----------+--------------------------------------
 id          | integer                |           | not null | nextval('products_id_seq'::regclass)
 productname | character varying(100) |           | not null |
 price       | integer                |           | not null |
Indexes:
    "products_pkey" PRIMARY KEY, btree (id)
Referenced by:
    TABLE "order_products" CONSTRAINT "order_products_product_id_fkey" FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE

#### User
- firstname VARCHAR(100)NOT NULL,
- lastname VARCHAR(100),
- pass VARCHAR(200)NOT NULL,
- id SERIAL PRIMARY KEY

 Column   |          Type          | Collation | Nullable |              Default
-----------+------------------------+-----------+----------+-----------------------------------
 firstname | character varying(100) |           | not null |
 lastname  | character varying(100) |           |          |
 pass      | character varying(200) |           | not null |
 id        | integer                |           | not null | nextval('users_id_seq'::regclass)
Indexes:
    "users_pkey" PRIMARY KEY, btree (id)
Referenced by:
    TABLE "orders" CONSTRAINT "orders_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE

#### Orders
- id SERIAL PRIMARY KEY,
- status VARCHAR(15),
- user_id bigint REFERENCES users(id) ON DELETE CASCADE ( active or complete)
                                    Table "public.orders"
 Column  |         Type          | Collation | Nullable |              Default
---------+-----------------------+-----------+----------+------------------------------------
 id      | integer               |           | not null | nextval('orders_id_seq'::regclass)
 status  | character varying(15) |           |          |
 user_id | bigint                |           |          |
Indexes:
    "orders_pkey" PRIMARY KEY, btree (id)
Foreign-key constraints:
    "orders_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
Referenced by:
    TABLE "order_products" CONSTRAINT "order_products_order_id_fkey" FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
 

#### order_products
- id SERIAL PRIMARY KEY,
- quantity integer,
- order_id bigint REFERENCES orders(id) ON DELETE CASCADE,
- product_id bigint REFERENCES products(id) ON DELETE CASCADE

   Column   |  Type   | Collation | Nullable |                  Default
------------+---------+-----------+----------+--------------------------------------------
 id         | integer |           | not null | nextval('order_products_id_seq'::regclass)
 quantity   | integer |           |          |
 order_id   | bigint  |           |          |
 product_id | bigint  |           |          |
Indexes:
    "order_products_pkey" PRIMARY KEY, btree (id)
Foreign-key constraints:
    "order_products_order_id_fkey" FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
    "order_products_product_id_fkey" FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE