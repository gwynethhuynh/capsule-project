// Source: https://dev.to/charleskasasira/how-to-create-custom-file-upload-input-control-with-react-and-css-48fn
import { useState } from 'react'
import './Uploader.css'
import { MdCloudUpload, MdDelete } from 'react-icons/md'
import { AiFillFileImage } from 'react-icons/ai'
import axios from 'axios';

function Uploader() {

  const [image, setImage] = useState(null)
  const [fileName, setFileName] = useState("No selected file")

  const uploadFile = async (e) => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("fileName", fileName);
    console.log(fileName);
    try {
      const res = await axios.post(
      "http://localhost:8000/upload",
      formData
      );
      console.log(res);
    } catch (ex) {
      console.log(ex);
    }
  }
  console.log("during render: ", fileName);
  return (
    <main>
      <form
      onClick={() => document.querySelector(".input-field").click()}
      >
        <input type="file" accept='image/*' className='input-field' hidden 
        onChange={({ target: {files}}) => {
          files[0] && setFileName(files[0].name)
          if(files){
            setImage(URL.createObjectURL(files[0]))
            console.log("File name!: ", fileName);
            uploadFile();
          }
        }}
         />

        {image ?
        <img src={image} width={150} height={150} alt={fileName} />
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
            setImage(null)
          }}
           />
        </span>
      </section>

    </main>
  )
}

export default Uploader