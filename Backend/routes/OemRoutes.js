const express = require('express');
const oemSpecsModel = require('../models/OemSpecs');



const oemSpecsRouter = express.Router();


oemSpecsRouter.get('/count', async (req, res) => {
  try {
    const count = await oemSpecsModel.countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ msg: 'Internal Server Error' });
  }
});


oemSpecsRouter.get('/search', async (req, res) => {
  const { model, year } = req.query;

  try {
    const oemSpecs = await oemSpecsModel.findOne({ model, year });
    if (!oemSpecs) {
      res.status(404).json({ msg: 'OEM specs not found' });
    } else {
      res.status(200).json({ data: oemSpecs });
    }
  } catch (error) {
    res.status(500).json({ msg: 'Internal Server Error' });
  }
});


oemSpecsRouter.post('/add', async (req, res) => {
    const { model, year, listPrice, colors, mileage, power, maxSpeed } = req.body;
  
    try {
      const newSpecs = new oemSpecsModel({
        model,
        year,
        listPrice,
        colors,
        mileage,
        power,
        maxSpeed,
      });
  
      await newSpecs.save();
      res.status(201).json({ msg: 'OEM specs added successfully', newSpecs });
    } catch (error) {
      res.status(500).json({ msg: 'Internal Server Error' });
    }
  });
  
  module.exports = oemSpecsRouter;
