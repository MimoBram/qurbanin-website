const { Farm } = require('../models');

class FarmController {
    static async index(req, res) {
        try {
            const farms = await Farm.findAll();
            res.render('farms/farm', { user: req.session.user, farms, errors: [] });
        } catch (err) {
            res.send(err.message);
        }
    }

    static async showForm(req, res) {
        res.render('farmForm', { user: req.session.user, farm: null, mode: 'add', errors: [] });
    }

    static async add(req, res) {
        try {
            const { name, location } = req.body;
            const userId = req.session.user ? req.session.user.id : null;
            await Farm.create({ name, location, UserId: userId });
            res.redirect('/farms');
        } catch (err) {
            res.send(err.message);
        }
    }
}

module.exports = FarmController;