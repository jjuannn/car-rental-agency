const {Sequelize, Model, DataTypes} = require('sequelize');

module.exports = class CarModel extends Model {
  /**
   * @param {import("sequelize").Sequelize} sequelizeInstance
   * @returns {typeof CarModel}
   */
  static setup(sequelizeInstance) {
    CarModel.init(
      {
        id: {
          type: DataTypes.INTEGER,
          unique: true,
          primaryKey: true,
          allowNull: false,
          autoIncrement: true
        },
        brand: {
          type: DataTypes.STRING,
          allowNull: false
        },
        model: {
          type: DataTypes.STRING,
          allowNull: false
        },
        year: {
          type: DataTypes.STRING,
          allowNull: false
        },
        mileage: {
          type: DataTypes.STRING,
          allowNull: false
        },
        color: {
          type: DataTypes.STRING,
          allowNull: false
        },
        hasAC: {
          type: DataTypes.BOOLEAN,
          allowNull: false
        },
        passengers: {
          type: DataTypes.STRING,
          allowNull: false
        },
        gearbox_type: {
          type: DataTypes.STRING,
          allowNull: false
        },
        price_per_day: {
          type: DataTypes.STRING,
          allowNull: false
        },
        images: {
          type: DataTypes.STRING,
          field: 'car_image',
          allowNull: false
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
      },
      {
        sequelize: sequelizeInstance,
        modelName: 'Car',
        paranoid: true
      }
    );
    return CarModel;
  }
};
