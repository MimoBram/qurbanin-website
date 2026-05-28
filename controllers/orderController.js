const { Order, User, UserProfile, OrderItem, Animal, Farm } = require('../models');

class OrderController {
    static async detail(req, res) {
        try {
            const order = await Order.findByPk(req.params.id, {
                include: [
                    { model: User, include: UserProfile },
                    { model: OrderItem, include: [{ model: Animal, include: Farm }] }
                ]
            });
            res.render('/orders/detail', { user: req.user, order, errors: [] });
        } catch (err) {
            res.send(err.message);
        }
    }

    static async index(req, res) {
        try {
            const orders = await Order.findAll({ where: { UserId: req.user.id } });
            res.render('/orders/index', { user: req.user, order, errors: [] });
        } catch (err) {
            res.send(err.message)
        }
    }
}

module.exports = OrderController;