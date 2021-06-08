const ClientRepository = require('../client/repository/sqlite/clientRepository');
const ClientModel = require('../client/model/clientModel');
const ClientController = require('../client/controller/clientController');
const ClientService = require('../client/service/clientService');
/**
 *
 * @param {import("express").Application} app
 * @param {import("rsdi").IDIContainer} container
 */
function initClientModule(app, container) {
  const controller = container.get('ClientController');
  controller.configureRoutes(app);
}

module.exports = {
  initClientModule,
  ClientRepository,
  ClientModel,
  ClientController,
  ClientService
};
