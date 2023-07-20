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
    const { listPrice, color, mileage, userId } = req.query;
    try {
      let query = {};
      if (userId) {
        query.userId = userId;
      }
      let inventory = await InventoryModel.find(query).populate('oemId');
      if (listPrice) {
        const priceRegex = new RegExp(listPrice);
        inventory = inventory.filter(item => priceRegex.test(item.oemId.listPrice));
      }
      if (color) {
        inventory = inventory.filter(item => item.oemId.colors.includes(color));
      }
      if (mileage) {
        const mileageRegex = new RegExp(mileage);
        inventory = inventory.filter(item => mileageRegex.test(item.oemId.mileage));
      }
      res.status(200).json({ data: inventory });
    } catch (error) {
      console.log(error);
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


inventoryRouter.patch('/:id', async (req, res) => {
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
