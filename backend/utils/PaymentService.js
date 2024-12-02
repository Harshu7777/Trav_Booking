const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // Stripe secret key from environment variables

class PaymentService {
  // Create a payment session (Initiate Payment)
  static async createPaymentSession(booking) {
    try {
      // Extract the necessary details from the booking
      const amount = booking.package.price * booking.numberOfTravelers; // Assuming price is in the package

      // Create a payment session with Stripe
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'usd', // Use your preferred currency
              product_data: {
                name: `Travel Booking for ${booking.customerName}`,
                description: `Booking for ${booking.numberOfTravelers} travelers`,
              },
              unit_amount: amount * 100, // Amount in cents
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${process.env.CLIENT_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.CLIENT_URL}/payment-cancelled`,
        metadata: {
          bookingId: booking._id,
        },
      });

      // Return the session ID or URL to redirect the user to the payment page
      return {
        sessionId: session.id,
        paymentUrl: session.url, // Use this URL for redirection
      };
    } catch (error) {
      console.error('Error initiating payment:', error);
      throw new Error('Payment initiation failed');
    }
  }

  // Confirm payment status after successful payment (Confirm Payment)
  static async confirmPayment(booking) {
    try {
      // Assuming the session ID is sent to the backend via Stripe webhook or after redirect
      const sessionId = booking.payment.sessionId;

      // Retrieve the session from Stripe to confirm the payment status
      const session = await stripe.checkout.sessions.retrieve(sessionId);

      if (session.payment_status === 'paid') {
        return {
          success: true,
          transactionId: session.payment_intent, // Payment intent ID from Stripe
          amount: session.amount_total / 100, // Convert from cents to dollars
        };
      }

      return { success: false };
    } catch (error) {
      console.error('Error confirming payment:', error);
      throw new Error('Payment confirmation failed');
    }
  }

  // Handle payment failure (Handle Payment Failure)
  static async handlePaymentFailure(booking) {
    try {
      // If payment failed, we can send the failed payment status here
      return {
        success: false,
        message: 'Payment failed, booking cancelled',
      };
    } catch (error) {
      console.error('Error handling payment failure:', error);
      throw new Error('Payment failure handling failed');
    }
  }
}

module.exports = PaymentService;
