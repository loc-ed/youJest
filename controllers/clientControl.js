const Client = require("../models/client");

module.exports = class ClientService{

    static async getAllClients(req,res){
        try {
            const allClients = await Client.find();
            if (!allClients) {
                res.status(404).json("There are no clients in the database!")
            }
            res.json(allClients)
        } catch (error) {
            res.status(500).json("Unable to access client list")
        }
    }

    static async createClient(req,res){   
        try {
            let count = await Client.countDocuments() + 1
            let clientNumber = count.toString()
            let pad = '000'
            console.log(count)
            let data = req.body 
            const newClient = {
                name: data.name,
                client_code: data.name.substring(0,3) + (pad + clientNumber).slice(-pad.length),
            }
            const response = await new Client(newClient).save();
            res.json(response);
        } catch (error) {
            res.status(500).json(`Unable to add new client to DB`);
        } 
    }

    static async getClient(req,res){
        try {
            let clientName = req.body.name
            const singleClient = await Client.where("name").equals(clientName).select("client_code")
            res.json(singleClient);

        } catch (error) {
            res.status(500).json('Unable to verify client name')
        }
    }

    //Have to be able to  link and remove contacts to the client 
    //TD : add a selector to determine whether adding / removing (right now it just adds)
    static async updateClient(req,res){
        try {
            let clientID = req.body._id
            let contactList = req.body.contacts
            //if (action = 'add')
            const updatedClient =  await Client.findOneAndUpdate({_id : clientID},{$push : {contacts : contactList}});
            //if (action = 'remove')
            //const updatedClient =  await Client.findOneAndUpdate({_id : clientID},{$pull : {contacts : contactsList}});
            if (updatedClient.modifiedCount === 0) {
                throw new Error("Unable to update contact list");
            }
            res.json(updatedClient)
        } catch (error) {
            res.status(500).json('Unable to update client contacts');
        }
    }

    static async deleteClient(req,res){
        try {
            const clientName = req.body.name
            const deletedResponse = await Client.findOneAndDelete(clientName);
            res.json(deletedResponse);
        } catch (error) {
            res.status(500).json('Unable to delete client entry')
        }

    }
}