
const {ModelPlant} = require('../models/plants.js');
const mongoose = require('mongoose');

const getPlants = async ( req, res) => {

    try {
        const plantModel = await ModelPlant.find();

        // console.log(plantModel);
        
        res.status(200).json(plantModel);
    }
    catch (error) {
        res.status(404).json({ message: error.message});
    }
}

const createPlant = async (req, res) => {

    // #TODO ADD BODY VALIDATION HERE 

    const { name, rarity, type, water, sun, price } = req.body;

    const newPlant = new ModelPlant({ name, rarity, type, water, sun, price });

    try {
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
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    await ModelPlant.findByIdAndRemove(id);
    res.json({ message: "Post deleted successfully." });
}

module.exports = { 
    getPlants: getPlants,
    createPlant: createPlant,
    getPlant: getPlant,
    updatePlant: updatePlant,
    deletePlant: deletePlant,
}