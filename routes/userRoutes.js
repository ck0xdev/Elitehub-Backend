const express = require('express');
const { fetchUserById, updateUser } = require('../controllers/userController');
const router = express.Router();

router.get('/:id', fetchUserById)
      .patch('/:id', updateUser);

module.exports = router;