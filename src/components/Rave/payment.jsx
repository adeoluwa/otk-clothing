import React from 'react';

import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';

import CustomButton from '../custom-button/custom-button';

import { useDispatch, useSelector } from 'react-redux';

// import { useNavigate } from 'react-router-dom';

import CartActionTypes from '../../redux/cart/cart.types';

export default function PayOut({ total }) {
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.user.currentUser);

  // const navigate = useNavigate

  /* A configuration object that is passed to the useFlutterwave hook. */
  const config = {
    public_key: process.env.REACT_APP_PUBLIC_KEY,
    tx_ref: Date.now(),
    amount: total,
    currency: 'NGN',
    payment_options: 'card,mobilemoney,ussd',
    customer: {
      email: loggedInUser?.email,
      phonenumber: loggedInUser?.phonenumber,
      name: loggedInUser?.displayname,
    },
    customizations: {
      title: 'Otk Clothing',
      description: 'Payment for items in cart',
      logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
    },
  };

  /* A function that is called when the button is clicked. */
  const handleFlutterPayment = useFlutterwave(config);
  //
  return (
    <>
      <CustomButton
        price={total}
        /* A function that is called when the button is clicked. */
        onClick={() => {
          handleFlutterPayment({
            callback: (response) => {
              // console.log(response);
              if (response.status === 'successful') {
                alert(response.status);
                dispatch({ type: CartActionTypes.CHECK_OUT_CLEAR_OUT });
              } else {
                // console.log('Payment Error: ', Error);
                alert(
                  'There was an issue with your payment! Please make sure you use the provided credit card'
                );
              }
              closePaymentModal(); // this will close the modal programmatically
            },
            onClose: () => {},
          });
        }}
      >
        Pay Now
      </CustomButton>
    </>
  );
}
