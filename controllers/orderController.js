const { Order, User, UserProfile, OrderItem, Animal, Farm } = require('../models');

class OrderController {
    static async index(req, res) {
        try {
            // if (!req.session.user) {
            //     return res.redirect('/login');
            // }
            const whereClause = req.session.user ? { UserId: req.session.user.id } : {};
            const orders = await Order.findAll({ include: { model: User, include: UserProfile } });
            res.render('orders/order', { user: req.session.user, orders, errors: [] });
        } catch (err) {
            res.send(err.message)
        }
    }
    
    static async detail(req, res) {
        try {
            // if (!req.session.user) {
            //     return res.redirect('/login');
            // }
            const order = await Order.findByPk(req.params.id, {
                include: [
                    { model: User, include: UserProfile },
                    { model: OrderItem, include: [{ model: Animal, include: Farm }] }
                ]
            });
            res.render('orders/orderDetail', { user: req.session.user, orders, errors: [] });
        } catch (err) {
            res.send(err.message);
        }
    }
}

module.exports = OrderController;