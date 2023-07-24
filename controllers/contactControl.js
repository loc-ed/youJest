const Contact = require("../models/contact");

module.exports = class ContactService{

    static async getAllContacts(req,res){
        try {
            const allContacts = await Contact.find();
            if (!allContacts) {
                res.status(404).json("There are no contacts in the database!")
            }
            res.json(allContacts)
        } catch (error) {
            res.status(500).json("Unable to access contact list")
        }
    }

    static async createContact(req,res){
        try {
            let data = req.body 
            const newContact = {
                firstname: data.firstname,
                surname: data.surname,
                email: data.email,
            }
           const response = await new Contact(newContact).save();
           res.json(response);
        } catch (error) {
            res.status(500).json(`Unable to add new contact to DB`);
        } 
    }

    static async getContact(req,res){
        try {
            let emailAddress = req.body.email
            const singleContactResponse =  await Contact.find({email: emailAddress});
            res.json(singleContactResponse);
        } catch (error) {
            res.status(500).json({error: error})
        }
    }

    static async updateContact(req,res){
        try {
            let contactID = req.body._id
            let clientList = req.body.clients
            // if action == link
            const updatedContact =  await Contact.findOneAndUpdate({_id : contactID},{$push : {clients : clientList}});
            //if action ==unlink
            //const updatedContact =  await Contact.findOneAndUpdate({_id : contactID},{$pull : {clients : clientList}});
            
            if (updatedContact.modifiedCount === 0) {
                throw new Error("Unable to update client list");
            }
            res.json(updatedContact)
        } catch (error) {
            res.status(500).json(`Unable to update contact`);
        }
    }

    static async deleteContact(req,res){
        try {
            const emailAddress = req.params.email
            const deletedResponse = await Contact.findOneAndDelete(emailAddress);
            res.json(deletedResponse);
        } catch (error) {
            res.status(500).json({error: error})
        }

    }
}