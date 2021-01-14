const mongoose = require('mongoose');

const PlantsSchema = mongoose.Schema({
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

module.exports = {
    PlantsSchema
}