const path = require('path');
const dotenv = require('dotenv');
const config = dotenv.config();

if (config.error) {
  throw config.error;
}

import express from 'express';
const app = express();

const cors = require('cors');

app.use(
  cors({
    origin: 'http://localhost:3000'
  })
);
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static(`${__dirname}/styles`));
app.use(express.static(`${__dirname}/module/car`));
app.use(express.static('server'));
import configureContainer from './config/di';
const container = configureContainer();

import {initCarModule} from './module/car/module';
import {initClientModule} from './module/client/module';
import {initRentalModule} from './module/rental/module';

initCarModule(app, container);
initClientModule(app, container);
initRentalModule(app, container);

import {Sequelize} from 'sequelize/types';
const mainDb: Sequelize = container.get('Sequelize');
mainDb.sync();

app.get('/', (req: express.Request, res: express.Response) => {
  res.redirect('/car');
});

const PORT = 8080;
app.listen(process.env.PORT || PORT);
