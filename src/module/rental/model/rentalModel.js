const { Sequelize, Model, DataTypes } = require('sequelize');

module.exports = class RentalModel extends Model {
  /**
     * @param {import("sequelize").Sequelize} sequelizeInstance
     * @returns {typeof RentalModel}
    */
  static setup(sequelizeInstance) {
    RentalModel.init({
      id: {
        type: DataTypes.INTEGER,
        unique: true,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
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
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false
      }},
      {
        sequelize: sequelizeInstance,
        modelName: "Rent",
        timestamps: false
      });
    return RentalModel
  }

  /**
   * 
   * @param {import("../../car/model/carModel")} CarModel
   * @param {import("../../client/model/clientModel")} ClientModel 
   */
  static setupAssociations(CarModel, ClientModel){
      RentalModel.belongsTo(CarModel, {
        foreignKey: "fk_car" 
      })
      RentalModel.belongsTo(ClientModel, { 
        foreignKey: "fk_client"
      })
  }
};