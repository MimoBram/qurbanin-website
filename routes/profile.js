const express = require('express');
const router = express.Router();
const ProfileController = require('../controllers/profileController');

router.get('/', ProfileController.index);

module.exports = router;