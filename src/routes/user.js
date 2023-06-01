const express = require('express');

const router = express.Router();

const user = require('../controllers/user');

router.get('/:id', user.getUser);
router.put('/:userId', user.updateProfile);
router.post('/follow', user.followUser);
router.post('/following/:userId', user.getUserFollowing);
router.post('/followers/:userId', user.getUserFollowers);

module.exports = router;
