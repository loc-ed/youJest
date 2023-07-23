const Contact = require("../models/contact");
// const mongoose = require('mongoose');

module.exports = class ContactService{

    static async getAllContacts(req,res,next){
        try {
            const allContacts = await Contact.find();
            if (!allContacts) {
                res.status(404).json("There are no contacts in the database!")
            }
            res.json(allContacts)
        } catch (error) {
            res.status(500).json({error: error})
        }
    }

    static async createContact(req,res,next){
        try {
            let data = req.body || {}
            const newContact = {
                firstname: data.firstname,
                surname: data.surname,
                email: data.email,
                clients: data.clients
            }
           const response = await new Contact(newContact).save();
           res.json(response);
        } catch (error) {
            res.status(500).json({error: error});
        } 
    }

    static async getContact(req,res,next){
        try {
            let emailAddress = req.params.email
            const singleContactResponse =  await Contact.find({email: emailAddress});
            res.json(singleContactResponse);
        } catch (error) {
            res.status(500).json({error: error})
        }
    }

    static async updateContact(req,res,next){
        try {
            const update = {}
            update.clients = req.body.clients
            const updatedContact =  await Contact.updateOne({update});
            if (updatedContact.modifiedCount === 0) {
                throw new Error("Unable to update client list");
            }
            res.json(updatedContact)
        } catch (error) {
            res.status(500).json({error: error});
        }
    }

    static async deleteContact(req,res,next){
        try {
            const emailAddress = req.params.email
            const deletedResponse = await Contact.findOneAndDelete(emailAddress);
            res.json(deletedResponse);
        } catch (error) {
            res.status(500).json({error: error})
        }

    }
}