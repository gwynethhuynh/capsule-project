import { Link } from "react-router-dom";


const Profile = () => {
    return (
      <div>
        <h1>Hello from profile page!</h1>
        <p>So, how are you?</p>
        <Link to="/">App page</Link>
        <form action="example.com/path" method="post">
            <label for="Clothing Item">Load image of clothing item you would like to add</label>
            <input type="file" id="clothes_image" name="clothes_image"></input>
            <button type="submit">Submit</button>
        </form>
      </div>
    );
  };
  
  export default Profile;