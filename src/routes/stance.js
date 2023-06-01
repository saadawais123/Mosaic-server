const express = require('express');

const router = express.Router();

const stance = require('../controllers/stance');

router.get('/', stance.getAll);
router.get('/:stanceId', stance.getById);
router.get('/user', stance.getStancesByUser);
router.put('/', stance.updateStance);
router.post('/', stance.createnewStance);
router.delete('/:stanceId', stance.deleteStance);
router.put('/like/:stanceId', stance.addLikeToStance);
router.put('/share/:stanceId', stance.addShareToPost);
router.put('/reposts/:stanceId', stance.repostStance);

module.exports = router;
