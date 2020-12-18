const {dbToEntity} = require('../../mapper/mapper');
const AbstractClientRepository = require('../abstractRepository/abstractRepository');
const NoResultsError = require('../error/noResultsError');
const {Rental} = require('../../entity/rental');
const {QueryTypes, Op} = require('sequelize');
module.exports = class ClientRepository extends AbstractClientRepository {
  constructor(rentalModel, clientModel, carModel) {
    super();
    this.rentalModel = rentalModel;
    this.clientModel = clientModel;
    this.carModel = carModel;
  }

  /**
   * @param { Rental } newRental
   */
  async saveNewRental(newRental) {
    const buildOptions = {isNewRecord: true};

    let saveRental;
    saveRental = await this.rentalModel.build(newRental, buildOptions);
    saveRental.setDataValue('status', 'active');

    saveRental = await saveRental.save();
    const {id} = saveRental;
    return this.getById(id);
  }
  /**
   *
   * @param {Rental} editedRental
   */
  async saveEditedRental(editedRental) {
    const newValues = ({
      date_from: editedRental.date_from,
      date_until: editedRental.date_until,
      price_per_day: editedRental.price_per_day,
      total_price: editedRental.total_price,
      payment_method: editedRental.payment_method,
      is_paid: editedRental.is_paid,
      status: editedRental.status,
      fk_car: editedRental.fk_car,
      fk_client: editedRental.fk_client
    } = editedRental);

    const currentRentalId = editedRental.id;
    const buildOptions = {isNewRecord: false, where: {id: currentRentalId}};
    await this.rentalModel.update(newValues, buildOptions);

    return this.getById(currentRentalId);
  }
  /**
   *
   * @param {Number} id
   */
  async getById(id) {
    const rental = await this.rentalModel.findOne({
      where: {id},
      include: [
        {model: this.carModel, paranoid: false},
        {model: this.clientModel, paranoid: false}
      ]
    });
    if (!rental) {
      throw new NoResultsError();
    }
    return dbToEntity(rental);
  }
  async getAll() {
    const rentals = await this.rentalModel.findAll({
      include: [
        {model: this.carModel, paranoid: false},
        {model: this.clientModel, paranoid: false}
      ]
    });
    if (!rentals) {
      throw new NoResultsError();
    }
    return rentals.map(rental => dbToEntity(rental));
  }
  /**
   * @param {Number} id
   */
  async finish(rental) {
    const setInactive = await this.rentalModel.findByPk(rental.id);

    if (!setInactive) {
      throw new NoResultsError();
    }
    setInactive.destroy();

    return true;
  }
  async findCarRentalsBetweenDates(rental) {
    const {date_from, date_until, fk_car, id} = rental;
    const toCompare = await this.rentalModel.sequelize.query(
      `SELECT date_from, date_until, id, fk_car FROM Rents WHERE
      (fk_car = "${fk_car}") AND
      (("${date_from}" >= date_from AND "${date_from}" <= date_until) OR
      ("${date_until}" >= date_from AND "${date_until}" <= date_until) OR
      ("${date_from}" <= date_from AND "${date_until}" >= date_until)) AND
      (status = "active") AND (id <> "${id}")
      `,
      {type: QueryTypes.SELECT, model: this.rentalModel}
    );
    const mappedList = await toCompare.map(result => dbToEntity(result));
    return mappedList;
  }
};
