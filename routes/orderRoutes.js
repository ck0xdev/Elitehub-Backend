const express = require('express');
const { createOrder, fetchOrdersByUser } = require('../controllers/orderController');
const router = express.Router();

router.post('/', createOrder)
      .get('/user/:userId', fetchOrdersByUser);

module.exports = router;