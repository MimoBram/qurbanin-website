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
    
    static async showForm(req, res) {
        res.render('/animals/form', { user: req.user, animal: null, mode: "add", errors: [] });
    }

    static async add(res, req) {
        try {
            const { name, type, weight, price, farmId } = req.body;
            await Animal.create({ name, type, weight, price, farmId: farmId });
            res.redirect('/animals');
        } catch (err) {
            res.render('/animals/forms', { user: req.user, animal: null, mode: 'add', errors: err.message });
        }
    } 
}

module.exports = AnimalController;