import React from 'react'
import styles from "./Content.css"
// Source for loading image: https://stackoverflow.com/questions/34582405/react-wont-load-local-images
// Source for storing images in backend

function Content() {
  return (
    <div className='contentWrapper'>
      <div id="carousel">
        <div id='topCarousel'>
          <div className='carouselWrapper'>
            <img src={require("./../../images/ballad.jpeg")} alt="Ballad Camisole"/>
            {/* <p className='carouselText'>Top Carousel</p> */}
          </div>
        </div>
        <div className='carouselBtnWrapper'>
          <button className='carouselBtn'>◂◂</button>
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