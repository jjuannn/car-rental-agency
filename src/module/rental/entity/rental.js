class Rental{
    constructor({
        id, fk_car, fk_client, price_per_day, date_from, date_until, total_price, payment_method, is_paid, Car, Client
    }){
        this.id = id 
        this.fk_car = fk_car
        this.fk_client = fk_client,
        this.price_per_day = price_per_day
        this.date_from = date_from
        this.date_until = date_until
        this.payment_method = payment_method,
        this.total_price = total_price
        this.is_paid = is_paid
        this.Car = Car
        this.Client = Client
    }
    /**
     * 
     * @param {String} date1 // String => date 
     * @param {String} date2 // String => date
     */
    getTotalDays(date1, date2){
        let from = new Date(date1)
        let until = new Date(date2)

        let differenceInTime =  until.getTime()- from.getTime()
        let differenceInDays = differenceInTime / (1000 * 3600 * 24)

        this.total_price = differenceInDays * Number(this.price_per_day)
    }
}
module.exports = { Rental }