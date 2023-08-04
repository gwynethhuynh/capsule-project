import React from 'react';
import axios from "axios";
import styles from "./Header.css";



const Header = () => {
  const [post, setPost] = React.useState([]);
  const baseURL = "http://127.0.0.1:8000/shirts";

  React.useEffect(() => {
    axios.get(baseURL).then((response) => {
      console.log(response);
      setPost(response.data[0]);
    });
  }, []);
  return (
    <div className='headerWrapper'>
      <div className='headerLeft'>
        <p className='headerLabel'>GWEN'S WARDROBE</p>
        <p className='headerLabel'>{post.shirt_name}</p>
      </div>
      <div className='headerRight'>
        <p></p>
      </div>
    </div>    
  );
}

export default Header;