const express = require('express');

const { getPlants, createPlant, getPlant, updatePlant, deletePlant} = require('../controllers/plants.js');

const router = express.Router();

router.get('/', getPlants);
router.post('/', createPlant);
router.get('/:id', getPlant);
router.patch('/:id', updatePlant);
router.delete('/:id', deletePlant);

module.exports = { routePlants: router };