const Router = require('express');
const router = new Router();
const rentalItemController = require('../controllers/rentalItemController');

router.post('/', rentalItemController.create);
router.get('/', rentalItemController.getAll);
router.get('/:id', rentalItemController.getOne);
router.delete('/:id', rentalItemController.deleteOne);

module.exports = router;
