const express = require('express');
const InventoryModel = require('../models/Inventory');
const inventoryRouter = express.Router();



inventoryRouter.post('/add', async (req, res) => {
  try {
    const {
      carModel,
      odometerKMs,
      majorScratches,
      originalPaint,
      accidentsReported,
      previousBuyers,
      registrationPlace,
      image,
      des,
      oemId,
      userId,
    } = req.body;

    const newInventory = new InventoryModel({
      carModel,
      odometerKMs,
      majorScratches,
      originalPaint,
      accidentsReported,
      previousBuyers,
      registrationPlace,
      image,
      des,
      oemId,
      userId,
    });

    await newInventory.save();
    res.status(201).json({ msg: 'Inventory created successfully', newInventory });
  } catch (error) {
    res.status(500).json({ msg: 'Internal Server Error' });
  }
});


inventoryRouter.get('/', async (req, res) => {
    const { price, colors, mileage } = req.query;
    const { userId } = req.body;
    try {
      let query = { userId };
      if (price) {
        query.price = price;
      }
      if (colors) {
        query['oemId.colors'] = { $in: colors };
      }
      const inventoryQuery = InventoryModel.find(query).populate('oemId');
      if (mileage) {
        const mileageRegex = new RegExp(mileage);
        inventoryQuery.find({ 'oemId.mileage': mileageRegex });
      }
      const inventory = await inventoryQuery.exec();
      res.status(200).json({ data: inventory });
    } catch (error) {
      res.status(500).json({ msg: 'Internal Server Error' });
    }
  });


inventoryRouter.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await InventoryModel.findByIdAndDelete(id);
    res.status(200).json({ msg: 'Inventory entry deleted successfully' });
  } catch (error) {
    res.status(500).json({ msg: 'Internal Server Error' });
  }
});


inventoryRouter.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const {
      carModel,
      odometerKMs,
      majorScratches,
      originalPaint,
      accidentsReported,
      previousBuyers,
      registrationPlace,
      image,
      des,
      oemId,
      userId,
    } = req.body;

    const updatedInventory = await InventoryModel.findByIdAndUpdate(
      id,
      {
        carModel,
        odometerKMs,
        majorScratches,
        originalPaint,
        accidentsReported,
        previousBuyers,
        registrationPlace,
        image,
        des,
        oemId,
        userId,
      },
      { new: true }
    );

    res.status(200).json({ msg: 'Inventory entry updated successfully', updatedInventory });
  } catch (error) {
    res.status(500).json({ msg: 'Internal Server Error' });
  }
});

module.exports = inventoryRouter;
