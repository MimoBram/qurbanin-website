const { User, UserProfile } = require('../models');

class ProfileController {
    static async index(req, res) {
        if (!req.session.user) {
            return res.redirect('/login');
        }
        try {
            const user = await User.findByPk(req.session.user.id, { include: UserProfile });
            res.render('profiles/profile', { user, errors: [] });
        } catch (err) {
            res.send(err.message);
        }
    }
}

module.exports = ProfileController;