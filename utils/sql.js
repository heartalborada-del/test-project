const {Sequelize, DataTypes} = require("sequelize");

const cp = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        dialect: "mysql",
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        pool: {
            max: 10,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
        logging:false
    }
);

const users = cp.define('User',
    {
        UUID: {
            type: DataTypes.UUID,
            allowNull: false,
            unique: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        tableName: process.env.DB_PERFIX + 'Users'
    }
)

cp.sync();

module.exports = {cp,users};