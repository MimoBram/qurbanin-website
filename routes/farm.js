const express = require('express');
const router = express.Router();
const FarmController = require('../controllers/farmController');

router.get('/', FarmController.index);
router.get('/add', FarmController.showForm);
router.post('/add', FarmController.add);

module.exports = router;