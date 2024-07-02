const Food = require("../models/Food");

exports.getFoods = async (req, res) => {
  try {
    const foods = await Food.find();
    res.json(foods);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
