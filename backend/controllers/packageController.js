const Package = require('../models/packageModel');

// Create a Travel Package
exports.createPackage = async (req, res) => {
  const { destination, title, description, price, availableDates, maxTravelers } = req.body;
  try {
    const travelPackage = new Package({
      destination,
      title,
      description,
      price,
      availableDates,
      maxTravelers,
    });

    await travelPackage.save();
    res.status(201).json({ message: 'Package created successfully', package: travelPackage });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All Travel Packages
exports.getAllPackages = async (req, res) => {
  try {
    const packages = await Package.find();
    res.status(200).json(packages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a Single Package by ID
exports.getPackageById = async (req, res) => {
  try {
    const travelPackage = await Package.findById(req.params.id);
    if (!travelPackage) {
      return res.status(404).json({ message: 'Package not found' });
    }
    res.status(200).json(travelPackage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a Package
exports.updatePackage = async (req, res) => {
  try {
    const updatedPackage = await Package.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedPackage) {
      return res.status(404).json({ message: 'Package not found' });
    }
    res.status(200).json({ message: 'Package updated successfully', package: updatedPackage });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a Package
exports.deletePackage = async (req, res) => {
  try {
    const deletedPackage = await Package.findByIdAndDelete(req.params.id);
    if (!deletedPackage) {
      return res.status(404).json({ message: 'Package not found' });
    }
    res.status(200).json({ message: 'Package deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
