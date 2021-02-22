const User = require('../../models/User');

/**
 *
 * @param id
 * @returns {Promise<*>}
 */
exports.destroyUser = async (id) => {
    const user = await User.findOne({where: {id}});
    await User.destroy({where: {id}});
    return user;
};