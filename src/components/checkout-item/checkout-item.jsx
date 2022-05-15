import React from 'react';

import { connect } from 'react-redux';

import { toast } from 'react-toastify';

import {
  clearItemFromCart,
  addItem,
  removeItem,
} from '../../redux/cart/cart.actions';

// import './checkout-item.styles.scss';

import {
  CheckoutItemContainer,
  ImageContainer,
  TextContainer,
  QuantityContainer,
  RemoveButtonContainer,
} from './checkout-item.styles';

/* A function that takes in an object as an argument and returns a JSX element. */
const CheckoutItem = ({ cartItem, clearItem, addItem, removeItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;

  /**
   * Notify_remove_item is a function that returns a toast.warning message.
   */
  const notify_remove_item = () =>
    toast.warning('You removed an item from the cart');

 /**
  * Notify_add_item() is a function that displays a success message when the user clicks the 'Add to
  * Cart' button.
  */
  const notify_add_item = () =>
    toast.success('You increased the number of item in your cart!');

  return (
    <>
      <CheckoutItemContainer>
        <ImageContainer>
          <img src={imageUrl} alt="item" />
        </ImageContainer>
        <TextContainer>{name}</TextContainer>
        <QuantityContainer>
          <div
            onClick={() => {
              removeItem(cartItem);
              notify_remove_item();
            }}
          >
            &#10094;
          </div>
          <span>{quantity}</span>
          <div
            onClick={() => {
              addItem(cartItem);
              notify_add_item();
            }}
          >
            &#10095;
          </div>
        </QuantityContainer>
        <TextContainer>{price * quantity} </TextContainer>
        <RemoveButtonContainer
          onClick={() => {
            clearItem(cartItem);
          }}
        >
          &#10005;
        </RemoveButtonContainer>
      </CheckoutItemContainer>

      {/* <div className="checkout-item-container">
        <div className="checkout-image-name">
          <span className="checkout-image-container">
            <img src={imageUrl} alt="item" />
          </span>
          <span>{name}</span>
          <button
            className="checkout-btn-1"
            onClick={() => clearItem(cartItem)}
          >
            &#10005;
          </button>
        </div>
        <div className="checkout-qty-price">
          <QuantityContainer>
            <div onClick={() => removeItem(cartItem)}>&#10094;</div>
            <span>{quantity}</span>
            <div onClick={() => addItem(cartItem)}>&#10095;</div>
          </QuantityContainer>
          <TextContainer>{price}</TextContainer>
          <button
            className="checkout-btn-2"
            onClick={() => clearItem(cartItem)}
          >
            &#10005;
          </button>
        </div>
      </div> */}
    </>
  );
};

/**
 * This function takes in a dispatch function as an argument and returns an object with three
 * properties, each of which is a function that takes in an item as an argument and dispatches an
 * action to the store.
 */

const mapDispatchToProps = (dispatch) => ({
  clearItem: (item) => dispatch(clearItemFromCart(item)),
  addItem: (item) => dispatch(addItem(item)),
  removeItem: (item) => dispatch(removeItem(item)),
});

export default connect(null, mapDispatchToProps)(CheckoutItem);
