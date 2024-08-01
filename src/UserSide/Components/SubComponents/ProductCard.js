// import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import "../../css/ProductList.css";
// import { Colors } from '../../globals/colors';
// const ProductCard = ({ product, addProductToCart, percentage, progress_bar_class }) => {
//   return (
//     <div className="col-md-12 tikker glow">
//       <div className="row">
//         <div className="col-md-3">
//           <div className="p-0 position-relative">
//             <a href={`product-detail.php?id=${product.id}&reward=${product?.reward?.name}`} className="zoom d-block">
//               <img className="card-img-bottom d-block" src={product?.reward?.image} style={{ borderRadius: 20 }} alt="Card image cap" />
//             </a>
//           </div>
//         </div>
//         <div className="col-md-7">
//           <div className="card-body course-details pb-0" style={{ display: "flex", flexDirection: "column", justifyContent: "space-evenly", height: "100%", alignItems: 'flex-start' }}>
//             <a style={{ textDecoration: "none", color: Colors.themeColor }} href={`product-detail.php?id=${product?.id}&reward=${product?.reward?.name}`}>
//               <h3 className="mb-sm-2 title">
//                 <span className="d-block-res">Win</span> {product?.reward?.name}
//               </h3>
//             </a>
//             <p className="mb-3" style={{ textAlign: "left" }}>{product?.description}</p>
//             <div style={{ display: "flex" }} />
//             <div className="mt-md-1 mb-lg-0 mb-4">
//               <a className={"prizeDetailsButton"} href={`product-detail.php?id=${product?.id}&reward=${product?.reward?.name}`}>Prize Details</a>
//               <button className={"addCartButton"} onClick={() => { if (percentage < 100) addProductToCart(product?.id); }}>Add to Cart</button>
//             </div>
//           </div>
//         </div>
//         <div className="col-md-2 hide-on-mobile prizes-values">
//           <div className="value-status">
//             <div>
//               <h6 className="mb-0 card-heading">
//                 <p>{product.sold} Entries out of {product?.quantity}</p>
//               </h6>
//               <div className="progress">
//                 <div className={progress_bar_class} role="progressbar" style={{ width: `${percentage}%` }} aria-valuenow={percentage} aria-valuemin="0" aria-valuemax="100"></div>
//               </div>
//             </div>
//             <div>
//               <img
//                 src={require("../../images/upload.png")}
//                 style={{ cursor: 'pointer' }}
//                 alt=""
//                 onClick={() => window.open('https://www.facebook.com/sharer/sharer.php?u=https://enaam.pk/', 'facebook-share-dialog', 'width=800,height=600')}
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default ProductCard;
// src/components/ProductCard.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../css/ProductList.css";
import { Colors } from '../../globals/colors';
import { Link } from 'react-router-dom';

const ProductCard = ({ product, addProductToCart, percentage, progress_bar_class }) => {
    return (
        <div className="col-md-12 tikker glow">
            <div className="row">
                <div className="col-md-3">
                    <div className="p-0 position-relative">
                        <Link to={`/product/${product.id}`} className="zoom d-block">
                            <img className="card-img-bottom d-block" src={product.reward.image} style={{ borderRadius: 20 }} alt="Card image cap" />
                        </Link>
                    </div>
                </div>
                <div className="col-md-7">
                    <div className="card-body course-details pb-0" style={{ display: "flex", flexDirection: "column", justifyContent: "space-evenly", height: "100%", alignItems: 'flex-start' }}>
                        <Link to={`/product/${product.id}`} style={{ textDecoration: "none", color: Colors.themeColor }}>
                            <h3 className="mb-sm-2 title">
                                <span className="d-block-res">Win</span> {product.reward.name}
                            </h3>
                        </Link>
                        <p className="mb-3" style={{ textAlign: "left" }}>{product.description}</p>
                        <div style={{ display: "flex" }} />
                        <div className="mt-md-1 mb-lg-0 mb-4">
                            <Link className={"prizeDetailsButton"} to={`/product/${product.id}`}>Prize Details</Link>
                            <button className={"addCartButton"} onClick={() => { if (percentage < 100) addProductToCart(product.id); }}>Add to Cart</button>
                        </div>
                    </div>
                </div>
                <div className="col-md-2 hide-on-mobile prizes-values">
                    <div className="value-status">
                        <div>
                            <h6 className="mb-0 card-heading">
                                <p>{product.sold} Entries out of {product.quantity}</p>
                            </h6>
                            <div className="progress">
                                <div className={progress_bar_class} role="progressbar" style={{ width: `${percentage}%` }} aria-valuenow={percentage} aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                        </div>
                        <div>
                            <img
                                src={require("../../images/upload.png")}
                                style={{ cursor: 'pointer' }}
                                alt=""
                                onClick={() => window.open('https://www.facebook.com/sharer/sharer.php?u=https://enaam.pk/', 'facebook-share-dialog', 'width=800,height=600')}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
