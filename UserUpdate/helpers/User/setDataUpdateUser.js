const User = require('../../models/User');
const moment = require('moment-timezone');
const now = moment().tz('America/Bogota').format('YYYY-MM-DD HH:mm:ss');

/**
 *
 * @param body
 * @returns {Promise<*>}
 */
exports.setDataUpdateUser = async (body) => {
    const data = {
        name: body.name,
        email: body.email,
        updated_at: now,
    };
    await User.update(data, {where: {id: body.id}});
    return await User.findOne({where: {id: body.id}});
};