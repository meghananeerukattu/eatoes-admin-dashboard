const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
//GET all orders
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().populate("items.menuItem");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//POST create new order
router.post("/", async (req, res) => {
  try {
    const orderData = req.body;
    // simple order number
    orderData.orderNumber = "ORD-" + Date.now();
    const order = new Order(orderData);
    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
//UPDATE order status
router.patch("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    order.status = status;
    await order.save();
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
module.exports = router;
