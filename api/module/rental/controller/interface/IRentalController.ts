import express from 'express';

export interface IParams {
  req: express.Request;
  res: express.Response;
}

export default interface IRentalController {
  configureRoutes(app: express.Application): void;
  getAll(arg: IParams): Promise<void>;
  getById(arg: IParams): Promise<void>;
  saveNewRental(arg: IParams): Promise<void>;
  saveEditedRental(arg: IParams): Promise<void>;
  finish(arg: IParams): Promise<void>;
}
