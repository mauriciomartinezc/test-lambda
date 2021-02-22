const User = require('../../models/User');

/**
 *
 * @param body
 * @returns {Promise<*>}
 */
exports.setDataCreateUser = async (body) => {
    const data = {
        name: body.name,
        email: body.email,
    };
    const user = await User.create(data);
    return user;
};