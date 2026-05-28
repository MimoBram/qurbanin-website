const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/orderController');

router.get('/', OrderController.index);
router.get('/:id', OrderController.detail);

module.exports = router;