import React from 'react';
import FooterAppDownload from './FooterAppDownload';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome CSS

const FooterSocialLinks = () => {
  return (
    <div className="col-lg-5 col-md-6 col-sm-7 footer-list-29 footer-4 mt-lg-0" style={{display:"flex",flexDirection:"column",alignItems:"flex-end"}}>
      <div className="social-wrap" style={{alignSelf:"center"}}>
        <div className="main-social-footer-29 mt-4">
          <a href="https://www.facebook.com/profile.php?id=100091683138802&mibextid=ZbWKwL" className="facebook">
            <span className="fab fa-facebook-f"></span>
          </a>
          <a href="https://twitter.com/enaampkofficial" className="twitter">
            <span className="fab fa-twitter"></span>
          </a>
          <a href="https://www.tiktok.com/@enaampk" className="tiktok">
            <span className="fab fa-tiktok"></span>
          </a>
          <a href="https://instagram.com/enaampk.official?igshid=MzRlODBiNWFlZA==" className="instagram">
            <span className="fab fa-instagram"></span>
          </a>
          <a href="https://www.youtube.com/@enaampk" className="youtube">
            <span className="fab fa-youtube"></span>
          </a>
          <a href="https://wa.me/+923211118392" className="whatsapp">
            <span className="fab fa-whatsapp"></span>
          </a>
        </div>
      </div>
      <FooterAppDownload />
    </div>
  );
}

export default FooterSocialLinks;
