import React from 'react'
import axios from "axios";
import styles from "./Content.css"
// Source for loading image: https://stackoverflow.com/questions/34582405/react-wont-load-local-images
// Source for storing images in backend

function Content() {

  const [shirtURLS, setShirtURLS] = React.useState([]);
  const baseURL = "http://127.0.0.1:8000/shirts";

  React.useEffect(() => {
    axios.get("http://localhost:8000/shirts")
    .then(res => {
      setShirtURLS(res.data);
      console.log("GET REQUEST SHIRTS", res.data);
    })
    
  }, []);

  const handleClickShirt = (e) => {
    e.preventDefault();
    console.log("HANDLING CLICK SHIRT!");
    // Choose next shirt 
  };

  const handleClickBottom = (e) => {
    e.preventDefault();
    console.log("HANDLING CLICK BOTTOM!");
    // Choose next bottom 
  };
  

  return (
    <div className='contentWrapper'>
      <div id="carousel">
        <div id='topCarousel'>
          <div className='carouselWrapper'>
            {/* <img src={require("./../../images/ballad.jpeg")} alt="Ballad Camisole"/> */}
            {/* <p>{shirt.shirt_img}</p> */}
            {/* <img src={shirt.shirt_img} alt="Ballad Camisole"/> */}
            <img src="https://capsule-project.s3.us-west-1.amazonaws.com/ballad.png" alt="Ballad Camisole"/>
            {/* <p className='carouselText'>Top Carousel</p> */}
          </div>
        </div>
        <div className='carouselBtnWrapper'>
          <button onClick={handleClickShirt} className='carouselBtn'>◂◂</button>
          <button className='carouselBtn'>▸</button>
          <button className='carouselBtn'>▸▸</button>
        </div>
        <div id='bottomCarousel'>
          <div className='carouselWrapper'>
            <img src={require("./../../images/effortless.webp")} alt="Ballad Camisole"/>
            {/* <p className='carouselText'>Bottom Carousel</p> */}
          </div>
        </div>
        <div className='carouselBtnWrapper'>
          <button className='carouselBtn'>◂◂</button>
          <button className='carouselBtn'>▸</button>
          <button className='carouselBtn'>▸▸</button>
        </div>
      </div>

    </div>
    
  );
}

export default Content;