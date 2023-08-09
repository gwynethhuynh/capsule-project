import React, { useState } from 'react';
import axios from 'axios';

const User = () => {
    const [newUser, setNewUser] = useState(
        {
            name: '',
            birthdate: '',
            photo: '',
        }
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('photo', newUser.photo);
        console.log("PHOTO", newUser.photo);
        axios.post("http://localhost:8000/shirts", formData)
             .then(res => {
                console.log(res);
             })
             .catch(err => {
                console.log(err);
             });
    }

    const handleChange = (e) => {
        setNewUser({...newUser, [e.target.name]: e.target.value});
    }

    const handlePhoto = (e) => {
        setNewUser({...newUser, photo: e.target.files[0]});
    }

    return (
        <form onSubmit={handleSubmit} encType='multipart/form-data'>
            <input 
                type="file" 
                accept=".png, .jpg, .jpeg"
                name="photo"
                onChange={handlePhoto}
            />

            <input 
                type="submit"
            />
        </form>
    );
}

export default User;