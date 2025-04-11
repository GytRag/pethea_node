const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    client_email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: 'https://img.freepik.com/free-vector/user-blue-gradient_78370-4692.jpg'
    },
});

const user = mongoose.model("users", userSchema);

module.exports = user;