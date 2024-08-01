import React from 'react';
import FooterCompanyLinks from './FooterCompanyLinks';
import FooterSupportLinks from './FooterSupportLinks';
import FooterSocialLinks from './FooterSocialLinks';
import FooterAppDownload from './FooterAppDownload';
import CartIcon from '../../pages/HomeScreen/Components/CartIcon';

const FooterTop = () => {
  return (
    <div className="row footer-top-29">
      <div className="shipping-card text-right">
        <a href="/cart" className="shopping-cart-button">
          <span id="cartQuantity" className="cart-quantity position-absolute top-0 end-0 translate-middle badge rounded-pill bg-danger"></span>
          <img src="assets/images/cart.png" alt="" style={{ maxWidth: '100%' }} />
          <span className="hide-on-mobile">
            {/* <div className='d-flex align-items-center justify-content-center'> */}
           <CartIcon />
            - Shopping cart
            {/* </div> */}
            </span>
        </a>
      </div>
      <FooterCompanyLinks />
      <FooterSupportLinks />
      <div className="col-lg-3"></div>
      <FooterSocialLinks />
    </div>
  );
}

export default FooterTop;
