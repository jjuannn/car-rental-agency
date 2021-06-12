require('dotenv').config({path: '/.env'});
import express from 'express';
import {Sequelize} from 'sequelize/types';

const app = express();
const path = require('path');

app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(express.json());
app.use(express.static(`${__dirname}/styles`));
app.use(express.static(`${__dirname}/module/car`));
app.use(express.static('api'));

const nunjucks = require('nunjucks');

nunjucks.configure('views', {
  autoescape: true,
  express: app
});

const configureDI = require('./config/di');
const container = configureDI.configureContainer();

const {initCarModule} = require('./module/car/module');
const {initClientModule} = require('./module/client/module');
const {initRentalModule} = require('./module/rental/module');

initCarModule(app, container);
initClientModule(app, container);
initRentalModule(app, container);

const mainDb: Sequelize = container.get('Sequelize');
mainDb.sync();

app.get('/', (req: express.Request, res: express.Response): void => {
  res.redirect('/car');
});

const PORT: number = 8080;
app.listen(process.env.PORT || PORT);
