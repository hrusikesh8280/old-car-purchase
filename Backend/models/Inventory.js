const mongoose = require('mongoose');
const oemSpecsModel = require('./OemSpecs')
const UserModel=require('./User')


const inventorySchema = new mongoose.Schema({
  carModel: String,
  odometerKMs: Number,
  majorScratches: Boolean,
  originalPaint: Boolean,
  accidentsReported: Number,
  previousBuyers: Number,
  registrationPlace: String,
  image: String,
  des:Array,
  oemId: { type: mongoose.Schema.Types.ObjectId, ref: oemSpecsModel },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: UserModel },
});

const InventoryModel = mongoose.model('Inventory', inventorySchema);

module.exports = InventoryModel;