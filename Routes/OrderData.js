const express = require("express");
const router = express.Router();
const Order = require("../models/Orders");

router.post("/orderData", async (req, res) => {
  try {
    const { order_data, order_date, email } = req.body;

    // Validate input
    if (!email || !order_data || !order_date) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    order_data.splice(0, 0, { Order_date: order_date });

    const existingOrder = await Order.findOne({ email });

    if (!existingOrder) {
      await Order.create({
        email,
        order_data: [order_data],
      });
    } else {
      await Order.findOneAndUpdate(
        { email },
        { $push: { order_data: order_data } }
      );
    }

    res.json({ success: true });
  } catch (error) {
    console.error("Order creation failed:", error.message);
    res.status(500).json({ error: error.message });
  }
});

router.post("/myOrderData", async (req, res) => {
  try {
    const myData = await Order.findOne({ email: req.body.email });
    res.json({ orderData: myData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
