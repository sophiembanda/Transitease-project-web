// eslint-disable-next-line no-unused-vars
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage.jsx';
import DataAnalyticsDashboard from './components/DataAnalytics.jsx';
import AccessibilityComponent from './components/Accessibility.jsx';
import TicketPurchaseComponent from './components/TicketPurchase.jsx';
// import TripPlanningComponent from './components/TripPlanning';

const App = () => {
  return (
    <Router>
      <Routes>
         <Route path="/" exact element={<HomePage />} />
         <Route path="/purchase" element={<TicketPurchaseComponent />} />
        {/* <Route path="/plan" component={TripPlanningComponent} /> */}
        <Route path="/analytics" element={<DataAnalyticsDashboard />} />
        <Route path="/accessibility" element={<AccessibilityComponent />} />
        {/* <Route path="/" exact component={HomePage} />
        <Route path="/purchase" component={TicketPurchaseComponent} /> */}
        {/* <Route path="/plan" component={TripPlanningComponent} /> */}
        {/* {/* <Route path="/analytics" component={DataAnalyticsDashboard} /> */}
        {/* <Route path="/accessibility" component={AccessibilityComponent} /> */} */
      </Routes>
    </Router>
  );
};

export default App;