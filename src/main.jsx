
import React from 'react';
import ReactDOM from 'react-dom/client';
import CartList from './CartList';

const cartRoot = document.getElementById('cart-section');

if (cartRoot) {
    ReactDOM.createRoot(cartRoot).render(
        <React.StrictMode>
            <CartList />
        </React.StrictMode>
    );
}
