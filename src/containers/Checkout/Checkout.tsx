import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import CheckoutComponent from 'components/checkout/Checkout';
import {
  CHECKOUT_FAILURE_MESSAGE,
  CHECKOUT_NOT_LOGGED_IN_ERROR,
  CHECKOUT_SUCCESS_MESSAGE,
  EMPTY_CART_ERROR,
} from 'constants/constants';
import { SnackbarSeverity, useSnackbarContext } from 'hooks/useSnackbar';
import {
  useCartItems,
  useCheckoutCart,
  useUpdateCartQuantity,
  useRemoveFromCart,
} from 'store/products/selectors';
import { useUser } from 'store/user/selectors';
import APP_ROUTES from 'api/appRoutes';

function Checkout() {
  const cartItems = useCartItems();
  const user = useUser();
  const removeFromCart = useRemoveFromCart();
  const updateCartQuantity = useUpdateCartQuantity();
  const checkoutCart = useCheckoutCart();
  const { openSnackbar } = useSnackbarContext();
  const navigate = useNavigate();

  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [additionalMessage, setAdditionalMessage] = useState('');
  const [isAddressError, setIsAddressError] = useState(false);
  const [isPhoneError, setIsPhoneError] = useState(false);

  const handleAddressChange = (address: string) => {
    setAddress(address);
  };

  const handlePhoneNumberChange = (phoneNumber: string) => {
    setPhoneNumber(phoneNumber);
  };

  const handleAdditionalMessageChange = (additionalMessage: string) => {
    setAdditionalMessage(additionalMessage);
  };

  const validateForm = (): boolean => {
    let hasError = false;

    if (!user) {
      openSnackbar(CHECKOUT_NOT_LOGGED_IN_ERROR, SnackbarSeverity.ERROR);
      hasError = true;
    }

    if (cartItems.length === 0) {
      openSnackbar(EMPTY_CART_ERROR, SnackbarSeverity.ERROR);
      hasError = true;
    }

    if (!phoneNumber) {
      setIsPhoneError(true);
      hasError = true;
    }

    if (!address) {
      setIsAddressError(true);
      hasError = true;
    }

    return hasError;
  };

  const handleCheckout = async () => {
    if (!user) return;

    setIsAddressError(false);
    setIsPhoneError(false);

    if (validateForm()) return;

    try {
      const data = await checkoutCart(user.id);

      const purchasedItems = data.products
        .map((product) => {
          return `${product.quantity} x ${product.title}`;
        })
        .join(', ');

      const totalAmount = data.discountedTotal;
      const discountMessage =
        data.discountedTotal < data.total
          ? ` You saved $${(data.total - data.discountedTotal).toFixed(2)}!`
          : '';

      const successMessage =
        `${CHECKOUT_SUCCESS_MESSAGE} You bought: ${purchasedItems}. Total payment: $${totalAmount}.` +
        discountMessage;

      openSnackbar(successMessage, SnackbarSeverity.SUCCESS);
    } catch (error) {
      openSnackbar(CHECKOUT_FAILURE_MESSAGE, SnackbarSeverity.ERROR);
    }
  };

  const handleRedirectToLoginPage = () => {
    navigate(APP_ROUTES.LOGIN);
  };

  const totalPrice = useMemo(
    () =>
      cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
    [cartItems]
  );

  return (
    <CheckoutComponent
      cartItems={cartItems}
      address={address}
      phoneNumber={phoneNumber}
      additionalMessage={additionalMessage}
      totalPrice={totalPrice}
      isAddressError={isAddressError}
      isPhoneError={isPhoneError}
      isAuthenticated={!!user}
      onAddressChange={handleAddressChange}
      onPhoneNumberChange={handlePhoneNumberChange}
      onAdditionalMessageChange={handleAdditionalMessageChange}
      onRemoveItem={removeFromCart}
      onUpdateQuantity={updateCartQuantity}
      onCheckout={handleCheckout}
      onRedirectToLogin={handleRedirectToLoginPage}
    />
  );
}

export default Checkout;
