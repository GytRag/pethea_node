const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const petSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    dob: {
        type: String,
        required: true
    },
    client_email: {
        type: String,
        required: true
    }

});

const pet = mongoose.model("pets", petSchema);

module.exports = pet;