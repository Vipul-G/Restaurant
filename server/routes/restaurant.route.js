const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurant.controller');
const extractFile = require('../middlewares/file');

// http://localhost:3000/api/restaurant

router.post('', extractFile, restaurantController.createRestaurant);

router.get('', restaurantController.getRestaurants);
module.exports = router;

router.put('/:id', extractFile, restaurantController.updateRestaurantById);

router.delete('/:id', restaurantController.deleteImageById);
