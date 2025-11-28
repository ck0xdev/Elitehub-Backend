const express = require('express');
const { createProducts, fetchAllProducts, fetchProductById } = require('../controllers/Product');
const router = express.Router();

router.post('/', createProducts)
      .get('/', fetchAllProducts)
      .get('/:id', fetchProductById);

module.exports = router;