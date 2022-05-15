import React from 'react';

import { Route, Routes } from 'react-router-dom';

import { connect } from 'react-redux';

// import './App.css';

import HomePage from './pages/homepage/homepage.component';

import ShopPage from './pages/shop/shop.component';

import CollectionsOverview from './components/collection-overview/collection-overview';

import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up';

import CheckoutPage from './pages/checkout/checkout';

import Header from './components/header/header.component';

import { GlobalStyle } from './global.styles';

import { auth, creatUserProfileDocument } from './firebase/firebase.utils';

import { setCurrentUser } from './redux/user/user.action';

import ShopPageContainer from './pages/shop/shopContainer.component';

import { setItems } from './redux/shop/shop.action';

import SHOP_DATA from './redux/shop/shop.data';

import { Slide, ToastContainer } from 'react-toastify';

class App extends React.Component {
  unsubscribeFromAuth = null;

  /**
   * ComponentDidMount() is a lifecycle method that is called after the component is mounted.
   *
   * In this case, we are using it to set the current user and the items in the shop.
   *
   * The first thing we do is destructure setCurrentUser and setItems from this.props.
   *
   * Then we use the onAuthStateChanged() method from the firebase library to check if the user is
   * authenticated.
   *
   * If the user is authenticated, we create a userRef object using the createUserProfileDocument()
   * function.
   *
   * Then we use the onSnapshot() method to get the user's data and set the current user.
   *
   * If the user is not authenticated, we set the current user to null.
   *
   * Finally, we use the setItems() function to set the items in the shop.
   */
  componentDidMount() {
    const { setCurrentUser, setItems } = this.props;

    /* Subscribing to the authentication state of the user. */
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await creatUserProfileDocument(userAuth);

        /* Setting the current user. */
        userRef.onSnapshot((snapShot) => {
          /* Setting the current user. */
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data(),
          });
        });
      } else setCurrentUser(null);
    });

    /* Setting the items in the shop. */
    setItems(SHOP_DATA);
  }

  /**
   * This function is called when the component is about to be removed from the DOM
   */
  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <GlobalStyle />
        <Header />

        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPageContainer />}>
            <Route index element={<ShopPage category={'all'} />} />
            <Route path="hats" element={<ShopPage category={'Hats'} />} />
            <Route
              path="sneakers"
              element={<ShopPage category={'Sneakers'} />}
            />
            <Route path="jackets" element={<ShopPage category={'Jackets'} />} />
            <Route path="women" element={<ShopPage category={'Women'} />} />
            <Route path="men" element={<ShopPage category={'Men'} />} />
          </Route>
          <Route path="/collectionoverview" element={<CollectionsOverview />} />
          <Route exact path="/checkout" element={<CheckoutPage />} />
          <Route exact path="/signin" element={<SignInAndSignUpPage />} />
        </Routes>
        <ToastContainer transition={Slide} limit={2} />
      </div>
    );
  }
}

/**
 * It takes in a dispatch function as an argument, and returns an object with two properties:
 * setCurrentUser and setItems. Each of these properties is a function that takes in a value as an
 * argument, and dispatches an action to the Redux store
 * @param dispatch - A function of the Redux store. You call store.dispatch to dispatch an action. This
 * is the only way to trigger a state change.
 */
const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
  setItems: (data) => dispatch(setItems(data)),
});

/* Connecting the App component to the Redux store. */
export default connect(null, mapDispatchToProps)(App);
