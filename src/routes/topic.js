const express = require('express');

const router = express.Router();

const topics = require('../controllers/topic');

router.get('/', topics.getAll);


module.exports = router;
