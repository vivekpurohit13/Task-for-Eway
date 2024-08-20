import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logos">

            <img src="https://statics.olx.in/external/base/img/cartrade/logo/cartrade_tech.svg?v=1" alt="CarTradeTech" />
            <hr />
            
            <img src="https://statics.olx.in/external/base/img/cartrade/logo/olx.svg?v=1" alt="OLX" />

            <img src="https://statics.olx.in/external/base/img/cartrade/logo/carwale.svg?v=1" alt="CarWale" />

            <img src="https://statics.olx.in/external/base/img/cartrade/logo/bikewale.svg?v=1" alt="BikeWale" />

            <img src="https://statics.olx.in/external/base/img/cartrade/logo/cartrade.svg?v=1" alt="CarTrade" />

            <img src="https://statics.olx.in/external/base/img/cartrade/logo/mobility.svg?v=1" alt="Mobility Outlook" />

        </div>
        <div className="footer-text">
          <p><a href="https://www.olx.in/sitemap/" target="_blank" rel="noopener noreferrer">Sitemap</a></p>
          <p>Free Classifieds in India. © 2006-2024 OLX</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
