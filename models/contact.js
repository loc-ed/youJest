const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contactSchema = Schema({

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

    clients: {
        type: Array,
    }

});

module.exports = Contact = mongoose.model("contact", contactSchema);