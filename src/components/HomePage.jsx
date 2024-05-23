// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Link } from 'react-router-dom';
import TicketPurchaseComponent from '../components/TicketPurchase';
// import TripPlanningComponent from '../components/TripPlanningComponent';

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to TransitEase</h1>
      <Link to="/">Homepage</Link>
      <Link to="/purchase">Purchase Ticket</Link>
      <Link to="/plan">Plan Trip</Link>
      <Link to="/analytics">Data Analytics</Link>
      <Link to="/accessibility">Accessibility</Link>

      <TicketPurchaseComponent />
      {/* <TripPlanningComponent /> */}
    </div>
  );
};

export default HomePage;