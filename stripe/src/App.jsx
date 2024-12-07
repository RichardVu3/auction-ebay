import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

import CheckoutForm from "./CheckoutForm";
import CompletePage from "./CompletePage";
import "./App.css";

// import { v4 as uuidv4 } from 'uuid';

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe("pk_test_51PFLuERoRuk9KSF2hydAtvD7DEICAJxiytwubNRORumrH5jKmA5DX2J6Vzmsj69fUHRiGzaMPAfCCOIOhmfMUbOj00jpqkKM4L");

// Inline styles for the amount box
const styles = {
amountBox: {
    // backgroundColor: "#f6f9fc",
    color: "#32325d",
    // padding: "10px 20px",
    borderRadius: "8px",
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
    fontWeight: "bold",
    // marginBottom: "10px",
    fontSize: "64px",
},
};

export default function App() {
  const [clientSecret, setClientSecret] = useState("");
  const [dpmCheckerLink, setDpmCheckerLink] = useState("");
  const [amount, setAmount] = useState(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const amountValue = queryParams.get("amount");
    setAmount(amountValue);
    console.log(amountValue);
    
    // const paymentId = uuidv4();
    // Create PaymentIntent as soon as the page loads
    fetch("/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: [{ id: "xl-tshirt", amount: 1000 }] }),
    })
    .then((res) => res.json())
    .then((data) => {
      setClientSecret(data.clientSecret);
      // [DEV] For demo purposes only
      setDpmCheckerLink(data.dpmCheckerLink);
    });
}, []);

const appearance = {
  theme: 'stripe',
};
// Enable the skeleton loader UI for optimal loading.
const loader = 'auto';

return (
  <Router>
    <div className="App" style={styles.appContainer}>
        {/* Conditional rendering to check if amount is defined */}
        {amount ? (
          <div style={styles.amountBox}>
            <p> <strong>${amount}</strong></p>
          </div>
        ) : (
            <div>
            </div>
        )
        }
      {clientSecret && (
        <Elements options={{clientSecret, appearance, loader}} stripe={stripePromise}>
          <Routes>
            <Route path="/checkout" element={<CheckoutForm dpmCheckerLink={dpmCheckerLink}/>} />
            <Route path="/complete" element={<CompletePage />} />
          </Routes>
        </Elements>
      )}
    </div>
  </Router>
);
}
