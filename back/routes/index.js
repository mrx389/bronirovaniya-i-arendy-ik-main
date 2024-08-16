const Router = require('express');
const router = new Router();
const reviewRouter = require('./reviewRouter');
const rentRouter = require('./rentRouter');
const rentalItemRouter = require('./rentalItemRouter');
const applicationRouter = require('./applicationRouter');
const userRouter = require('./userRouter');

router.use('/review', reviewRouter);
router.use('/rent', rentRouter);
router.use('/rental_item', rentalItemRouter);
router.use('/application', applicationRouter);
router.use('/user', userRouter);


module.exports = router;
