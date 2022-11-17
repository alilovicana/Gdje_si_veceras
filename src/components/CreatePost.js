import React, { useState } from 'react';
import  Axios  from 'axios';

function CreatePost() {
    const [email, setContent] = useState(null);
    const [password, setLocation] = useState(null);
    // const addPost=()=>{
    // Axios.post('http://localhost:3000/CreatePost',{
        
    // })
    // }
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        if (id === "postContent") {
            setContent(value);
        }
        // if (id === "location") {
        //     setLocation(value);
        // }
    }

    const handleSubmit = () => {
        console.log(password);
    }
    return (
        <div className="form">
            <div className="form-body">
                <div className="createPost">
                    <h3>Novi oglas</h3>
                    <textarea name="post_content" id="postContent" cols="60" rows="10" ></textarea>
                </div>
                <div className="location">
                    <div class="input-group w-50">
                        <span class="input-group-text" id="basic-addon1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#bb2d3b" class="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                                <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"></path>
                            </svg>
                        </span>
                        <input type="text" className='form-control' placeholder="Lokacija" aria-label="Input group example" aria-describedby="basic-addon1" />
                    </div>
                </div>
                <div class="post-btn">
                    <button type="submit" className="btn btn-success">Objavi</button>
                </div>
            </div>
        </div>

    )
}

export default CreatePost