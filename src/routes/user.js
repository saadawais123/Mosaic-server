const express = require('express');

const router = express.Router();

const user = require('../controllers/user');

router.get('/:id', user.getUser);
router.put('/:userId', user.updateProfile);
module.exports = router;
