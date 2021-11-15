import IRentalRepository from '../interface/IRentalRepository';
import {dbToEntity} from '../../mapper/mapper';
import AbstractClientRepository from '../abstractRepository/abstractRepository';
import NoResultsError from '../error/noResultsError';
import Rental from '../../entity/rental';
import RentalModel from '../../model/rentalModel';
import {CarModel} from '../../../car/module';
import {ClientModel} from '../../../client/module';
import {QueryTypes, Op} from 'sequelize';

export default class ClientRepository
  extends AbstractClientRepository
  implements IRentalRepository {
  constructor(
    public rentalModel: typeof RentalModel,
    public clientModel: typeof ClientModel,
    public carModel: typeof CarModel
  ) {
    super();
  }

  async saveNewRental(newRental: Rental): Promise<Rental> {
    const buildOptions = {isNewRecord: true};
    let saveRental;
    saveRental = await this.rentalModel.build(newRental, buildOptions);
    saveRental.setDataValue('status', 'active');

    saveRental = await saveRental.save();
    const {id} = saveRental;
    return this.getById(id);
  }

  async saveEditedRental(editedRental: Rental): Promise<Rental> {
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

  async getById(id: number): Promise<Rental> {
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

  async getAll(): Promise<Rental[]> {
    const rentals = await this.rentalModel.findAll({
      order: [['id', 'DESC']],
      include: [
        {model: this.carModel, paranoid: false},
        {model: this.clientModel, paranoid: false}
      ]
    });
    if (!rentals) {
      throw new NoResultsError();
    }
    return rentals.map((rental: typeof RentalModel) => dbToEntity(rental));
  }

  async finish(rental: Rental): Promise<boolean> {
    const setInactive = await this.rentalModel.findByPk(rental.id);

    if (!setInactive) {
      throw new NoResultsError();
    }
    setInactive.destroy();

    return true;
  }
  async findCarRentalsBetweenDates(rental: Rental): Promise<Rental[] | []> {
    const {date_from, date_until, fk_car, id} = rental;
    const toCompare = await this.rentalModel.sequelize.query(
      `SELECT date_from, date_until, id, fk_car FROM "Rents" WHERE 
      fk_car = ${fk_car} AND 
      (('${date_from}' >= date_from AND '${date_from}' <= date_until) OR 
      ('${date_until}' >= date_from AND '${date_until}' <= date_until) OR 
      ('${date_from}' <= date_from AND '${date_until}' >= date_until)) 
      AND (status = 'active') AND (id::varchar <> '${id}'::varchar) 
      `,
      {type: QueryTypes.SELECT, model: this.rentalModel}
    );
    const mappedList = await toCompare.map((result: typeof RentalModel) => dbToEntity(result));
    return mappedList;
  }
}
