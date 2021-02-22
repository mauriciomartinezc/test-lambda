const db = require('../traits/db');
const moment = require('moment-timezone');
const now = moment().tz('America/Bogota').format('YYYY-MM-DD HH:mm:ss');

/**
 *
 * @param sequelize
 * @param DataTypes
 * @returns {*}
 */
const model = (sequelize, DataTypes) => {
    return sequelize.define('user', {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            name: {
                type: DataTypes.STRING(255),
                allowNull: false
            },
            email: {
                type: DataTypes.STRING(255),
                allowNull: false,
                unique: {
                    args: true,
                    msg: "¡El correo electrónico ya está en uso!"
                }
            },
            created_at: {
                type: DataTypes.DATE,
                defaultValue: now,
                allowNull: false
            },
            updated_at: {
                type: DataTypes.DATE,
                defaultValue: now,
                allowNull: false
            }
        },
        {
            indexes: [
                {unique: true, fields: ["email"]},
            ],
        }
    );
}

module.exports = model(db.sequelize, db.Sequelize);