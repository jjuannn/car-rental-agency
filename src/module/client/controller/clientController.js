const AbstractClientController = require('../controller/abstractController/abstractController');
const {formToEntity} = require('../mapper/mapper');
const UndefinedIdError = require('./error/undefinedId');

module.exports = class ClientController extends AbstractClientController {
  /**
   *
   * @param {import("../service/clientService")} clientService
   */
  constructor(clientService) {
    super();
    this.clientService = clientService;
    this.ROUTE_BASE = '/client';
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
    app.post(`${ROUTE_BASE}/new`, this.saveNewClient.bind(this));

    app.get(`${ROUTE_BASE}/edit?:id`, this.renderEditPage.bind(this));
    app.post(`${ROUTE_BASE}/edit?:id`, this.saveEditedClient.bind(this));

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
      const client = await this.clientService.getById(id);
      res.render('client/edit.html', {data: {client}});
    } catch (e) {
      req.session.errors = [e.message];
      res.redirect('/client');
    }
  }
  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  async renderList(req, res) {
    const {errors, messages} = req.session;
    try {
      const clients = await this.clientService.getAll();
      res.render('list/client/main-page.html', {
        data: {clients, errors, messages}
      });
    } catch (e) {
      req.session.errors = [e.message];
      res.redirect('/client');
    }
    req.session.errors = [];
    req.session.messages = [];
  }
  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  async renderAddPage(req, res) {
    res.render('client/add.html');
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
      const client = await this.clientService.getById(id);
      res.render('client/view.html', {data: {client}});
    } catch (e) {
      req.session.errors = [e.message];
      res.redirect('/client');
    }
  }

  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  async saveNewClient(req, res) {
    const client = formToEntity(req.body);
    console.log(client);
    try {
      await this.clientService.saveNewClient(client);
      req.session.messages = [
        `The client ${client.name} ${client.surname} has been created successfully`
      ];
    } catch (e) {
      req.session.errors = [e.message];
    }
    res.redirect('/client');
  }
  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  async saveEditedClient(req, res) {
    const client = formToEntity(req.body);
    try {
      await this.clientService.saveEditedClient(client);
      req.session.messages = [
        `The client ${client.name} ${client.surname} has been edited successfully`
      ];
    } catch (e) {
      req.session.errors = [e.message];
    }
    res.redirect('/client');
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
      await this.clientService.delete(id);
      req.session.messages = [
        `The client with ID ${id} has been deleted successfully`
      ];
    } catch (e) {
      req.session.errors = [e.message];
    }
    res.redirect('/client');
  }
  async getAll() {
    return this.clientService.getAll();
  }
};
