"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Sequelize, Model, DataTypes } = require('sequelize');
class RentalModel extends Model {
    static setup(sequelizeInstance) {
        RentalModel.init({
            id: {
                type: DataTypes.INTEGER,
                unique: true,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true
            },
            price_per_day: {
                type: DataTypes.STRING,
                allowNull: false
            },
            date_from: {
                type: DataTypes.STRING,
                allowNull: false
            },
            date_until: {
                type: DataTypes.STRING,
                allowNull: false
            },
            total_price: {
                type: DataTypes.STRING,
                allowNull: false
            },
            payment_method: {
                type: DataTypes.STRING,
                allowNull: false
            },
            is_paid: {
                type: DataTypes.BOOLEAN,
                allowNull: false
            },
            status: {
                type: DataTypes.STRING
            },
            createdAt: {
                type: DataTypes.DATE,
                defaultValue: Sequelize.NOW,
                allowNull: false
            },
            updatedAt: {
                type: DataTypes.DATE,
                defaultValue: Sequelize.NOW,
                allowNull: false
            }
        }, {
            sequelize: sequelizeInstance,
            modelName: 'Rent',
            paranoid: true
        });
        return RentalModel;
    }
    static setupAssociations(CarModel, ClientModel) {
        RentalModel.belongsTo(CarModel, {
            foreignKey: 'fk_car'
        });
        RentalModel.belongsTo(ClientModel, {
            foreignKey: 'fk_client'
        });
    }
}
exports.default = RentalModel;
//# sourceMappingURL=rentalModel.js.map