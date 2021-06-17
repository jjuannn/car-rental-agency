const path = require('path');
require('dotenv').config('/.env');

import express from 'express';
import {Sequelize} from 'sequelize/types';
const app = express();

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

const mainDb: Sequelize = container.get('Sequelize');
mainDb.sync();

app.get('/', (req: express.Request, res: express.Response) => {
  res.redirect('/car');
});
console.log('HOLA!');
console.log(process.env.UPLOAD_MULTER_DIR);
console.log(process.env.MAIN_DB_PATH);
const PORT = 8080;
app.listen(process.env.PORT || PORT);
