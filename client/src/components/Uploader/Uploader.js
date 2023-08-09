// Source: https://dev.to/charleskasasira/how-to-create-custom-file-upload-input-control-with-react-and-css-48fn
import { useState, useEffect } from 'react'
import './Uploader.css'
import { MdCloudUpload, MdDelete } from 'react-icons/md'
import { AiFillFileImage } from 'react-icons/ai'
import axios from 'axios';



function Uploader() {

  const [imageURL, setImageURL] = useState(null);
  const [file, setFile] = useState(null);
  const [itemName, setItemName] = useState("");
  const [itemType, setItemType] = useState("");
  const [fileName, setFileName] = useState("No selected file");

  useEffect(() => {
    console.log(fileName)
  }, [fileName])

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Try axios post 
    console.log("Submitted File: ", fileName);
    try {
      const formData = new FormData();
      formData.append("fileName", fileName);
      formData.append("imageURL", imageURL);
      formData.append("image", file);
      console.log("Image", file);
      const res = await axios.post( "http://localhost:8000/shirts", formData, { headers: {'Content-Type': 'multipart/form-data'}});
      console.log("Response on react side!", res);
    } catch (ex) {
      console.log(ex);
    }
  }

  const fileSelected = event => {
    const file = event.target.files[0];
    console.log("FILE", file)
    console.log("FILENAME", file.name);
    setFileName(file.name);
    setFile(file);
		setImageURL(URL.createObjectURL(file));
	}
  console.log("during render: ", fileName);
  return (
    <main>
      <form
      onClick={() => document.querySelector(".input-field").click()}
      action="/posts" method="POST" enctype="multipart/form-data">
        <input type="file" accept='image/*' className='input-field' hidden 
        // onChange={({ target: {files}}) => {
        //   files[0] && setFileName(files[0].name)
        //   if(files){
        //     setImage(URL.createObjectURL(files[0]))
        //     console.log("File name!: ", fileName);
        //   }
        // }}
        onChange={fileSelected}
         />

        {imageURL ?
        <img src={imageURL} width={150} height={150} alt={fileName} />
        : 
        <>
        <MdCloudUpload color='#020202' size={60} />
        <p>Browse Files to upload</p>
        </>
      }

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
           />
        </span>
        
      </section>
      <section className='uploaded-row'>
        <span className='upload-content' onClick={handleSubmit}>
          SUBMIT
        </span>
      </section>
      
      <button onClick={handleSubmit}>
        SUBMIT
      </button>


    </main>
  )
}

export default Uploader
