import React from 'react';

import { connect } from 'react-redux';

import {  toast} from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import { addItem } from '../../redux/cart/cart.actions';

import CustomButton from '../custom-button/custom-button';

import './collection-item.styles.scss';

const CollectionItem = ({ item, addItem }) => {
  const { name, price, imageUrl } = item;
  const toastId = React.useRef(null);

  const notify = () => {
    if (!toast.isActive(toastId.current)) {
      toast.success('You added an item to your cart !');
    }
  };

  return (
    <div className="collection-item">
      <div className="image" style={{ backgroundImage: `url(${imageUrl})` }} />
      <div className="collection-footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>

      <CustomButton
        onClick={() => {
          console.log('I DON CLICK O');
          addItem(item);
          notify();
        }}
        inverted
      >
        {' '}
        Add to cart
      </CustomButton>
      {/* <ToastContainer transition={Slide} /> */}
    </div>
  );
};

/**
 * This function takes a dispatch function as an argument and returns an object with a function called
 * addItem that takes an item as an argument and dispatches an action with that item as a payload.
 */
const mapDispatchToProps = (dispatch) => ({
  addItem: (item) => dispatch(addItem(item)),
});

export default connect(null, mapDispatchToProps)(CollectionItem);
