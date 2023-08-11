import React from 'react'
import axios from "axios";
import styles from "./Content.css"
import { styled } from '@mui/material/styles';
import { Button, Box, Typography, Rating } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
// import {FavoriteIcon, FavoriteBorderIcon} from '@mui/icons-material';
// Source for loading image: https://stackoverflow.com/questions/34582405/react-wont-load-local-images
// Source for storing images in backend

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#ff6d75',
  },
  '& .MuiRating-iconHover': {
    color: '#ff3d47',
  },
});

function Content() {

  const [shirtURLS, setShirtURLS] = React.useState([]);
  const [shirtIndex, setShirtIndex] = React.useState(0);
  const [bottomURLS, setBottomURLS] = React.useState([]);
  const [bottomIndex, setBottomIndex] = React.useState(0);
  const [rating, setRating] = React.useState(1);
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
    // Choose next shirt 
    setShirtIndex(((shirtIndex - 1) + shirtURLS.length) % shirtURLS.length)
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
    setBottomIndex(((bottomIndex - 1) + bottomURLS.length) % bottomURLS.length)
  };

  const handleClickRate = async (e) => {
    e.preventDefault();
    // Upload rating
    console.log("Shirt", shirtURLS[shirtIndex]);
    console.log("Bottom", bottomURLS[bottomIndex]);
    console.log("Rating", rating);
    try {
      const formData = new FormData();
      formData.append("shirtURL", shirtURLS[shirtIndex]);
      formData.append("bottomURL", bottomURLS[bottomIndex]);
      formData.append("rating", rating);
      const res = await axios.post( "http://localhost:8000/ratings", formData, { headers: {'Content-Type': 'multipart/form-data'}});
      console.log("Response on react side!", res);
    } catch (ex) {
      console.log(ex);
    }
  }

  return (
    <div className='contentWrapper'>
      <Box
        sx={{
          '& > legend': { mt: 2 },
          backgroundColor: 'white',
        }}
      >
        <Typography component="legend">Rate this combo {rating}</Typography>
        <StyledRating
          name="customized-color"
          value={rating}
          getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
          precision={1}
          max={10}
          icon={<FavoriteIcon fontSize="inherit" />}
          emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
          onChange={(event, newValue)=>{setRating(newValue)}}
        />
        <Button sx={{
          '& > legend': { mt: 2 },
          backgroundColor: 'gray',
          color: 'black'
        }} onClick={handleClickRate} >Rate</Button>

      </Box >
      <div id="carousel">
        <div id='topCarousel'>
          <div className='carouselWrapper'>
            <img src={shirtURLS[shirtIndex]} alt={shirtURLS[shirtIndex]}/>
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