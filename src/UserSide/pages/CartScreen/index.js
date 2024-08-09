import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../Components/HeaderComponent';
import Footer from '../../Components/FooterCompnent';
import Loader from '../../Components/LoaderComponent';
import { CartComponent } from './Components/CartComponent';
import { ToastContainer, toast } from 'react-toastify';
import { useApp } from '../../Services/AppContext';
import 'react-toastify/dist/ReactToastify.css';


const CartScreen = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { cartData , getCart , updateCart , removeFromCart} = useApp()

    useEffect(() => {
        setLoading(true);
        getUpdatedCart();
    }, []);

    const getUpdatedCart = () => {
        getCart().then((data) => {
            if (data?.cart_items.length <= 0) {
                setCartItems([]);
            } else {
                setCartItems(data?.cart_items);
            }
            setLoading(false);
        }).catch((error) => {
            console.error('Error fetching cart:', error);
            setLoading(false);
            setCartItems([]);
        })
    }


    const getTotalPrice = () => {
        return cartItems?.reduce((total, item) => total + (item?.quantity * item?.price), 0).toFixed(2);
    };

    const handleCheckout = () => {
        navigate('/initialGameScreen', { state: { cartItems } });
    };

    return (
        <div>
            <Header />
            <ToastContainer />
            <section className="home-header inner-page">
                {loading ? (
                    <Loader />
                ) : (
                    <div>
                        <div className="row ">
                            <div className="col-md-8 col-lg-9">
                                <div id="sbinfo" className="sub-info glow" style={{ padding: 10, justifyContent: "center" }}>
                                    {cartItems?.length <= 0 || undefined ? (
                                        <div style={{ justifyContent: "center", display: "flex", padding: 45 }}>
                                            <p>Your cart is empty</p>
                                        </div>
                                    ) : (
                                        cartItems?.map(item => (
                                            <CartComponent item={item} increaseQuantity={() => {
                                                updateCart({ id: item?.item_id, quantity: item?.quantity + 1 }).then((response) => {
                                                    if (response.status === 200) {
                                                        getUpdatedCart()
                                                    } else {
                                                        toast.error(response.message);
                                                    }
                                                })
                                            }} decreaseQuantity={() => {
                                                updateCart({ id: item?.item_id, quantity: item?.quantity - 1 }).then((response) => {
                                                    if (response.status === 200) {
                                                        getUpdatedCart()
                                                    } else {
                                                        toast.error(response.message);
                                                    }
                                                })
                                            }} deleteItem={() => {
                                                removeFromCart({ id: item?.item_id }).then((response) => {
                                                        if (response.status === 200) {
                                                            getUpdatedCart()
                                                        } else {
                                                            toast.error(response.message);
                                                        }
                                                    })
                                                }} />
                                        ))
                                    )}
                                </div>
                            </div>
                            <div className="col-md-4 col-lg-3">
                                <div className="price-cart glow">
                                    <div className="price-cart-wrapper">
                                        <div>
                                            <h2 className="price-heading text-left">Price</h2>
                                            <span className="inclusive">Inclusive of VAT</span>
                                        </div>
                                        <div id="total" className="value-price">RS. {getTotalPrice()}</div>
                                    </div>
                                    <div>
                                        <hr className="my-2 solid bg-dark" />
                                    </div>
                                    <div className="price-cart-wrapper align-items-center">
                                        <div>Subtotal</div>
                                        <div id="subtotal" className="value-price">RS. {getTotalPrice()}</div>
                                    </div>
                                </div>
                                <button onClick={handleCheckout} className="btn btn-primary mt-4 w-100 py-3" style={{ borderRadius: 10, color: "#fff" }}>Proceed to Checkout</button>
                            </div>
                        </div>
                    </div>
                )}
            </section>
            <Footer />
        </div>
    );
};

export default CartScreen;
