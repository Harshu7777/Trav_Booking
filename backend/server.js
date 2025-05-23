const express = require('express');
const adminRoutes = require('./routes/adminRoutes');
const packageRoutes = require('./routes/packageRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const contactRoutes = require("./routes/contactRoutes");
const { notFound, errorHandler } = require('./middlewares/errorMiddleware');
const morgan = require('morgan');
const dotenv = require('dotenv');
const dbConnect = require('./config/db');
const cors = require('cors');
const path = require("path");
const stripe = require("stripe")("sk_test_51QQ4RNHU864JrHStbMwlUPGPXa20YITEGYNzdnkChWkP7uNHsAiu3tY62SmM3YzKBJCkZ7wsPcyMsE86PgGvVbrL00ErZk3el3"); 

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 8000;
const app = express();

// Database connection
dbConnect();

// CORS setup
app.use(
  cors({
    origin: "*", // Adjust this if you need specific origins
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Middleware setup
app.use(morgan("dev"));
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to Trav Booking API!");
});

app.post("/payment", async (req, res) => {
  const { product } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: product.name,
            },
            unit_amount: product.price * 100, 
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:5173/success",
      cancel_url: "http://localhost:5173/cancel",
    });

    res.status(200).json({ id: session.id });
  } catch (error) {
    console.error("Error creating Stripe Checkout session:", error);
    res.status(500).json({ error: "Failed to create session" });
  }
});

// API routes
app.use("/api/admin", adminRoutes);
app.use("/api/packages", packageRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/contacts", contactRoutes);

// Serve static files from the frontend build directory
app.use(express.static(path.join(__dirname, '../frontend/build')));

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

// Error handling
app.use(notFound);
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on: http://localhost:${PORT}`);
});