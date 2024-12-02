const express = require('express');
const adminRoutes = require('./routes/adminRoutes');
const packageRoutes = require('./routes/packageRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const contactRoutes = require("./routes/contactRoutes")
const { notFound, errorHandler } = require('./middlewares/errorMiddleware');
const morgan = require('morgan');
const dotenv = require('dotenv');
const dbConnect = require('./config/db');
const cors = require('cors');

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 8000;
const app = express();

// Database connection
dbConnect();

// CORS setup
app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

// Middleware setup
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/admin', adminRoutes);
app.use('/api/packages', packageRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/contacts', contactRoutes);

// Error handling
app.use(notFound);
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on: http://localhost:${PORT}`);
});