const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  state: { type: String, required: true},
  city: { type: String, required: true}
}, {_id: false});
const restaurantSchema = new mongoose.Schema({
  name: { type: String, require: true },
  imagePath: { type: String, required: true },
  address: { type: addressSchema, required: true}
});

module.exports = mongoose.model('Restaurant', restaurantSchema);
