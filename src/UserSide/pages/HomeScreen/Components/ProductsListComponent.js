import React, { useEffect, useState } from 'react';
import { getProducts } from '../../../Services/GetAPI'; 
import ProductCard from '../../../Components/SubComponents/ProductCard';
import Loader from '../../../Components/LoaderComponent';
import { useApp } from '../../../Services/AppContext';

const ProductsListComponent = () => {
    const { loading, products } = useApp();

    useEffect(() => {
        getProducts()
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
