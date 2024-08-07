import React from 'react';
import "../../css/Styles.css"

const FooterBottom = () => {
  return (
    <div className="w3l-copyright">
      <div className="container-fluid col-lg-10">
        <div className="row bottom-copies align-items-center">
          <p className="col-lg-8 copy-footer-29" style={{display:"flex",alignItems:"center"}}>
            <img src={require("../../images/ammanah.png")} alt="" /> © 2023 — enaam.pk. All Rights Reserved.
          </p>
          <div className="col-lg-4 footer-list-29 footer-copy-list">
            <ul className="text-lg-right">
              <li>We accept</li>
              <li className="mx-lg-2 mx-md-2 mx-2">
                <a><img src={require("../../images/jazz.png")} alt="" /></a>
              </li>
              <li>
                <a><img src={require("../../images/easypaisa.png")} alt="" /></a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FooterBottom;
