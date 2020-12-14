const {Sequelize, Model, DataTypes} = require('sequelize');

module.exports = class ClientModel extends Model {
  /**
   * @param {import("sequelize").Sequelize} sequelizeInstance
   * @returns {typeof ClientModel}
   */
  static setup(sequelizeInstance) {
    ClientModel.init(
      {
        id: {
          type: DataTypes.INTEGER,
          unique: true,
          primaryKey: true,
          allowNull: false,
          autoIncrement: true
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false
        },
        surname: {
          type: DataTypes.STRING,
          allowNull: false
        },
        doc_type: {
          type: DataTypes.STRING,
          allowNull: false
        },
        doc_num: {
          type: DataTypes.STRING,
          allowNull: false
        },
        address: {
          type: DataTypes.STRING,
          allowNull: false
        },
        phone: {
          type: DataTypes.BOOLEAN,
          allowNull: false
        },
        e_mail: {
          type: DataTypes.STRING,
          allowNull: false
        },
        nationality: {
          type: DataTypes.STRING,
          allowNull: false
        },
        birthdate: {
          type: DataTypes.STRING,
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
        modelName: 'Client',
        paranoid: true
      }
    );
    return ClientModel;
  }
};
