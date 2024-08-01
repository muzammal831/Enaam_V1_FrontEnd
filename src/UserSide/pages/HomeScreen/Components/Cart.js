


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CartIcon from './CartIcon';
import Header from '../../../Components/HeaderComponent'; // Import Header
import Footer from '../../../Components/FooterCompnent'; // Import Footer
import Loader from '../../../Components/LoaderComponent'; // Import Loader

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/cart', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setCartItems(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching cart items:', error);
                setLoading(false);
            }
        };
        fetchCartItems();
    }, []);

    const updateQuantity = async (id, quantity) => {
        try {
            await axios.put(`http://localhost:8000/api/cart/${id}`, { quantity }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            // Refresh cart items
            const response = await axios.get('http://localhost:8000/api/cart', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setCartItems(response.data);
        } catch (error) {
            console.error('Error updating quantity:', error);
        }
    };

    const removeItem = async (id) => {
        if (window.confirm('Are you sure you want to remove this item from your cart?')) {
            try {
                await axios.delete(`http://localhost:8000/api/cart/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                // Refresh cart items
                const response = await axios.get('http://localhost:8000/api/cart', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setCartItems(response.data);
            } catch (error) {
                console.error('Error removing item:', error);
            }
        }
    };

    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + (item.quantity * item.price), 0).toFixed(2);
    };

    const handleCheckout = async () => {
        try {
            await axios.post('http://localhost:8000/api/checkout', {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            alert('Checkout successful');
            // setCartItems([]);
        } catch (error) {
            console.error('Error during checkout:', error);
            alert('Checkout failed');
        }
    };

    return (
        <div className="App">
            <Header /> {/* Add Header */}
            <div className="container-fluid col-lg-11 mt-5">
                <h1 className="mt-5">Your Cart</h1>

                {loading ? (
                    <Loader /> // Show Loader while loading
                ) : (
                    <>
                        <div className="row mt-5">
                            <div className="col-md-8 col-lg-9">
                                <div className="product-description mt-0">
                                    <h4>Cart</h4>
                                </div>
                                <div id="sbinfo" className="sub-info">
                                    {cartItems.length === 0 ? (
                                        <p>Your cart is empty</p>
                                    ) : (
                                        cartItems.map(item => (
                                            <div className="row chunking-wrapper" key={item.id} data-product-id={item.id} style={{ alignItems: 'center' }}>
                                                <div className="col-md-4">
                                                    <div className="detail-chunk">
                                                        <div>
                                                            {/* Display the reward image */}
                                                            <img src={item.product.reward.image} alt={item.product.reward.name} style={{ maxWidth: '100%' }} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="detail-chunk">
                                                        <p className="text-left">{item.product.description}</p>
                                                    </div>
                                                </div>
                                                <div className="col-md-4" style={{ flexDirection: 'row' }}>
                                                    <div className="button-container" style={{ flexDirection: 'row' }}>
                                                        <button type="button" className="altera decrescimo btn btn-outline-secondary btn-sm me-2" onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>
                                                            <i className="bi bi-dash"></i>
                                                        </button>
                                                        <input type="text" id="txtAcrescimo" value={item.quantity} readOnly className="form-control d-inline-block w-25 text-center" />
                                                        <button type="button" className="altera acrescimo btn btn-outline-secondary btn-sm ms-2" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                                                            <i className="bi bi-plus"></i>
                                                        </button>
                                                        {/* Add Remove Button */}
                                                        <button type="button" className="btn btn-outline-danger btn-sm ms-5 mt-3" onClick={() => removeItem(item.id)}>
                                                            <i className="bi bi-trash"></i> Remove
                                                        </button>
                                                    </div>
                                                    <div className="error-container" style={{ flexDirection: 'row', marginTop: '10px' }}>
                                                        <span style={{ color: 'red', marginLeft: '-170px' }}>{item.product.available}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                            <div className="col-md-4 col-lg-3 mt-5">
                                <div className="price-cart">
                                    <div className="price-cart-wrapper">
                                        <div>
                                            <h2 className="price-heading">Price</h2>
                                            <span className="inclusive">Inclusive of VAT</span>
                                        </div>
                                        <div id="total" className="value-price">RS. {getTotalPrice()}</div>
                                    </div>
                                    <div>
                                        <hr className="my-2" />
                                    </div>
                                    <div className="price-cart-wrapper">
                                        <div>Subtotal</div>
                                        <div id="subtotal" className="value-price">RS. {getTotalPrice()}</div>
                                    </div>
                                </div>
                                <button onClick={handleCheckout} className="btn btn-primary mt-4">Proceed to Checkout</button>
                            </div>
                        </div>
                    </>
                )}
            </div>
            <Footer /> {/* Add Footer */}
        </div>
    );
};

export default Cart;
