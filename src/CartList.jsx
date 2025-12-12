
import React, { useState, useEffect, useMemo } from 'react';
import CartItem from './CardItem';

const CART_STORAGE_KEY = 'simple-store-cart';

const CartList = () => {
   
    const [cart, setCart] = useState([]);

   
    useEffect(() => {
        const storedCart = localStorage.getItem(CART_STORAGE_KEY);
        if (storedCart) {
            try {
                setCart(JSON.parse(storedCart));
            } catch (e) {
                console.error("Не удалось разобрать корзину из localStorage", e);
                setCart([]);
            }
        }
    }, []);

    
    useEffect(() => {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    }, [cart]);

  
    const handleAddToCart = (event) => {
        const product = event.detail; 
        
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === product.id);

            if (existingItem) {
               
                return prevCart.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 }: item
                );
            } else {
                
                return [...prevCart, { ...product, quantity: 1 }];
            }
        });
    };
    const handleRemoveFromCart = (productId) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === productId);

            if (existingItem.quantity > 1) {
                return prevCart.map(item =>
                    item.id === productId? { ...item, quantity: item.quantity - 1 }: item
                );
            } else {
                return prevCart.filter(item => item.id !== productId);
            }
        });
    };
    useEffect(() => {
        window.addEventListener('addToCart', handleAddToCart);
        return () => {
            window.removeEventListener('addToCart', handleAddToCart);
        };
    }, []);

    const totalItems = useMemo(() => 
        cart.reduce((total, item) => total + item.quantity, 0), 
        [cart]
    );
    const totalAmount = useMemo(() => 
        cart.reduce((total, item) => total + (item.price * item.quantity), 0), 
        [cart]
    );


    return (
        <div className="cart-container">
            {cart.length === 0 ? (
                <p>Ваша корзина пуста.</p>
            ) : (
                <>
                    <div className="cart-items-list">
                        {}
                        {cart.map(item => (
                            <CartItem 
                                key={item.id} 
                                item={item} 
                                onRemove={handleRemoveFromCart} 
                            />
                        ))}
                    </div>

                    <div className="cart-summary" style={{ marginTop: '20px', paddingTop: '10px', borderTop: '2px solid #333' }}>
                        <p style={{ fontWeight: 'bold' }}>
                            Количество товаров: <span style={{ float: 'right' }}>{totalItems}</span>
                        </p>
                        <p style={{ fontWeight: 'bold', fontSize: '1.2em', color: '#007bff' }}>
                            Общая сумма: <span style={{ float: 'right' }}>${totalAmount.toFixed(2)}</span>
                        </p>
                    </div>
                </>
            )}
        </div>
    );
};

export default CartList;