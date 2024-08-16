const Router = require('express');
const router = new Router();
const rentController = require('../controllers/rentController');

router.post('/', rentController.create);
router.get('/', rentController.getAll);
router.get('/:id', rentController.getOne);
router.delete('/:id', rentController.deleteOne);

module.exports = router;
