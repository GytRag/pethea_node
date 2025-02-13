const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const doctorSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    doctor: {
        type: Boolean,
        required: true
    },

});

const doctor = mongoose.model("doctors", doctorSchema);

module.exports = doctor;