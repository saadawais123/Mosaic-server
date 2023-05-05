const express = require('express');

const router = express.Router();

const authController = require('../controllers/auth');

router.post('/sign-up', authController.register);
router.post('/sign-in', authController.logIn);

module.exports = router;
