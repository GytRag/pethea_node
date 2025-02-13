const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const medsSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }


});

const meds = mongoose.model("meds", medsSchema);

module.exports = meds;