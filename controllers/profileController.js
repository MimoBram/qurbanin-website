const { User, UserProfile } = require('../models');

class ProfileController {
    static async index(req, res) {
        try {
            const user = await User.findByPk(req.user.id, { include: UserProfile });
            res.render('/profile/index', { user, errors: [] });
        } catch (err) {
            res.send(err.message);
        }
    }
}

module.exports = ProfileController;