import express from 'express';

export interface IParams {
  req: express.Request;
  res: express.Response;
}

export default interface ICarController {
  configureRoutes(app: express.Application): void;
  renderList(args: IParams): Promise<void>;
  getById(args: IParams): Promise<void>;
  saveNewCar(args: IParams): Promise<void>;
  saveEditedCar(args: IParams): Promise<void>;
  delete(args: IParams): Promise<void>;
}
