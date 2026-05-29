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
            const animal = await Animal.findByPk(req.params.id, { include: Farm });
            res.render('animals/animalDetail', { user: req.session.user, animal, errors: [] });
        } catch (err) {
            res.send(err.message);
        }
    }
    
    static async showForm(req, res) {
        try {
            const farms = await Farm.findAll();
            res.render('animals/form', {
                user: req.session.user || null,
                animal: null,
                farms,
                mode: 'add',
                errors: []
            });
        } catch (err) {
            res.status(500).send(err.message);
        }
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

    
    static async showEditForm(req, res) {
        try {
            const animal = await Animal.findByPk(req.params.id, { include: Farm });
            const farms = await Farm.findAll(); // ambil semua farm

            res.render('animals/form', {
            user: req.session.user || null,
            animal,
            farms,              // kirim farms ke view
            mode: 'edit',
            errors: []
            });
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    static async update(req, res) {
        try {
            const { name, type, weight, price, farmId } = req.body;
            await Animal.update(
                { name, type, weight, price, farmId },
                { where: { id: req.params.id } }
            );
            res.redirect('/animals');
        } catch (err) {
            const animal = await Animal.findByPk(req.params.id, { include: Farm });
            res.render('animals/form', {
                user: req.session.user || null,
                animal,
                mode: 'edit',
                errors: [{ message: err.message }]
            });
        }
    }

    static async delete(req, res) {
        try {
            await Animal.destroy({ where: { id: req.params.id } });
            res.redirect('/animals');
        } catch (err) {
            res.status(500).send(err.message);
        }
    }
}

module.exports = AnimalController;