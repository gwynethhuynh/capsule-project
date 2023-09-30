import { Link } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Uploader from "../Uploader/Uploader";


const AddItem = () => {
    return (
      <div>
        <Header></Header>
          <Uploader></Uploader>
        <Footer></Footer>
      </div>
    );
  };
  
  export default AddItem;