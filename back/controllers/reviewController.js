const { Review } = require('../models/models');
const ApiError = require('../error/ApiError');
const uuid = require('uuid');
const path = require('path');


class ReviewController {
    async create(req, res, next) {
        try {
            const { name, review } = req.body;
            const { avatar } = req.files;
            let fileName = uuid.v4() + '.jpg';
            avatar.mv(path.resolve(__dirname, '..', 'static', fileName));
            const data = await Review.create({
                name, review, avatar: fileName,
            });
            return res.json(data);
        } catch(e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req, res) {
        const data = await Review.findAll();
        return res.json(data);
    }

    async deleteOne(req, res, next) {
        try {
            const { id } = req.params;
            const deleted = await Review.destroy({ where: { id } });
            if (deleted) {
                return res.json({ message: 'Deleted successfully' });
            }
            throw new Error('Review not found');
        } catch(e) {
            next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new ReviewController();
