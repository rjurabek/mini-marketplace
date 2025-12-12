
import React from 'react';

const CartItem = ({ item, onRemove }) => {
    return (
        <div className="cart-item" style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px 0',
            borderBottom: '1px solid #eee'
        }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src={item.image} alt={item.title} style={{ width: '50px', height: '50px', objectFit: 'contain', marginRight: '10px' }} />
                <div>
                    <p style={{ fontWeight: 'bold' }}>{item.title}</p>
                    <p>${item.price.toFixed(2)} x {item.quantity}</p>
                </div>
            </div>
            <button
                className="remove-from-cart-btn"
                onClick={() => onRemove(item.id)}
            >
                Удалить
            </button>
        </div>
    );
};

export default CartItem;