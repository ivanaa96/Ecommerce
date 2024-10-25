import React, { useState } from 'react';

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

function Checkout() {
  const cartItems = useCartItems();
  const user = useUser();
  const removeFromCart = useRemoveFromCart();
  const updateCartQuantity = useUpdateCartQuantity();
  const checkoutCart = useCheckoutCart();
  const { openSnackbar } = useSnackbarContext();

  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [additionalMessage, setAdditionalMessage] = useState('');
  const [isAddressError, setIsAddressError] = useState(false);
  const [isPhoneError, setIsPhoneError] = useState(false);

  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(event.target.value);
  };

  const handlePhoneNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPhoneNumber(event.target.value);
  };

  const handleAdditionalMessageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAdditionalMessage(event.target.value);
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
    setIsAddressError(false);
    setIsPhoneError(false);

    if (validateForm()) return;

    try {
      if (!user) return;
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

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
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
      onAddressChange={handleAddressChange}
      onPhoneNumberChange={handlePhoneNumberChange}
      onAdditionalMessageChange={handleAdditionalMessageChange}
      onRemoveItem={removeFromCart}
      onUpdateQuantity={updateCartQuantity}
      onCheckout={handleCheckout}
    />
  );
}

export default Checkout;
