const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const logsSchema = new Schema({
    date: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    pet_id: {
        type: String,
        required: true
    }

});

const logs = mongoose.model("logs", logsSchema);

module.exports = logs;


// "pet_id": "Lb79f7jH1",
//     "description": "stomach ache",
//     "date": "2024-10-31",
//     "id": "3jJg96c3A"