import React from 'react'
import axios from "axios";
import styles from "./Content.css"
import { styled } from '@mui/material/styles';
import { Button, Box, Typography, Rating, Modal } from '@mui/material';
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

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function Content() {

  const [shirtURLS, setShirtURLS] = React.useState([]);
  const [shirtIndex, setShirtIndex] = React.useState(0);
  const [bottomURLS, setBottomURLS] = React.useState([]);
  const [bottomIndex, setBottomIndex] = React.useState(0);
  const [rating, setRating] = React.useState(1);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


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

  const handleClickRecommend = async (e) => {
    e.preventDefault();
    const firstRequest = await axios.get('/ratings');
    // Split the string by space
    const parts = firstRequest.data.split(" ");
    var shirtID = parts[0];
    var bottomID = parts[1];
    const shirtRequest = await axios.get(`http://localhost:8000/shirts/${shirtID}`);
    const bottomRequest = await axios.get(`http://localhost:8000/bottoms/${bottomID}`);
    const foundShirtURL = (url) => url === shirtRequest.data;
    const foundBottomURL = (url) => url === bottomRequest.data;
    setShirtIndex(shirtURLS.findIndex(foundShirtURL));
    setBottomIndex(bottomURLS.findIndex(foundBottomURL));
  }


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
      <button 
      id = 'rateBtn'
      className='carouselBtn'
      onClick={handleOpen}>Rate Me</button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            '& > legend': { mt: 2 },
            backgroundColor: 'white',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
          className="ratingBox"
        >
          <Typography component="legend">Rate this combo</Typography>
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
      </Modal>

      <div id="carousel">
        <div id='topCarousel'>
          <div className='carouselWrapper'>
            <img src={shirtURLS[shirtIndex]} alt={shirtURLS[shirtIndex]}/>
          </div>
        </div>
        <div className='carouselBtnWrapper'>
          <button onClick={handleClickShirtBackward} className='carouselBtn'>◂◂</button>
          <button onClick={handleClickRecommend} className='carouselBtn'>▸</button>
          <button  onClick={handleClickShirtForward} className='carouselBtn'>▸▸</button>
        </div>
        <div id='bottomCarousel'>
          <div className='carouselWrapper'>
            <img src={bottomURLS[bottomIndex]} alt={bottomURLS[bottomIndex]}/>
          </div>
        </div>
        <div className='carouselBtnWrapper'>
          <button onClick={handleClickBottomBackward} className='carouselBtn'>◂◂</button>
          <button onClick={handleClickRecommend} className='carouselBtn'>▸</button>
          <button onClick={handleClickBottomForward} className='carouselBtn'>▸▸</button>
        </div>
      </div>
      <button 
      id = 'rateBtn'
      className='carouselBtn'
      onClick={handleClickRecommend}>Pick For Me</button>

    </div>
    
  );
}

export default Content;