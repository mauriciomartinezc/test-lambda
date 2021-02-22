const {Op} = require('sequelize'); // https://sequelize.org/master/manual/model-querying-basics.html
const User = require('../../../models/User');

/**
 *
 * @param email
 * @param id
 * @returns {Promise<boolean>}
 */
exports.validateExistEmail = async (email, id = null) => {
    let user = null;
    if (id) {
        user = await User.findOne({
            where: {
                [Op.and]: [{email}, {id: {[Op.ne]: id}}]
            },
            attributes: ["id"]
        });
    } else {
        user = await User.findOne({
            where: {email},
            attributes: ["id"]
        });
    }
    return !!user;
};