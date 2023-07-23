const Client = require("../models/client");
// const mongoose = require('mongoose');

module.exports = class ClientService{

    static async getAllClients(req,res,next){
        try {
            const allClients = await Client.find();
            if (!allClients) {
                res.status(404).json("There are no clients in the database!")
            }
            res.json(allClients)
        } catch (error) {
            res.status(500).json({error: error})
        }
    }

    static async createClient(req,res,next){
        try {

            
            let data = req.body || {}
            const newClient = {
                name: data.name,
                //i'll have to change this to be more dynamic . it should count the clients
                //and use the next number
                client_code: data.name.substring(0,3) + '000',
                clients: data.clients
            }
           const response = await new Client(newClient).save();
           res.json(response);
        } catch (error) {
            res.status(500).json({error: error});
        } 
    }

    static async getClient(req,res,next){
        try {
            let clientName = req.params.name
            const singleClientResponse =  await Client.find({name: clientName});
            res.json(singleClientResponse);
        } catch (error) {
            res.status(500).json({error: error})
        }
    }

    static async updateClient(req,res,next){
        try {
            const update = {}
            update.contacts = req.body.contacts
            const updatedClient =  await Client.updateOne({update});
            if (updatedClient.modifiedCount === 0) {
                throw new Error("Unable to update contact list");
            }
            res.json(updatedClient)
        } catch (error) {
            res.status(500).json({error: error});
        }
    }

    static async deleteClient(req,res,next){
        try {
            const clientName = req.params.name
            const deletedResponse = await Client.findOneAndDelete(clientName);
            res.json(deletedResponse);
        } catch (error) {
            res.status(500).json({error: error})
        }

    }
}