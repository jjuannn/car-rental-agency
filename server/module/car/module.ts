import CarRepository from './repository/sqlite/carRepository';
import CarModel from './model/carModel';
import CarController from './controller/carController';
import CarService from './service/carService';
import express from 'express';
import {IDIContainer} from 'rsdi';
import ICarController from './controller/interface/ICarController';

function initCarModule(app: express.Application, container: IDIContainer) {
  const controller: ICarController = container.get('CarController');
  controller.configureRoutes(app);
}

export {initCarModule, CarRepository, CarModel, CarController, CarService};
