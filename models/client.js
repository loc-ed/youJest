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
});

module.exports = Client = mongoose.model("client", clientSchema);