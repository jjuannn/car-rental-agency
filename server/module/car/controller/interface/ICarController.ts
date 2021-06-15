import express from 'express';

export default interface ICarController {
  configureRoutes(app: express.Application): void;
  getAll(req: express.Request, res: express.Response): Promise<void>;
  getById(req: express.Request, res: express.Response): Promise<void>;
  saveNewCar(req: express.Request, res: express.Response): Promise<void>;
  saveEditedCar(req: express.Request, res: express.Response): Promise<void>;
  delete(req: express.Request, res: express.Response): Promise<void>;
}
