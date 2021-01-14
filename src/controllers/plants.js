
const mongoose = require('mongoose');
const connectToDatabase = require('../db.js');

const { PlantsSchema } = require('../schemas/plants.js');


let conn = null;

const getPlants = async (req, res) => {
    try {
        if (conn == null) {
            conn = await connectToDatabase(req, res);
            conn.model('plants', PlantsSchema);
        }
        const Model = conn.model('plants');
        const doc = await Model.find();
        console.log('doc', doc);

        res.status(200).json(doc);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const createPlant = async (req, res) => {
    // #TODO ADD BODY VALIDATION HERE 
    const { name, rarity, type, water, sun, price } = req.body;
    try {
        if (conn == null) {
            conn = await connectToDatabase(req, res);
            conn.model('plants', PlantsSchema);
        }
        const Model = conn.model('plants');
        const newPlant = new Model({ name, rarity, type, water, sun, price });
        await newPlant.save();
        res.status(201).json(newPlant);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

const getPlant = async (req, res) => {
    res.status(200).json('getPlant');
}
const updatePlant = async (req, res) => {
    res.status(200).json('updatePlant');
}

const deletePlant = async (req, res) => {
    const { id } = req.params;
    try {
        if (conn == null) {
            conn = await connectToDatabase(req, res);
            conn.model('plants', PlantsSchema);
        }
        const Model = conn.model('plants');
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No plant with id: ${id}`);


        await Model.findByIdAndRemove(id);
        res.json({ message: "Post deleted successfully." });

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = {
    getPlants: getPlants,
    createPlant: createPlant,
    getPlant: getPlant,
    updatePlant: updatePlant,
    deletePlant: deletePlant,
}