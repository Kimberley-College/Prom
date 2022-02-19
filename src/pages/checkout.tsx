import {PaymentElement, CardElement, CardNumberElement,CardCvcElement,CardExpiryElement} from '@stripe/react-stripe-js';
import type { NextPage } from 'next';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import React, { useState } from "react";
import axios from 'axios';


const STRIPE_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

const Field = ({ id, placeholder, required, onChange, label, value, type}) => {
  return (
    <div className='checkout-form-item'>
    <label htmlFor={id}>{label}</label>
    <input
      className='checkout-form-input'
      id={id}
      required={required}
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={onChange}
    />
    </div>
  )
}

const CARD_OPTIONS = {
  style: {
    base: {
      iconColor: "#c4f0ff",
      color: "#fff",
      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": {
        color: "#fce883"
      },
      "::placeholder": {
        color: "#87bbfd"
      }
    },
    invalid: {
      iconColor: "#ffc7ee",
      color: "#ffc7ee"
    }
  }
};

const CardField = ({ onChange }) => (
  <div className="checkout-form-item">
    CardNumber
    <CardElement onChange={onChange} />
  </div>
);

const SubmitButton = ({ onclick }) => (
  <div className="checkout-form-item">
    <button className='checkout-form-button' onClick={onclick}>Submit</button>
  </div>
);


const CheckoutForm: NextPage = () => {
  const handleFormSubmit = async e =>{
    //Need to get client secret from api
    e.preventDefault();
  }

  const options = {
    // passing the client secret obtained from the server
    clientSecret: '{{CLIENT_SECRET}}',
  };

  //To be added
  const [cardComplete, setCardComplete] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(null)
  const [billingDetails, setBillingDetails] = useState({
    firstName: "",
    surname: "",
    number: "",
    address: "",
    postcode: ""
  });


  return (
    <Elements stripe={stripePromise}>
      <form className='checkout-form'>
        <Field
            label="First Name"
            id="firstName"
            type="input"
            placeholder="Jane"
            required={true}
            value={billingDetails.firstName}
            onChange={(e) => {
              setBillingDetails({ ...billingDetails, firstName: e.target.value });
            }}
        /> 
          <Field
            label="Surname"
            id="surname"
            type="input"
            placeholder="Doe"
            required={true}
            value={billingDetails.surname}
            onChange={(e) => {
              setBillingDetails({ ...billingDetails, surname: e.target.value });
            }}
        />  
          <Field
            label="Billing Address"
            id="address"
            type="input"
            placeholder="66 St. John's Road OXFORD"
            required
            value={billingDetails.address}
            onChange={(e) => {
              setBillingDetails({ ...billingDetails, address: e.target.value });
            }}
        />  
        <Field
            label="Postcode"
            id="postcode"
            type="input"
            placeholder="OX69 2QZ"
            required={true}
            value={billingDetails.postcode}
            onChange={(e) => {
              setBillingDetails({ ...billingDetails, postcode: e.target.value });
            }}
        />   
        <CardField onChange={(e) => {
            setCardComplete(e.complete);
          }}
          />

          <SubmitButton onclick={handleFormSubmit}/>
        </form>
    </Elements>
  );
};

export default CheckoutForm;