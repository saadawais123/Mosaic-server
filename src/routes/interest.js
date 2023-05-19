const express = require('express');

const router = express.Router();

const interests = require('../controllers/interest');

router.get('/', interests.getAll);
router.get('/user', interests.getInterestByUser);
router.post('/add', interests.addUserInterest);

module.exports = router;
