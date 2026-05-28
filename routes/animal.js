const express = require('express');
const router = express.Router();
const AnimalController = require('../controllers/animalController');

router.get('/', AnimalController.catalog);
router.get('/:id', AnimalController.detail);
router.get('/add', AnimalController.showForm);
router.post('/add', AnimalController.add);

module.exports = router;