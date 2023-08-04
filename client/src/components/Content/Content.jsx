import React from 'react'
import axios from "axios";
import styles from "./Content.css"
// Source for loading image: https://stackoverflow.com/questions/34582405/react-wont-load-local-images
// Source for storing images in backend

function Content() {

  const [shirt, setShirts] = React.useState([]);
  const baseURL = "http://127.0.0.1:8000/shirts";
  // React.useEffect(() => {
  //   axios.get(baseURL).then((response) => {
  //     console.log(response);
  //     setShirts(response.data[0]);
  //   });
  // }, []);

  // const handleChange = (e) => {
  //   const value = e.target.value;
  //   setData({
  //     ...data,
  //     [e.target.name]: value
  //   });
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("HANDLING SUBMIT!");
    const userData = {
      name: "Ken",
      job: "Beach"
    };
    axios.post(baseURL, userData).then((response) => {
      console.log(response.status, response.data);
    });
  };
  
  // React.useEffect(() => {
  //   axios.post(baseURL, {
  //     firstName: 'Fred', 
  //     lastName: 'Flinstone'
  //   })
  //   .then((response) => {
  //     console.log(response);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   })
  // });

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
          <button onClick={handleSubmit} className='carouselBtn'>◂◂</button>
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