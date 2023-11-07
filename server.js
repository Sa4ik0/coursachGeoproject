const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.post('/saveOrder', (req, res) => {
  const orderData = req.body;

  fs.readFile('orders.json', (err, data) => {
    if (err) {
      res.status(500).send('Error reading file');
      return;
    }

    const orders = JSON.parse(data);
    orders.push(orderData);

    fs.writeFile('orders.json', JSON.stringify(orders, null, 2), (err) => {
      if (err) {
        res.status(500).send('Error writing file');
        return;
      }

      res.status(200).send('Order data saved successfully');
    });
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
