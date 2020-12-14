const RentalController = require('../rental/controller/rentalController');
const RentalService = require('../rental/service/rentalService');
const RentalRepository = require('../rental/repository/sqlite/rentalRepository');
const RentalModel = require('../rental/model/rentalModel');
/**
 *
 * @param {import("express").Application} app
 * @param {import("rsdi").IDIContainer} container
 */
function initRentalModule(app, container) {
  const controller = container.get('RentalController');
  controller.configureRoutes(app);
}

module.exports = {
  initRentalModule,
  RentalRepository,
  RentalModel,
  RentalController,
  RentalService
};
