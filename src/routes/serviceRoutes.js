const express = require('express');
const Service = require('../models/Service');
const router = express.Router();

// Add a new service
router.post('/services', async (req, res) => {
  const { name, description, price } = req.body;

  // Check for required fields
  if (!name || !price) {
    return res.status(400).json({ message: 'Name and price are required' });
  }

  try {
    const newService = new Service({ name, description, price });
    await newService.save();
    res.status(201).json(newService); // Return the newly created service
  } catch (error) {
    res.status(400).json({ message: 'Error adding service', error });
  }
});

// Get all services
router.get('/services', async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json(services); // Return all services as a JSON response
  } catch (error) {
    res.status(400).json({ message: 'Error fetching services', error });
  }
});

// Other routes like update and delete could go here...

module.exports = router;
