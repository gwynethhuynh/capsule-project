import { Link } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Uploader from "../Uploader/Uploader";


const Profile = () => {
    return (
      <div>
        <Header></Header>
        {/* <h1>Hello from profile page!</h1>
        <p>So, how are you?</p>
        <Link to="/">App page</Link>
        <form action="example.com/path" method="post">
            <label for="Clothing Item">Load image of clothing item you would like to add</label>
            <input type="file" id="clothes_image" name="clothes_image"></input>
            <button type="submit">Submit</button>
        </form> */}
        <Uploader></Uploader>
        <Footer></Footer>
      </div>
    );
  };
  
  export default Profile;