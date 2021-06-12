import CarRepository from '../car/repository/sqlite/carRepository';
import CarModel from './model/carModel';
import CarController from '../car/controller/carController';
import CarService from '../car/service/carService';
import Express from 'express';
import DIContainer from 'rsdi';
import ICarController from './controller/interface/ICarController';

function initCarModule(app: Express.Application, container: DIContainer) {
  const controller: ICarController = container.get('CarController');
  controller.configureRoutes(app);
}

export {initCarModule, CarRepository, CarModel, CarController, CarService};
