const express = require('express');

const router = express.Router();

const user = require('../controllers/user');

router.post('/follow', user.followUser);
router.get('/following/:userId', user.getUserFollowing);
router.get('/followers/:userId', user.getUserFollowers);
router.get('/:id', user.getUser);
router.put('/:userId', user.updateProfile);

module.exports = router;
