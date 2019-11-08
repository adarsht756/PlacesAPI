const mongoose = require('mongoose');

const PlaceSchema = mongoose.Schema({
    name: String,
    place_id: Number
}, {
    timestamps: true
});

module.exports = mongoose.model('Place', PlaceSchema);