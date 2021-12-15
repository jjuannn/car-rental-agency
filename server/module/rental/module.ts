import RentalController from '../rental/controller/rentalController';
import RentalService from '../rental/service/rentalService';
import RentalRepository from './repository/postgres/rentalRepository';
import RentalModel from '../rental/model/rentalModel';
import DICointainer from 'rsdi';
import express from 'express';
import IRentalController from './controller/interface/IRentalController';

function initRentalModule(app: express.Application, container: DICointainer): void {
  const controller: IRentalController = container.get('RentalController');
  controller.configureRoutes(app);
}

export {initRentalModule, RentalRepository, RentalModel, RentalController, RentalService};
