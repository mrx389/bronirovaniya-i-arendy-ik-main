const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const User = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },
    role: { type: DataTypes.STRING, defaultValue: 'USER' }
});

const Rent = sequelize.define('Rent', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    image: { type: DataTypes.STRING, allowNull: false },
    address: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.INTEGER, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    day: { type: DataTypes.INTEGER, allowNull: false },
});

const RentalItem = sequelize.define('RentalItem', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.INTEGER, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    day: { type: DataTypes.INTEGER, allowNull: false },
    RentId: { type: DataTypes.INTEGER, allowNull: false },
    image: { type: DataTypes.STRING, allowNull: false },
});

const Review = sequelize.define('Review', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    avatar: { type: DataTypes.STRING, allowNull: false },
    review: { type: DataTypes.STRING, allowNull: false },
});

const Application = sequelize.define('Application', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING, allowNull: false },
    dayFrom: { type: DataTypes.STRING, allowNull: false },
    dayTo: { type: DataTypes.STRING, allowNull: false },
    paymentMethod: { type: DataTypes.STRING, allowNull: false },
    processed: { type: DataTypes.BOOLEAN, defaultValue: false },
    approved: { type: DataTypes.BOOLEAN, defaultValue: false },
    RentalItemId: { type: DataTypes.INTEGER, allowNull: false },
});

Rent.hasMany(RentalItem, { as: 'RentalItems', foreignKey: 'RentId' });
RentalItem.belongsTo(Rent, { foreignKey: 'RentId' });

RentalItem.hasMany(Application, { as: 'Applications', foreignKey: 'RentalItemId' });
Application.belongsTo(RentalItem, { foreignKey: 'RentalItemId' });

module.exports = {
    User, Rent, RentalItem, Review, Application
};
