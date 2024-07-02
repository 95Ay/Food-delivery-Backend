const Comment = require("../models/Comment");
const Order = require("../models/Order");

exports.addComment = async (req, res) => {
  const { orderId, text } = req.body;

  try {
    const comment = new Comment({
      user: req.user.id,
      order: orderId,
      text,
    });

    await comment.save();

    await Order.findByIdAndUpdate(orderId, { $push: { comments: comment.id } });

    res.json(comment);
  } catch (err) {
    console.error(`Add comment error: ${err.message}`);
    res.status(500).send("Server error");
  }
};

exports.getOrderComments = async (req, res) => {
  try {
    const comments = await Comment.find({ order: req.params.orderId }).populate(
      "user",
      "name"
    );
    res.json(comments);
  } catch (err) {
    console.error(`Get comments error: ${err.message}`);
    res.status(500).send("Server error");
  }
};
