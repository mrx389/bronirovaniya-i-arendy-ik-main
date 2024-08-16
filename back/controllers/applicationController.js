const { Application, Rent, RentalItem } = require('../models/models');
const ApiError = require('../error/ApiError');


class ApplicationController {
    async create(req, res, next) {
        try {
            const { name, phone, dayFrom, dayTo, paymentMethod, approved, processed, RentalItemId } = req.body;
            const data = await Application.create({
                name, phone, dayFrom, dayTo, paymentMethod, approved, processed, RentalItemId
            });
            return res.json(data);
        } catch(e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req, res) {
        const data = await Application.findAll({
            order: [
                ['processed', 'ASC'],
                ['createdAt', 'DESC']
            ],
            include: [
                {
                    model: RentalItem,
                    as: 'RentalItem',
                    attributes: ['title', 'price', 'description', 'day', 'RentId', 'image'],
                    include: [
                        {
                            model: Rent,
                            as: 'Rent',
                            attributes: ['address', 'price', 'image', 'description', 'day'],
                        },
                    ]
                }
            ]
        })
        return res.json(data);
    }

    async deleteOne(req, res, next) {
        try {
            const { id } = req.params;
            const deleted = await Application.destroy({ where: { id } });
            if (deleted) {
                return res.json({ message: 'Deleted successfully' });
            }
            throw new Error('Application not found');
        } catch(e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async updateProcessed(req, res, next) {
        try {
            const { id } = req.params;
            const { processed, approved } = req.body;

            const updatedApplication = await Application.update(
                {
                    processed,
                    approved,
                },
                { where: { id } }
            );

            if (updatedApplication[ 0 ] === 1) {
                return res.json({ message: 'Processed updated successfully' });
            } else {
                throw new Error('Application not found');
            }
        } catch(e) {
            next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new ApplicationController();
