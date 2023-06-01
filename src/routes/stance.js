const express = require('express');

const router = express.Router();

const stance = require('../controllers/stance');

router.get('/user', stance.getStancesByUser);
router.post('/', stance.createnewStance);
router.get('/all', stance.getAll);
router.get('/:stanceId', stance.getById);
router.delete('/:stanceId', stance.deleteStance);
router.put('/update', stance.updateStance);
router.put('/like/:stanceId', stance.addLikeToStance);
router.put('/share/:stanceId', stance.addShareToPost);
router.put('/reposts/:stanceId', stance.repostStance);
router.put('/dislike/:stanceId', stance.dislikeStance);

module.exports = router;
