const { and } = require('sequelize');
const { Animal, Farm } = require('../models');

class AnimalController {
    static async catalog(req, res) {
        try {
            const animals = await Animal.findAll({ include: Farm });
            res.render('animals/animal', { user: req.session.user || null, animals, errors: [] });
        } catch (err) {
            res.send(err.message);
        }
    }

    static async detail(req, res) {
        try {
            const animals = await Animal.findByPk(req.params.id, { include: Farm });
            res.render('animalDetail', { user: req.session.user, animals, errors: [] });
        } catch (err) {
            res.send(err.message);
        }
    }
    
    static async showForm(req, res) {
        res.render('animalForm', { user: req.session.user, animal: null, mode: "add", errors: [] });
    }

    static async add(req, res) {
        try {
            const { name, type, weight, price, farmId } = req.body;
            await Animal.create({ name, type, weight, price, farmId: farmId });
            res.redirect('/animals');
        } catch (err) {
            res.render('animalForm', { user: req.session.user, animal: null, mode: 'add', errors: [{ message: err.message }] });
        }
    } 
}

module.exports = AnimalController;