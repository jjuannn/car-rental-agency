const {dbToEntity} = require('../../mapper/mapper');
const AbstractClientRepository = require('../abstractRepository/abstractRepository');
const NoResultsError = require('../error/noResultsError');
const {Rental} = require('../../entity/rental');

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
  async findCarBookingsBetweenDates(rentId, car, dateToCompareFrom, dateToCompareUntil) {
    const toCompare = await this.rentalModel.findAll({
      where: {fk_car: car},
      attributes: ['fk_car', 'date_from', 'date_until'],
      exclude: {where: {rentId}}
    });
    const parsedList = toCompare.map(rent => dbToEntity(rent));
    let container = [];
    parsedList.forEach(rent => {
      let dateToCheckFrom = new Date(dateToCompareFrom);
      let dateToCheckUntil = new Date(dateToCompareUntil);
      let dateFrom = new Date(rent.date_from);
      let dateUntil = new Date(rent.date_until);

      if (
        (dateToCheckFrom >= dateFrom && dateToCheckFrom <= dateUntil) ||
        (dateToCheckUntil >= dateFrom && dateToCheckUntil <= dateUntil) ||
        (dateToCheckFrom <= dateFrom && dateToCheckUntil >= dateUntil)
      ) {
        container.push(rent);
      }
      return container;
    });
    if (container.length > 0) {
      throw new Error('This car is already rented during the dates entered!');
    } else {
      return {success: true};
    }
  }
};
