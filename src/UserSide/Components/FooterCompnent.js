import React from 'react';
import FooterTop from './SubComponents/FooterTop';
import FooterBottom from './SubComponents/FooterBottom';


const Footer = () => {
  return (
    <footer className="w3l-footer-29-main">
      <div className="footer-29-w3l py-5">
        <div className="container-fluid col-lg-10 py-4 position-relative">
          <FooterTop />
        </div>
      </div>
      <FooterBottom/>
    </footer>
  );
}

export default Footer;
