

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CartIcon = () => {
    const [cartQuantity, setCartQuantity] = useState(0);

    useEffect(() => {
        const fetchCartQuantity = async () => {
            try {
                const response = await axios.get('http://3.138.38.248/Enaam_Backend_V1/public/api/cart/quantity', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setCartQuantity(response.data.quantity);
            } catch (error) {
                console.error('Error fetching cart quantity:', error);
            }
        };

        fetchCartQuantity();
        const intervalId = setInterval(fetchCartQuantity, 5000); // Refresh every 5 seconds
        return () => clearInterval(intervalId);
    }, []);

    return (
        <Link to="/cart" className="cart-icon position-relative d-inline-flex align-items-center">
            <i className="bi bi-cart3 text-white" style={{ fontSize: '1.5rem', color: '#000' }}></i>
            {cartQuantity > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger ">
                    {cartQuantity}
                    <span className="visually-hidden">items in cart</span>
                </span>
            )}
        </Link>
    );
};

export default CartIcon;
