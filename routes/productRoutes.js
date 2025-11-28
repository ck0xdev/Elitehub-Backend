const express = require('express');
const { createProduct, getAllProducts, getProductById } = require('../controllers/productController');
const router = express.Router();

router.post('/', createProduct)
      .get('/', getAllProducts)
      .get('/:id', getProductById);

module.exports = router;