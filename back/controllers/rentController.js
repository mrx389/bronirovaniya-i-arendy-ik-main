const { Rent, RentalItem } = require('../models/models');
const ApiError = require('../error/ApiError');
const uuid = require('uuid');
const path = require('path');


class RentController {
    async create(req, res, next) {
        try {
            const { address, price, description, day } = req.body;
            const { image } = req.files;
            let fileName = uuid.v4() + '.jpg';
            image.mv(path.resolve(__dirname, '..', 'static', fileName));
            const data = await Rent.create({
                address,
                price,
                image: fileName,
                description,
                day
        });
            return res.json(data);
        } catch(e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req, res) {
        const data = await Rent.findAll();
        return res.json(data);
    }

    async getOne(req, res) {
        try {
            const { id } = req.params;
            console.log(`Fetching Rent with ID: ${id}`);
            const rent = await Rent.findOne({
                where: { id },
                include: [
                    {
                        model: RentalItem,
                        as: 'RentalItems'  // Используем правильный alias
                    }
                ]
            });
            if (!rent) {
                console.log('Rent not found');
                return res.status(404).json({ error: 'Rent not found' });
            }
            console.log('Rent found:', rent);
            return res.json(rent);
        } catch (error) {
            console.error('Error:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async deleteOne(req, res, next) {
        try {
            const { id } = req.params;
            const deleted = await Rent.destroy({ where: { id } });
            if (deleted) {
                return res.json({ message: 'Deleted successfully' });
            }
            throw new Error('Rent not found');
        } catch(e) {
            next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new RentController();
