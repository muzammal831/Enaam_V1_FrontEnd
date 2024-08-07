import React from 'react';

const FooterAppDownload = () => {
  return (
    <div>
      <h6 className="footer-title-29 pt-2 mt-4 mb-3">Download the App</h6>
      <div>
        <a href="https://play.google.com/store/apps/details?id=com.app.enaam">
          <img src={require("../../images/google.png")} alt="" />
        </a>
        <a href="https://apps.apple.com/pk/app/enaam/id6450613357">
          <img src={require("../../images/apple.png")} alt="" />
        </a>
      </div>
    </div>
  );
}

export default FooterAppDownload;