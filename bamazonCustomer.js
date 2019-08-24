var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: "localhost",
    port: '3306',
    user: 'root',
    password: '',
    database: 'bamazon'
});

//starts the app.
init();

//function to start the app
function init() {
    //connects to database
    connection.connect(function (err) {
        if (err) {
            throw err;
        }
        //queries from the products table and stores into response.
        connection.query('SELECT * FROM products', function (err, response) {
            if (err) {
                throw err;
            }
            //function that will run at start. Will list all items that are for sale.
            listItems(response);
            buyItem();
        })
    })
};

//function that will list all items.
function listItems(response) {
    for (var i = 0; i < response.length; i++) {
        console.log(
            `Item ID: ${response[i].item_id}` +
            `\nProduct Name: ${response[i].product_name}` +
            `\nDepartment Name: ${response[i].department_name}` +
            `\nPrice: ${response[i].price}` +
            `\nStock Quantity: ${response[i].stock_quantity}` + `\n======================`
        );
    };
};

//function that asks what they want to buy and goes through the purchase process.
function buyItem() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'itemId',
            message: 'Please enter the item ID of the item you would like to purchase.'
        },
        {
            type: 'input',
            name: 'quantity',
            message: 'How many would you like?'
        }
    ]).then(function (input) {
        var id = input.itemId
        var quantity = input.quantity
        connection.query(`SELECT stock_quantity FROM products WHERE item_id = ${id}`, function (err, response) {
            if (err) {
                throw err;
            }
            var stock = response[0].stock_quantity
            if (stock >= quantity) {
                var newStock = stock - quantity
                connection.query(`UPDATE products SET stock_quantity = ${newStock} where item_id = ${id}`)
                connection.query(`SELECT price FROM products WHERE item_id = 1`, function(err, response){
                    var itemPrice = response[0].price
                    var totalPrice = quantity * itemPrice
                    console.log(
                        `Here is your total: \nNumber of items: ${quantity} \nPrice Per Item: ${itemPrice} \n Total Cost: ${totalPrice}`
                    )
                })
            } else if (stock < quantity) {
                console.log("Insufficient Quantity.")
            }
        })
    });
}