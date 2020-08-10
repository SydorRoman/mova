const express = require('express');

const apiHelper = require('../helpers/api');
const photoController = require('../controllers/photos');
const router = express.Router();

router
  .get('/?', photoController.getPhotos)
  .get('/liked', photoController.getLikedphotos)
  .get('/history', photoController.getSearchHistory)
  .post('/like/:id', photoController.likePhoto)
 
router.use((req, res, next) => {
  next('Not Found');
});

// Error handler
router.use((err, req, res) => {
  apiHelper.builder(res, getError(err, 500));
});

module.exports = router;
