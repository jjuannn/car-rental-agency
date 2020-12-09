const { Client } = require("../entity/client")
const InvalidIdError  = require("./error/invalidId")
const InvalidClientError = require("./error/invalidClient")

module.exports = class Service{
    /**
     * @param {import ("../repository/abstractRepository/abstractRepository")} clientRepository
    */
    constructor(clientRepository){
        this.clientRepository = clientRepository
    }
    /**
    * @param { client } client 
    */
    async saveNewClient(client){
        if(!(client instanceof Client) || client === undefined){
            throw new InvalidClientError()
        }
        return this.clientRepository.saveNewClient(client)
    }
    /**
     * @param { client } client
     */
    async saveEditedClient(client){
        if(!(client instanceof Client) || client === undefined){
            throw new InvalidClientError()
        }
        return this.clientRepository.saveEditedClient(client)
    }
    /**
     * @param {Number} id
     */
    async getById(id){
        if(typeof id !== "number" || id === undefined){
            throw new InvalidIdError()
        }
        return this.clientRepository.getById(id)
    }
    /**
     * @param {Number} id
     */
    async delete(id){
        if(typeof id !== "number" || id === undefined){
            throw new InvalidIdError()
        }
        return this.clientRepository.delete(id)
    }
    async getAll(){
        return this.clientRepository.getAll()
    }
}