const express = require("express");
const router = express.Router();
const MenuItem = require("../models/MenuItem");
// SEARCH menu items
router.get("/search", async (req, res) => {
  try {
    const query = req.query.q;
    if (!query) {
      return res.json([]);
    }
    const items = await MenuItem.find({
      $text: { $search: query }
    });
    res.json(items);
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const menuItems = await MenuItem.find();
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.post("/", async (req, res) => {
  try {
    const menuItem = new MenuItem(req.body);
    const savedItem = await menuItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
//TOGGLE availability
router.patch("/:id/availability", async (req, res) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id);
    if (!menuItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }
    menuItem.isAvailable = !menuItem.isAvailable;
    await menuItem.save();
    res.json(menuItem);
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
