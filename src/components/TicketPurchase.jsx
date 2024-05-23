// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';

const TicketPurchaseComponent = () => {
  const [route, setRoute] = useState('');
  const [ticketType, setTicketType] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');

  const handlePurchase = () => {
    // Handle ticket purchase logic
    console.log('Route: ${route}, Ticket Type: ${ticketType}, Payment Method: ${paymentMethod}');
  };

  return (
    <div>
      <h2>Purchase Ticket</h2>
      <form onSubmit={handlePurchase}>
        <label>
          Route:
          <input type="text" value={route} onChange={(e) => setRoute(e.target.value)} required />
        </label>
        <br />
        <label>
          Ticket Type:
          <select value={ticketType} onChange={(e) => setTicketType(e.target.value)} required>
            <option value="">Select</option>
            <option value="single">Single Ride</option>
            <option value="daily">Daily Pass</option>
            <option value="monthly">Monthly Pass</option>
          </select>
        </label>
        <br />
        <label>
          Payment Method:
          <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} required>
            <option value="">Select</option>
            <option value="credit">Credit Card</option>
            <option value="debit">Debit Card</option>
            <option value="mobile">Mobile Wallet</option>
            <option value="voucher">Digital Voucher</option>
          </select>
        </label>
        <br />
        <button type="submit">Purchase</button>
      </form>
    </div>
  );
};

export default TicketPurchaseComponent;