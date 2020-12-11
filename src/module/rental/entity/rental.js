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
}
module.exports = { Rental }