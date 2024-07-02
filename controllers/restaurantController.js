const Restaurant = require("../models/Restaurant");

exports.getRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (err) {
    console.error(`Error fetching restaurants: ${err.message}`);
    console.error(err.stack);
    res.status(500).send("Server error");
  }
};

exports.addRestaurant = async (req, res) => {
  const { name, location, rating } = req.body;
  try {
    const newRestaurant = new Restaurant({ name, location, rating });
    const restaurant = await newRestaurant.save();
    res.json(restaurant);
  } catch (err) {
    console.error(`Error adding restaurant: ${err.message}`);
    console.error(err.stack);
    res.status(500).send("Server error");
  }
};

exports.updateRestaurant = async (req, res) => {
  const { id } = req.params;
  const { name, location, rating } = req.body;
  try {
    let restaurant = await Restaurant.findById(id);
    if (!restaurant)
      return res.status(404).json({ msg: "Restaurant not found" });

    restaurant.name = name || restaurant.name;
    restaurant.location = location || restaurant.location;
    restaurant.rating = rating || restaurant.rating;

    await restaurant.save();
    res.json(restaurant);
  } catch (err) {
    console.error(`Error updating restaurant: ${err.message}`);
    console.error(err.stack);
    res.status(500).send("Server error");
  }
};

exports.deleteRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ msg: "Restaurant not found" });
    }
    await restaurant.remove();
    res.json({ msg: "Restaurant removed" });
  } catch (err) {
    console.error(`Error deleting restaurant: ${err.message}`);
    console.error(err.stack);
    res.status(500).send("Server error");
  }
};
