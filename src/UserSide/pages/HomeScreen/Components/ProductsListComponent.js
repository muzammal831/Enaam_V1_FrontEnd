

import React, { useEffect, useState } from 'react';
import { getProducts } from '../../../Services/GetAPI'; // Adjust the import path if necessary
import ProductCard from '../../../Components/SubComponents/ProductCard';
import Loader from '../../../Components/LoaderComponent';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for HTTP requests
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for react-toastify

const ProductsListComponent = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const addProductToCart = async (id) => {
        try {
            const product = products.find(item => item.id === id);
            const response = await axios.post('http://3.138.38.248/Enaam_Backend_V1/public/api/cart/add', {
                product_id: product.id,
                quantity: 1, // Default quantity
                price: product.price
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            toast.success('Product added to cart successfully');
            navigate('/cart');
        } catch (error) {
            console.error('Error adding product to cart:', error);
            if (error.response) {
                if (error.response.status === 401) {
                    toast.error('You need to login first');
                    navigate('/');
                } else {
                    toast.error(`Failed to add product to cart: ${error.response.data.message}`);
                }
            } else if (error.request) {
                toast.error('No response from the server. Please try again later.');
            } else {
                toast.error(`Error: ${error.message}`);
            }
        }
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://3.138.38.248/Enaam_Backend_V1/public/api/products', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if (response.data.status === 200) {
                    setProducts(response.data.products);
                    toast.success(response.data.message);
                } else {
                    toast.error('Failed to fetch products');
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching products:', error);
                toast.error('An error occurred while fetching products');
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    return (
        <section>
            <div className="container-fluid col-lg-10">
                <div className="row align-items-center video-bg show-on-mobile">
                    <div className="col-lg-12 content-sec-1">
                        <h3 className="title-style mb-3" style={{ fontWeight: "bold" }}>Prizes</h3>
                    </div>
                </div>
                <div style={{ marginTop: 20 }}>
                    {loading ? (
                        <Loader />
                    ) : (
                        products.map((item, index) => (
                            <ProductCard
                                key={index}
                                product={item}
                                buttonText="Add to Cart"
                                addProductToCart={addProductToCart}
                                percentage={item.sold}
                                progress_bar_class="progress-bar"
                            />
                        ))
                    )}
                </div>
                <ToastContainer /> {/* Add the ToastContainer */}
            </div>
        </section>
    );
};

export default ProductsListComponent;
