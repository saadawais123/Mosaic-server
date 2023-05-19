const express = require('express');

const router = express.Router();

const stance = require('../controllers/stance');

router.get('/', stance.getAll);
router.get('/:stanceId', stance.getById);
router.get('/user', stance.getStancesByUser);
router.put('/', stance.updateStance);
router.post('/', stance.createnewStance);
router.delete('/stanceId', stance.deleteStance);

module.exports = router;
