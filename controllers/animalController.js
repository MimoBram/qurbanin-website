const { and } = require('sequelize');
const { Animal, Farm } = require('../models');

class AnimalController {
    static async catalog(req, res) {
        try {
            const animals = await Animal.findAll({ include: Farm });
            res.render('/animals/index', { user: req.user, animals, errors: [] });
        } catch (err) {
            res.send(err.message);
        }
    }

    static async detail(req, res) {
        try {
            const animals = Animal.findByPk(req.params.id, { include: Farm });
            res.render('animals/detail', { user: req.user, animals, errors: [] });
        } catch (err) {
            res.send(err.message);
        }
    }
}

module.exports = AnimalController;