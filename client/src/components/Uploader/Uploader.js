// Source: https://dev.to/charleskasasira/how-to-create-custom-file-upload-input-control-with-react-and-css-48fn
import { useState, useEffect } from 'react'
import './Uploader.css'
import { MdCloudUpload, MdDelete } from 'react-icons/md'
import { AiFillFileImage } from 'react-icons/ai'
import axios from 'axios';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import { Button } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';





function Uploader() {

  const [imageURL, setImageURL] = useState(null);
  const [file, setFile] = useState(null);
  const [value, setValue] = useState('shirt');
  const [fileName, setFileName] = useState("No selected file");
  const [error, setError] = useState(false);

  useEffect(() => {
    console.log(fileName)
  }, [fileName])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!file) {
      console.log("No file selected.");
      setError(true);
      return; // Prevent further execution if no file is selected
    }
    console.log("handling submit!");
    console.log("Submitted File: ", fileName);
    try {
      const formData = new FormData();
      formData.append("fileName", fileName);
      formData.append("imageURL", imageURL);
      formData.append("image", file);
      formData.append("category", value);
      console.log("Image", file);
      const res = await axios.post( "http://localhost:8000/shirts", formData, { headers: {'Content-Type': 'multipart/form-data'}});
      console.log("Response on react side!", res);
    } catch (ex) {
      console.log(ex);
    }
  }

  const handleChange = (event) => {
    console.log(event.target.value);
    setValue(event.target.value);
  };

  // Called when we upload an image file
  const fileSelected = event => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      console.log("FILE", selectedFile);
      setFileName(selectedFile.name);
      setFile(selectedFile);
      setImageURL(URL.createObjectURL(selectedFile));
      setError(false); // Clear the error state when a file is selected
    } else {
      // Handle the case where the user cleared the file input
      setFileName("No selected file");
      setFile(null);
      setImageURL(null); 
    }
	}

  console.log("during render: ", fileName);
  return (
    <main>
      <form
      onClick={() => document.querySelector(".file-input").click()}
      action="/posts" method="POST" enctype="multipart/form-data">
        <input 
          type="file" 
          accept='image/*' 
          className='file-input' 
          hidden 
          onChange={fileSelected}/>
        {imageURL ? (
          <img 
            src={imageURL} 
            // width={150} 
            // height={150} 
            alt={fileName} 
          />
        ) : (
          <>
            <MdCloudUpload color='#2196f3' size={60} />
            <p>Browse Files to upload</p>
          </>
        )}
        {error && (
          <div className="error-box" style={{ backgroundColor: 'red', color: 'white', padding: '8px', borderRadius: '4px' }}>
            Please select an image.
          </div>
        )}
      </form>

      <section className='uploaded-row'>
        <AiFillFileImage color='#020202' />
        <span className='upload-content'>
          {fileName} - 
          <MdDelete
          onClick={() => {
            setFileName("No selected File")
            setImageURL(null)
          }}
          color='#020202'
           />
        </span>
      </section>

      <Box sx={{ minWidth: 120, backgroundColor: 'white'}}>
        <FormControl fullWidth>
          <FormLabel id="demo-simple-select-label">Clothing Category</FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            value={value}
            label="Category"
            onChange={handleChange}
          >
            <FormControlLabel control={<Radio />} value={'shirt'} label="Shirt" />
            <FormControlLabel control={<Radio />}  value={'bottom'} label="Bottom" />
          </RadioGroup>
          <Button type="submit" onClick={handleSubmit}>Submit</Button>
        </FormControl>
      </Box>
    </main>
  )
}

export default Uploader
