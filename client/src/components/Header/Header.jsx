import React from 'react';
import axios from "axios";
import styles from "./Header.css";


const Header = () => {

  return (
    <div className='headerWrapper'>
      <div className='headerLeft'>
        <p className='headerLabel'>GWEN'S WARDROBE</p>
      </div>
      <div className='headerRight'>
        <p></p>
      </div>
    </div>    
  );
}

export default Header;