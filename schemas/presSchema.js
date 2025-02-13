
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const presSchema = new Schema({
    medication_id: {
        type: String,
        required: true
    },
    pet_id: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    }

});

const pres = mongoose.model("pres", presSchema);

module.exports = pres;

// "medication_id": "RF03WqLvM",
//     "pet_id": "Lb79f7jH1",
//     "description": "ibuprofen",
//     "id": "Qe5cL3EcQ",
//     "date": "2024-10-31"