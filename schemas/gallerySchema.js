const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gallerySchema = new Schema(
    {image: String},
    {collection: 'gallery'});

const gallery = mongoose.model("gallery", gallerySchema);

module.exports = gallery;