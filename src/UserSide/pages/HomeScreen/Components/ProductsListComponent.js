import React, { useEffect, useState } from 'react';
import { getProducts } from '../../../Services/GetAPI';
import ProductCard from '../../../Components/SubComponents/ProductCard';
import Loader from '../../../Components/LoaderComponent';
import { useNavigate } from 'react-router-dom';




const ProductsListComponent = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const addProductToCart = (event, id) => {
        alert(JSON.stringify(id))
        navigate(`/details/${id}`);
    };

    useEffect(() => {
        getProducts()
            .then(data => {
                setProducts(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching FAQs:', error);
                setLoading(false);
            });
    }, []);
    return (
        <section>
            <div class="container">
                <div class="row align-items-center video-bg show-on-mobile">
                    <div class="col-lg-12 content-sec-1">
                        <h3 class="title-style mb-3 " style={{ fontWeight: "bold" }}>Prizes</h3>
                    </div>
                </div>
                <div style={{ marginTop: 20 }}>

                    {loading ? (
                        <Loader />
                    ) : (products.map((item, index) => <ProductCard
                        product={item}
                        buttonText="Add to Cart"
                        addProductToCart={addProductToCart}
                        percentage={item?.sold}
                        progress_bar_class="progress-bar"
                    />))}
                </div>
            </div>
        </section>
    );
};

export default ProductsListComponent;
