import React from 'react';
import "../../css/Styles.css"

const FooterCompanyLinks = () => {
  return (
    <div className="col-lg-2 col-md-6 col-sm-5 col-6 footer-list-29 footer-2 mt-sm-0">
      <ul style={{textAlign:"left"}}>
        <h6 className="footer-title-29">COMPANY</h6>
        <li><a className='footerLinks' href="/aboutUs">About Us</a></li>
        <li><a className='footerLinks' href="/recentLuckyDraws">Recent Lucky Draws</a></li>
        <li><a className='footerLinks' href="/blogs">Blogs</a></li>
      </ul>
    </div>
  );
}

export default FooterCompanyLinks;
