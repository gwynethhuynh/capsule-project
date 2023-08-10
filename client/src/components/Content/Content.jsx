import React from 'react'
import axios from "axios";
import styles from "./Content.css"
// Source for loading image: https://stackoverflow.com/questions/34582405/react-wont-load-local-images
// Source for storing images in backend

function Content() {

  const [shirtURLS, setShirtURLS] = React.useState([]);
  const [shirtIndex, setShirtIndex] = React.useState(0);
  const [bottomURLS, setBottomURLS] = React.useState([]);
  const [bottomIndex, setBottomIndex] = React.useState(0);
  const baseURL = "http://127.0.0.1:8000/shirts";

  React.useEffect(() => {
    axios.get("http://localhost:8000/shirts")
    .then(res => {
      setShirtURLS(res.data);
      console.log("GET REQUEST SHIRTS", res.data);
    })
    axios.get("http://localhost:8000/bottoms")
    .then(res => {
      setBottomURLS(res.data);
      console.log("GET REQUEST BOTTOMS", res.data);
    })
  }, []);

  const handleClickShirtForward = (e) => {
    e.preventDefault();
    console.log("HANDLING CLICK SHIRT!");
    // Choose next shirt 
    setShirtIndex((shirtIndex + 1) % shirtURLS.length)
  };
  const handleClickShirtBackward = (e) => {
    e.preventDefault();
    console.log("HANDLING CLICK SHIRT!");
    // Choose next shirt 
    setShirtIndex((shirtIndex - 1) % shirtURLS.length)
  };

  const handleClickBottomForward = (e) => {
    e.preventDefault();
    console.log("HANDLING CLICK BOTTOM!");
    // Choose next bottom 
    setBottomIndex((bottomIndex + 1) % bottomURLS.length)
  };

  const handleClickBottomBackward = (e) => {
    e.preventDefault();
    console.log("HANDLING CLICK BOTTOM!");
    // Choose next bottom 
    setBottomIndex((bottomIndex - 1) % bottomURLS.length)
  };
  

  return (
    <div className='contentWrapper'>
      <div id="carousel">
        <div id='topCarousel'>
          <div className='carouselWrapper'>
            {/* <img src={require("./../../images/ballad.jpeg")} alt="Ballad Camisole"/> */}
            {/* <p>{shirt.shirt_img}</p> */}
            <img src={shirtURLS[shirtIndex]} alt={shirtURLS[shirtIndex]}/>
            {/* <img src="https://capsule-project.s3.us-west-1.amazonaws.com/ballad.png" alt="Ballad Camisole"/> */}
            {/* <p>{shirtURLS[0]}</p> */}
            {/* <p className='carouselText'>Top Carousel</p> */}
          </div>
        </div>
        <div className='carouselBtnWrapper'>
          <button onClick={handleClickShirtBackward} className='carouselBtn'>◂◂</button>
          <button className='carouselBtn'>▸</button>
          <button  onClick={handleClickShirtForward} className='carouselBtn'>▸▸</button>
        </div>
        <div id='bottomCarousel'>
          <div className='carouselWrapper'>
            <img src={bottomURLS[bottomIndex]} alt={bottomURLS[bottomIndex]}/>
            {/* <p className='carouselText'>Bottom Carousel</p> */}
          </div>
        </div>
        <div className='carouselBtnWrapper'>
          <button onClick={handleClickBottomBackward} className='carouselBtn'>◂◂</button>
          <button className='carouselBtn'>▸</button>
          <button onClick={handleClickBottomForward} className='carouselBtn'>▸▸</button>
        </div>
      </div>

    </div>
    
  );
}

export default Content;