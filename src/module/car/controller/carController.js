const AbstractCarController = require('../controller/abstractController/abstractController');
const {formToEntity} = require('../mapper/mapper');
const UndefinedIdError = require('./error/undefinedId');
module.exports = class CarController extends AbstractCarController {
  /**
   *
   * @param {import("../service/carService")} carService
   */
  constructor(uploadMiddleware, carService) {
    super();
    this.uploadMiddleware = uploadMiddleware;
    this.carService = carService;
    this.ROUTE_BASE = '/car';
  }
  /**
   *
   * @param {import("express").Application} app
   */
  configureRoutes(app) {
    const ROUTE_BASE = this.ROUTE_BASE;

    app.get(`${ROUTE_BASE}`, this.renderList.bind(this));
    app.get(`${ROUTE_BASE}/all`, this.renderList.bind(this));

    app.get(`${ROUTE_BASE}/new`, this.renderAddPage.bind(this));
    app.post(
      `${ROUTE_BASE}/new`,
      this.uploadMiddleware.single('car_image'),
      this.saveNewCar.bind(this)
    );

    app.get(`${ROUTE_BASE}/edit?:id`, this.renderEditPage.bind(this));
    app.post(
      `${ROUTE_BASE}/edit?:id`,
      this.uploadMiddleware.single('car_image'),
      this.saveEditedCar.bind(this)
    );

    app.get(`${ROUTE_BASE}/view?:id`, this.renderViewPage.bind(this));

    app.get(`${ROUTE_BASE}/delete?:id`, this.delete.bind(this));
  }
  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  async renderEditPage(req, res) {
    if (!req.query.id) {
      throw new UndefinedIdError();
    }
    try {
      const id = Number(req.query.id);
      const car = await this.carService.getById(id);
      res.render('car/edit.html', {data: {car}});
    } catch (e) {
      req.session.errors = [e.message];
      res.redirect('/car');
    }
  }
  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  async renderList(req, res) {
    const {errors, messages} = req.session;
    try {
      const cars = await this.carService.getAll();
      res.render('list/car/main-page.html', {data: {cars, errors, messages}});
    } catch (e) {
      req.session.errors = [e.message];
      res.redirect('/car');
    }
    req.session.errors = [];
    req.session.messages = [];
  }
  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  async renderAddPage(req, res) {
    res.render('car/add.html');
  }
  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  async renderViewPage(req, res) {
    if (!req.query.id) {
      throw new UndefinedIdError();
    }
    try {
      const id = Number(req.query.id);
      const car = await this.carService.getById(id);
      res.render('car/view.html', {data: {car}});
    } catch (e) {
      req.session.errors = [e.message];
      res.redirect('/car');
    }
  }

  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  async saveNewCar(req, res) {
    const car = formToEntity(req.body);
    if (req.file) {
      car.images = `/uploads/${req.file.filename}`;
    }
    try {
      await this.carService.saveNewCar(car);
      req.session.messages = [`The car ${car.brand} ${car.model} has been created successfully`];
    } catch (e) {
      req.session.errors = [e.message];
    }
    res.redirect('/car');
  }
  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  async saveEditedCar(req, res) {
    const car = formToEntity(req.body);
    if (req.file) {
      car.images = `/uploads/${req.file.filename}`;
    }
    try {
      await this.carService.saveEditedCar(car);
      req.session.messages = [`The car ${car.brand} ${car.model} has been edited successfully`];
    } catch (e) {
      req.session.errors = [e.message];
    }
    res.redirect('/car');
  }
  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  async delete(req, res) {
    if (!req.query.id) {
      throw new UndefinedIdError();
    }
    try {
      const id = Number(req.query.id);
      await this.carService.delete(id);
      req.session.messages = [`The car with ID ${id} has been deleted successfully`];
    } catch (e) {
      req.session.errors = [e.message];
    }
    res.redirect('/car');
  }
  async getAll() {
    return this.carService.getAll();
  }
};
