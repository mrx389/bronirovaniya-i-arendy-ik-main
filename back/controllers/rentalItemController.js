const { RentalItem, Rent } = require('../models/models');
const ApiError = require('../error/ApiError');
const uuid = require('uuid');
const path = require('path');


class RentalItemController {
    async create(req, res, next) {
        try {
            const { title, price, description, day, RentId } = req.body;
            const { image } = req.files;
            let fileName = uuid.v4() + '.jpg';
            image.mv(path.resolve(__dirname, '..', 'static', fileName));
            const data = await RentalItem.create({
                title, price, description, day, RentId, image: fileName,
            });
            return res.json(data);
        } catch(e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req, res) {
        const data = await RentalItem.findAll({
            include: [
                {
                    model: Rent,
                    as: 'Rent',
                    attributes: [ 'address', 'price', 'image', 'description', 'day' ],
                },
            ]
        });
        return res.json(data);
    }

    async getOne(req, res) {
        try {
            const { id } = req.params;
            const data = await RentalItem.findOne({
                where: { id },
                include: [
                    {
                        model: Rent,
                        as: 'Rent',
                        attributes: [ 'address', 'price', 'image' ],
                    },
                ]
            });
            return res.json(data);
        } catch(error) {
            console.error('Error:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async deleteOne(req, res, next) {
        try {
            const { id } = req.params;
            const deleted = await RentalItem.destroy({ where: { id } });
            if (deleted) {
                return res.json({ message: 'Deleted successfully' });
            }
            throw new Error('RentalItem not found');
        } catch(e) {
            next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new RentalItemController();
