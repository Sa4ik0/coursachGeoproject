const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Разрешить все источники (для разработки)
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use(cors());

app.put('/updateOrderProperty/:orderId', (req, res) => {
  const orderId = req.params.orderId;
  const { property, value } = req.body;

  fs.readFile('orders.json', (err, data) => {
    if (err) {
      res.status(500).send('Error reading file');
      return;
    }

    const orders = JSON.parse(data);
    const order = orders.find(order => order.id === orderId);

    if (!order) {
      res.status(404).send('Order not found');
      return;
    }

    // Обновляем свойство заказа
    order[property] = value;

    fs.writeFile('orders.json', JSON.stringify(orders, null, 2), (err) => {
      if (err) {
        res.status(500).send('Error writing file');
        return;
      }

      res.status(200).json({ message: 'Order property updated successfully' });
    });
  });
});

// Загрузка заказов
app.get('/getOrders', (req, res) => {
  fs.readFile('orders.json', (err, data) => {
    if (err) {
      res.status(500).send('Error reading file');
      return;
    }

    const orders = JSON.parse(data);
    res.status(200).json(orders);
  });
});

// Сохранение заказа
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

app.put('/updateOrderStatus/:orderId', (req, res) => {
  const orderId = req.params.orderId;
  const newStatus = req.body.status;

  fs.readFile('orders.json', (err, data) => {
    if (err) {
      res.status(500).send('Error reading file');
      return;
    }

    const orders = JSON.parse(data);
    const orderToUpdate = orders.find(order => order.id === orderId);

    if (!orderToUpdate) {
      res.status(404).send('Order not found');
      return;
    }

    orderToUpdate.completed = newStatus;

    fs.writeFile('orders.json', JSON.stringify(orders, null, 2), (err) => {
      if (err) {
        res.status(500).send('Error writing file');
        return;
      }

      res.status(200).send('Order status updated successfully');
    });
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
