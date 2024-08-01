
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../../../Components/HeaderComponent';
import Footer from '../../../Components/FooterCompnent';
import Loader from '../../../Components/LoaderComponent'; // Import Loader

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/products/${id}`);
                setProduct(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching product details:', error);
                setLoading(false);
            }
        };

        fetchProductDetails();
    }, [id]);

    const addProductToCart = async () => {
        try {
            if (!localStorage.getItem('token')) {
                alert('You need to login first');
                navigate('/dashboard/login');
                return;
            }
            const response = await axios.post('http://localhost:8000/api/cart/add', {
                product_id: product.id,
                quantity: 1, // Default quantity
                price: product.price
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            alert('Product added to cart successfully');
            navigate('/cart');
        } catch (error) {
            console.error('Error adding product to cart:', error);
            if (error.response) {
                if (error.response.status === 401) {
                    alert('You need to login first');
                    navigate('/dashboard/login');
                } else {
                    alert(`Failed to add product to cart: ${error.response.data.message}`);
                }
            } else if (error.request) {
                alert('No response from the server. Please try again later.');
            } else {
                alert(`Error: ${error.message}`);
            }
        }
    };

    if (loading) return <Loader />; // Show Loader while loading
    if (!product) return <p>Product not found.</p>;

    const percentage = (product.sold / product.quantity) * 100;
    let progressBarClass;
    let buttonStyle = '';
    let buttonText = 'Add to Cart';
    let drawDateSection = '';

    if (percentage < 70) {
        progressBarClass = 'bg-success'; // green
    } else if (percentage >= 70 && percentage < 100) {
        progressBarClass = 'bg-warning'; // yellow
    } else {
        progressBarClass = 'bg-danger'; // red
        buttonStyle = 'pointer-events: none; opacity: 0.6;';
        buttonText = 'Entries Completed';
    }

    if (percentage === 100) {
        drawDateSection = `
            <div>
                <img src="/path/to/calendar.png" alt="" />
            </div>
            <a href="">
                Max draw date: <br>
                ${new Intl.DateTimeFormat('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                }).format(new Date(product.draw_date))}
            </a>
        `;
    }

    return (
        <div className="container-fluid mt-5 p-2">
            <Header />

            <div className='container-fluid mt-5 col-lg-11'>
                <div className="row mt-5">
                    <div className="col-md-8 col-lg-9 mt-5">
                        <div className="sub-info">
                            <div style={{ textAlign: 'center' }}>
                                <h1 className="prize-detail-heading">{product.reward.name}</h1>
                            </div>
                            <div className="info-wrapper">
                                <div className="calander-section" dangerouslySetInnerHTML={{ __html: drawDateSection }} />
                                <div className="product-detail-state" style={{ width: '150px' }}>
                                    <h6 className="mb-0 card-heading">
                                        <p>{product.sold} Entries out of {product.quantity}</p>
                                    </h6>
                                    <div className="progress">
                                        <div className={progressBarClass} role="progressbar" style={{ width: `${percentage}%` }} aria-valuenow={percentage} aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="row chunking-wrapper mbm-0">
                                <div className="col-md-6">
                                    <div className="detail-chunk">
                                        <div className="detail-img">
                                            <img src={product.image} alt={product.name} />
                                        </div>
                                        <h4>Spend ${product.price}</h4>
                                        <p>{product.description}</p>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="detail-chunk">
                                        <div className="detail-img">
                                            <img src={product.reward.image} alt={product.reward.name} />
                                        </div>
                                        <h4>Get a chance to win:</h4>
                                        <p>{product.reward.name}</p>
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <div className="product-description">
                                <h4>Prize Details</h4>
                                <p>{product.reward.description}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 col-lg-3 mt-5">
                        <div className="price-section">
                            <div>
                                <h2 className="price-heading">Price</h2>
                                <span className="inclusive">Inclusive of VAT</span>
                            </div>
                            <div className="value-price">RS. {product.price}</div>
                        </div>
                        <div className="cart-btn-wrap">
                            <a className="btn cart-btn" style={{ color: 'white', ...buttonStyle }} onClick={addProductToCart}>
                                {buttonText}
                            </a>
                        </div>
                        <div className="compaign-btn">
                            <button onClick={() => window.open('https://www.facebook.com/sharer/sharer.php?u=https://example.com/', 'facebook-share-dialog', 'width=800,height=600')}>
                                <img src="/path/to/compaign-btn.png" alt="" style={{ cursor: 'pointer', maxWidth: '100%' }} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer /> 
        </div>
    );
};

export default ProductDetail;

