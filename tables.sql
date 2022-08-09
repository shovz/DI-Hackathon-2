DROP TABLE cart;
DROP TABLE users;
DROP TABLE products;
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL ,
    last_name VARCHAR(100) NOT NULL ,
    email VARCHAR(100) NOT NULL ,
    password VARCHAR(150) NOT NULL 
);
				
CREATE TABLE products (
    product_id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL ,
    category VARCHAR(100) NOT NULL ,
    description text NOT NULL ,
    image text NOT NULL ,
    price FLOAT NOT NULL ,
    rating FLOAT NOT NULL ,
    votes_count INTEGER NOT NULL 
);

CREATE TABLE cart (
    cart_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users (user_id) ON DELETE CASCADE,
    product_id INTEGER NOT NULL  REFERENCES products (product_id) ON DELETE CASCADE
);



SELECT * FROM cart
JOIN products ON cart.product_id=products.product_id
JOIN users ON cart.user_id=users.user_id;



SELECT * FROM users;
SELECT * FROM products;
