const express = require('express');
const router = express.Router();
const {
  createPackage,
  getAllPackages,
  getPackageById,
  updatePackage,
  deletePackage,
} = require('../controllers/packageController');
const { protect  , adminOnly} = require('../middlewares/authMiddleware');

router.post('/create', protect, createPackage);

router.get('/getPack', protect , getAllPackages);

router.get('/:id' , protect , getPackageById);

router.put('/:id', protect, adminOnly ,  updatePackage);

router.delete('/:id', protect , adminOnly,  deletePackage);

module.exports = router;
