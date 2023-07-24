const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const contactSchema = Schema({

    // _id: mongoose.Schema.Types.ObjectId,

    firstname:{
        type: String,
        required: true,
    },

    surname:{
        type: String,
        required: true,
    },

    email:{
        type: String,
        minLength: 10,
        required: true,
        lowercase: true,
        unique : true,
    },

    // no_linked_contacts: {
    //     type: Number,
    //     required: true,
    //     default: 0,
    // },

    clients: {
        type: Array,
    }

});


module.exports = Contact = mongoose.model("contact", contactSchema);