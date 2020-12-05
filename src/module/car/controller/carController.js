const AbstractCarController = require("../controller/abstractController/abstractController")
const { formToEntity } = require("../mapper/mapper")
const { prepareStackTrace } = require("./error/abstractControllerError")

module.exports = class CarController extends AbstractCarController{
    /**
     * 
     * @param {import("../repository/sqlite/carRepository")} carRepository 
     */
    constructor(uploadMiddleware, carRepository){
        super()
        this.uploadMiddleware = uploadMiddleware
        this.carRepository = carRepository
        this.ROUTE_BASE = "/car"
    }
    /**
     * 
     * @param {import("express").Application} app 
     */
    configureRoutes(app){
        const ROUTE_BASE = this.ROUTE_BASE


        app.get(`${ROUTE_BASE}`, this.renderList.bind(this))
        app.get(`${ROUTE_BASE}/all`, this.renderList.bind(this))

        app.get(`${ROUTE_BASE}/new`, this.renderAddPage.bind(this))
        app.post(`${ROUTE_BASE}/new`, this.uploadMiddleware.single("car_image"), this.saveNewCar.bind(this))

        app.get(`${ROUTE_BASE}/edit?:id`, this.renderEditPage.bind(this))
        app.post(`${ROUTE_BASE}/edit?:id`, this.uploadMiddleware.single("car_image"), this.saveEditedCar.bind(this))

        app.get(`${ROUTE_BASE}/view?:id`, this.renderViewPage.bind(this))

        app.get(`${ROUTE_BASE}/delete?:id`, this.delete.bind(this))
    }
    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    async renderEditPage(req, res){
        const { id } = req.query
        const car = await this.carRepository.getById(id)
        res.render("edit.html", { data: { car }})
    }
    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    async renderList(req, res){
        const cars = await this.carRepository.getAll()
        res.render("car/main-page.html", { data: { cars }})
    }
    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    async renderAddPage(req, res){
        res.render('add.html')
    }
    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */ 
    async saveNewCar(req, res){
        const car = formToEntity(req.body)
        if(req.file){
            car.images = `/uploads/${req.file.filename}`
        }
        await this.carRepository.saveNewCar(car)
        
        res.redirect("/car")
    }
    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */ 
    async renderViewPage(req, res){
        const { id } = req.query
        const car = await this.carRepository.getById(id)
        
        res.render("view.html", { data: { car }})
    }
    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */ 
    async saveEditedCar(req, res){
        const car = formToEntity(req.body)
        await this.carRepository.saveEditedCar(car)

        res.redirect("/car")
    }
    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */ 
    async delete(req, res){
        const { id } = req.query
        await this.carRepository.delete(id)

        res.redirect("/car")
    }
    
    async getAll(){
        const carList = await this.carRepository.getAll()
        return carList
    }
}