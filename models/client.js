const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const clientSchema = Schema({

    name:{
        type: String,
        required: true,
    },

    client_code:{
        type: String,
        required: true,
        unique: true,
    },

    contacts : {
        type: Array
    }

    // no_linked_contacts: {
    //     type: Number,
    //     required: true,
    //     default: 0
    // }

});

module.exports = Client = mongoose.model("Client", clientSchema);