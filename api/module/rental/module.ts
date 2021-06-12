import RentalController from '../rental/controller/rentalController';
import RentalService from '../rental/service/rentalService';
import RentalRepository from '../rental/repository/sqlite/rentalRepository';
import RentalModel from './model/rentalModel';
import express from 'express';
import DIContainer from 'rsdi';
import IRentalController from './controller/interface/IRentalController';

function initRentalModule(app: express.Application, container: DIContainer) {
  const controller: IRentalController = container.get('RentalController');
  controller.configureRoutes(app);
}

export {initRentalModule, RentalRepository, RentalModel, RentalController, RentalService};
