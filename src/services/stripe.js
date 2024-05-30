// import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe
const stripePromise = loadStripe('YOUR_STRIPE_PUBLIC_KEY');

// Handle payment function
async function handlePayment(amount) {
  const stripe = await stripePromise;
  try {
    const { error } = await stripe.redirectToCheckout({
      lineItems: [{ price: 'YOUR_PRICE_ID', quantity: 1 }],
      mode: 'payment',
      successUrl: 'https://yourwebsite.com/success',
      cancelUrl: 'https://yourwebsite.com/cancel',
    });
    if (error) {
      throw error;
    }
  } catch (error) {
    throw error;
  }
}
