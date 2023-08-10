import React from 'react'
import styles from "./Footer.css"

function Footer() {
  return (
    <div className="footerWrapper">
      <ul style={{listStyleType: 'none'}} className="footerList">
        <li className="footerListItem">SHOES</li>
        <li className="footerListItem">JEWELRY</li>
        <li className="footerListItem">SCARVES</li>
        <li className="footerListItem">PANTYHOSE</li>
        <li className="footerListItem">UNDERWEAR</li>
        <li className="footerListItem">JACKETS</li>
        <li className="footerListItem">SWEATERS</li>
      </ul>
    </div>

  );
}

export default Footer;