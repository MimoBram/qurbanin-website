const { Farm } = require('../models');

class FarmController {
    static async index(req, res) {
        try {
            const farms = await Farm.findAll({ where: { UserId: req.user.id } });
            res.render('/farms/index', { user: req.user, farms, errors: [] });
        } catch (err) {
            res.send(err.message);
        }
    }

    static async showForm(req, res) {
        res.render('/farms/form', { user: req.user, farm: null, mode: 'add', errors: [] });
    }

    static async add(req, res) {
        try {
            const { name, location } = req.body;
            await Farm.create({ name, location, UserId: req.user.id });
            res.redirect('/farms');
        } catch (err) {
            res.send(err.message);
        }
    }
}

module.exports = FarmController;