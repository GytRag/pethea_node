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
    image: {
        type: String,
        default: 'https://spaces-cdn.clipsafari.com/qmk6djn2yt56xjuyk04p5plvzxbl'
    },

});

const doctor = mongoose.model("doctors", doctorSchema);

module.exports = doctor;