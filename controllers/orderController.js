const Order = require("../models/Order");

exports.createOrder = async (req, res) => {
  const { items, totalPrice } = req.body;
  try {
    const order = new Order({
      user: req.user.id,
      items,
      totalPrice,
    });
    await order.save();
    res.json(order);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).populate(
      "items.food"
    );
    res.json(orders);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.clearOrders = async (req, res) => {
  try {
    await Order.deleteMany({ user: req.user.id });
    res.json({ msg: "Order history cleared" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("items.food");
    if (!order) {
      return res.status(404).json({ msg: "Order not found" });
    }
    res.json(order);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Order not found" });
    }
    res.status(500).send("Server error");
  }
};
