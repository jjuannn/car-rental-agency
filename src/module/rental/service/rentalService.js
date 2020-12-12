const { Rental } = require("../entity/rental")
const InvalidIdError  = require("./error/invalidId")
const InvalidRentalError = require("./error/invalidRental")

module.exports = class RentalService{
    /**
     * @param {import ("../repository/abstractRepository/abstractRepository")} rentalRepository
    */
    constructor(rentalRepository){
        this.rentalRepository = rentalRepository
    }
    /**
    * @param { Rental } rental 
    */
    async saveNewRental(rental){
        if(!(rental instanceof Rental) || rental === undefined){
            throw new InvalidRentalError()
        }
        await rental.getTotalDays(
            rental.date_from,
            rental.date_until
        )
        return this.rentalRepository.saveNewRental(rental)
    }
    /**
     * @param { Rental } rental
     */
    async saveEditedRental(rental){
        if(!(rental instanceof Rental) || rental === undefined){
            throw new InvalidRentalError()
        }
        await rental.getTotalDays(
            rental.date_from,
            rental.date_until
        )
        return this.rentalRepository.saveEditedRental(rental)
    }
    /**
     * @param {Number} id
     */
    async getById(id){
        if(typeof id !== "number" || id === undefined){
            throw new InvalidIdError()
        }
        return this.rentalRepository.getById(id)
    }
    /**
     * @param {Number} id
     */
    async delete(id){
        if(typeof id !== "number" || id === undefined){
            throw new InvalidIdError()
        }
        return this.rentalRepository.delete(id)
    }
    async getAll(){
        return this.rentalRepository.getAll()
    }
}