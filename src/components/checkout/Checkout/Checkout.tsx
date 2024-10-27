import React from 'react';

import './checkout.css';
import CartComponent from '../Cart';
import CartFormComponent from '../CartForm';
import LoginRedirectMessage from '../LoginRedirectMessage';
import { CartItem } from 'store/products/types';

export interface CheckoutComponentProps {
  cartItems: CartItem[];
  address: string;
  phoneNumber: string;
  additionalMessage: string;
  totalPrice: number;
  isAddressError: boolean;
  isPhoneError: boolean;
  isAuthenticated: boolean;
  onAddressChange: (address: string) => void;
  onPhoneNumberChange: (phoneNumber: string) => void;
  onAdditionalMessageChange: (additionalMessage: string) => void;
  onCheckout: () => void;
  onRemoveItem: (productId: number) => void;
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onRedirectToLogin: () => void;
}

function CheckoutComponent({
  cartItems,
  address,
  phoneNumber,
  additionalMessage,
  totalPrice,
  isAddressError,
  isPhoneError,
  isAuthenticated,
  onAddressChange,
  onPhoneNumberChange,
  onAdditionalMessageChange,
  onCheckout,
  onRemoveItem,
  onUpdateQuantity,
  onRedirectToLogin,
}: CheckoutComponentProps): JSX.Element {
  return (
    <div className="checkout__container">
      <div className="checkout__cart">
        <CartComponent
          cartItems={cartItems}
          totalPrice={totalPrice}
          onRemoveItem={onRemoveItem}
          onUpdateQuantity={onUpdateQuantity}
        />
      </div>
      <div className="checkout__form">
        {isAuthenticated ? (
          <CartFormComponent
            address={address}
            phoneNumber={phoneNumber}
            additionalMessage={additionalMessage}
            isAddressError={isAddressError}
            isPhoneError={isPhoneError}
            onAddressChange={onAddressChange}
            onPhoneNumberChange={onPhoneNumberChange}
            onAdditionalMessageChange={onAdditionalMessageChange}
            onCheckout={onCheckout}
          />
        ) : (
          <LoginRedirectMessage onRedirectToLogin={onRedirectToLogin} />
        )}
      </div>
    </div>
  );
}

export default CheckoutComponent;
