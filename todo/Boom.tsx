import React from 'react';
import './Boom.css';

const Boom = () => {
  // Replace with your actual LemonSqueezy store and product IDs
  const LEMON_SQUEEZY_STORE_ID = 'your-store-id';
  const PRODUCT_ID = 'your-product-id';

  const handlePurchase = () => {
    // Initialize LemonSqueezy checkout
    window.createLemonSqueezyCheckout({
      storeId: LEMON_SQUEEZY_STORE_ID,
      variantId: PRODUCT_ID,
      checkoutOptions: {
        buttonColor: '#FF5733', // Customize the button color
        dark: true, // Enable dark mode if desired
      },
    });
  };

  return (
    <div className="boom-container">
      <h1>🎆 Big Booms Store 🎆</h1>
      
      <div className="product-card">
        <img 
          src="/boom-image.jpg" 
          alt="Big Boom Product" 
          className="product-image"
        />
        <h2>Premium Big Boom Package</h2>
        <p>Get the biggest, baddest booms for your next celebration!</p>
        <ul>
          <li>✨ Professional-grade effects</li>
          <li>🌟 Multiple colors and patterns</li>
          <li>🎯 Easy to use</li>
          <li>📦 Safe shipping included</li>
        </ul>
        <button 
          onClick={handlePurchase}
          className="purchase-button"
        >
          Buy Now 💥
        </button>
      </div>
    </div>
  );
};

export default Boom;
