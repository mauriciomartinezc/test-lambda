const User = require('../../../models/User');

/**
 *
 * @param id
 * @returns {Promise<*>}
 */
exports.validateExistResource = async (id = null) => {
    return await User.findOne({where: {id}, attributes: ["id"]});
};