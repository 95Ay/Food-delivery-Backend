const mongoose = require("mongoose");

const RestaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  rating: { type: Number, required: true },
  menu: [{ type: mongoose.Schema.Types.ObjectId, ref: "Food" }],
});

module.exports = mongoose.model("Restaurant", RestaurantSchema);
