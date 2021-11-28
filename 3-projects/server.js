const express = require("express");
const app = express();

const { Pool } = require("pg");

const pool = new Pool({
  user: "mya",
  host: "localhost",
  database: "cyf_ecommerce",
  password: "mya",
  port: 5432,
});

app.get("/", function (req, res) {
  res.send("hello");
});

app.get("/customers", function (req, res) {
  pool.query("SELECT * FROM customers", (error, result) => {
    if (error) console.log(error);

    res.json(result.rows);
  });
});

app.get("/suppliers", function (req, res) {
  pool.query("SELECT * FROM suppliers", (error, result) => {
    if (error) console.log(error);

    res.json(result.rows);
  });
});

app.get("/products", function (req, res) {
  pool.query(
    "SELECT products.product_name, product_availability.unit_price, suppliers.supplier_name FROM ((products INNER JOIN product_availability ON products.id = product_availability.prod_id) INNER JOIN suppliers ON suppliers.id = product_availability.supp_id)",
    (error, result) => {
      if (error) console.log(error);

      res.json(result.rows);
    }
  );
});


app.listen(3000, function () {
  console.log("Server is listening on port 3000. Ready to accept requests!");
});