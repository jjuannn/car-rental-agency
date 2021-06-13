const AbstractRentalController = require('./abstractController/abstractController');
const {formToEntity} = require('../mapper/mapper');
const UndefinedIdError = require('./error/undefinedId');
const rental = require('../entity/rental');

module.exports = class RentalController extends AbstractRentalController {
  /**
   *
   * @param {import("../service/rentalService")} rentalService
   */
  constructor(rentalService, carController, clientController) {
    super();
    this.rentalService = rentalService;
    this.carController = carController;
    this.clientController = clientController;
    this.ROUTE_BASE = '/rental';
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
    app.post(`${ROUTE_BASE}/new`, this.saveNewRental.bind(this));

    app.get(`${ROUTE_BASE}/edit?:id`, this.renderEditPage.bind(this));
    app.post(`${ROUTE_BASE}/edit?:id`, this.saveEditedRental.bind(this));

    app.get(`${ROUTE_BASE}/view?:id`, this.renderViewPage.bind(this));

    app.get(`${ROUTE_BASE}/delete?:id`, this.finish.bind(this));
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
      const rental = await this.rentalService.getById(id);
      const cars = await this.carController.getAll();
      const clients = await this.clientController.getAll();
      res.render('rental/edit.html', {data: {rental, cars, clients}});
    } catch (e) {
      req.session.errors = [e.message];
      res.redirect('/rental');
    }
  }
  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  async renderList(req, res) {
    const {errors, messages} = req.session;
    try {
      const rentals = await this.rentalService.getAll();
      res.render('list/rental/main-page.html', {
        data: {rentals, errors, messages}
      });
    } catch (e) {
      req.session.errors = [e.message];
      res.redirect('/rental');
    }
    req.session.errors = [];
    req.session.messages = [];
  }
  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  async renderAddPage(req, res) {
    const cars = await this.carController.getAll();
    const clients = await this.clientController.getAll();
    if (cars.length === 0 || clients.length === 0) {
      req.session.errors = [
        'Check the client or car list! One of them is empty'
      ];
      res.redirect('/rental');
    } else {
      res.render('rental/add.html', {data: {cars, clients}});
    }
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
      const rental = await this.rentalService.getById(id);
      res.render('rental/view.html', {data: {rental}});
    } catch (e) {
      req.session.errors = [e.message];
      res.redirect('/rental');
    }
  }

  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  async saveNewRental(req, res) {
    const rental = formToEntity(req.body);
    try {
      await this.rentalService.saveNewRental(rental);
      req.session.messages = [`The Rental has been created successfully`];
    } catch (e) {
      req.session.errors = [e.message];
    }
    res.redirect('/rental');
  }
  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  async saveEditedRental(req, res) {
    const rental = formToEntity(req.body);
    try {
      await this.rentalService.saveEditedRental(rental);
      req.session.messages = [`The Rental has been edited successfully`];
    } catch (e) {
      req.session.errors = [e.message];
    }
    res.redirect('/rental');
  }
  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  async finish(req, res) {
    if (!req.query.id) {
      throw new UndefinedIdError();
    }
    try {
      const id = Number(req.query.id);
      const rentalToDelete = await this.rentalService.getById(id);
      await this.rentalService.finish(rentalToDelete);
      req.session.messages = [
        `The rental with ID ${id} has been deleted successfully`
      ];
    } catch (e) {
      req.session.errors = [e.message];
    }
    res.redirect('/rental');
  }
  async getAll() {
    return this.rentalService.getAll();
  }
};
