const express = require('express');
const restaurantRoutes = require('./restaurant.route');

const router = express.Router();

// localhost:3000/api/auth
router.use('/restaurant', restaurantRoutes);

module.exports = router;
