const asyncHandler = require('express-async-handler');
const Restaurant = require('../models/restaurant.model');
const fs = require('fs');

module.exports.createRestaurant = asyncHandler(async (req, res, next) => {
  const url = req.protocol + '://' + req.get('host');
  console.log('Req.body', req.body, req.body.address.state);
  const restaurant = new Restaurant({
    name: req.body.name,
    imagePath: url + '/images/' + req.file.filename,
    address: JSON.parse(req.body.address)
  });

  const createdRestaurant = (await restaurant.save()).toObject();

  res.status(201).json({...createdRestaurant});

});

module.exports.getRestaurants = asyncHandler(async (req, res, next) => {
  const restaurants = await Restaurant.find({});
  res.status(200).json({restaurants});
});

module.exports.updateRestaurantById = asyncHandler(async (req, res, next) => {
  const url = req.protocol + '://' + req.get('host');
  const id = req.params.id;
  const newResto = {
    name: req.body.name,
    imagePath: url + '/images/' + req.file.filename,
    address: JSON.parse(req.body.address)
  }
  const oldResto = (await Restaurant.findById(id)).toObject();
  deleteImage(oldResto);
  await Restaurant.updateOne({_id: id}, newResto);
  const updatedResto = (await Restaurant.findById(id)).toObject();
  res.status(200).json({updatedResto});
});

module.exports.deleteImageById = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const deletedResto = (await Restaurant.findById(id)).toObject();
  deleteImage(deletedResto);
  const mongoRes = await Restaurant.deleteOne({_id: id});
  res.status(200).json({mongoRes});
});

// to delete unused images
function deleteImage({imagePath}) {
  let filename = imagePath.split('/');
  filename = filename[filename.length - 1];
  fs.unlink(__dirname + "/../images/" + filename, (error) => {
      if(error) {
          console.log(error);
          const err = new Error('Error while deleting the image');
          err.statusCode = 500;
          throw err;
      }
      console.log('File Deleted successfully');
  });
}
