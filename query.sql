USE bamazon;

CREATE TABLE products(
	item_id INTEGER AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    price DECIMAL(9,2) NOT NULL,
    stock_quantity INTEGER NOT NULL,
    PRIMARY KEY(item_id)
);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Phone Case","Accessories", 14.99, 19),("Laptop","Electronics",1240.00, 3),("4K TV","Electronics",899.00, 9),("Toilet Paper", "Bathroom Essentials", 13.00,194),("Shampoo","Shower Essentials", 5.79, 394),("Wireless Phone Charger", "Electronics", 14.99, 39),("Headphones", "Electronics", 7.99, 75),("Coffee Press","Kitchen and Dining", 28.85, 32),("Nike Shoes", "Clothing", 120.00, 8),("Foldable Chair", "Furniture", 9.99, 87),("Power Bank", "Electronics", 26.99, 13),("Weighted Blanket", "Home and Kitchen", 49.99, 28);

