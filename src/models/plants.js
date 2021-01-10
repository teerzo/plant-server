
const mongoose = require('mongoose');

const plantSchema = mongoose.Schema({
    name: String,

    rarity: String,
    type: String,
    sun: Number,
    water: Number,
    price: Number,

    // commonNames: [String],
    // tags: [String],
    // image: String,

    // createdAt: {
    //     type: Date,
    //     default: new Date()
    // }
});

const Plants = mongoose.model('plants', plantSchema);

module.exports = { ModelPlant: Plants };