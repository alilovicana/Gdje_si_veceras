import React, { useState } from 'react';
import axios from 'axios';

function ImageUploader() {
    const [image, setImage] = useState({});
    const handleFileUpload = event => {
        console.log(event);
        setImage(event.target.value.replace("C:\\fakepath\\", ""));
    }

    const handleSubmit = async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', image);
        // fetch('http://localhost:3001/upload', {
        //     method:"post",
        //     body:formData
        // }).then((res)=>res.text()).then((resBody)=>{
        //     console.log(resBody);
        // });

        try {
            const res = await axios.post('http://localhost:3001/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className='App'>
            <input type="file" name="image" onChange={handleFileUpload} />
            <button onClick={handleSubmit}>Upload</button>
        </div>
    );
}

export default ImageUploader;