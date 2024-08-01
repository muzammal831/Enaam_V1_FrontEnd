


import React, { useEffect, useState } from 'react';
import { getProducts } from '../../../Services/GetAPI'; // Adjust the import path if necessary
import ProductCard from '../../../Components/SubComponents/ProductCard';
import Loader from '../../../Components/LoaderComponent';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for HTTP requests

const ProductsListComponent = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const addProductToCart = async (id) => {
        try {
            const product = products.find(item => item.id === id);
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
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if (error.response.status === 401) {
                    alert('You need to login first');
                    navigate('/dashboard/login');
                } else {
                    alert(`Failed to add product to cart: ${error.response.data.message}`);
                }
            } else if (error.request) {
                // The request was made but no response was received
                alert('No response from the server. Please try again later.');
            } else {
                // Something happened in setting up the request that triggered an Error
                alert(`Error: ${error.message}`);
            }
        }
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts();
                setProducts(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching products:', error);
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
            </div>
        </section>
    );
};

export default ProductsListComponent;


