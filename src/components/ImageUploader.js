import React, { useState } from 'react';
import axios from 'axios';
import profile from './img/profile.png'

function b64toBlob(b64Data, contentType) {
    contentType = contentType || '';
    var sliceSize = 512;
    var byteCharacters =atob(b64Data);
    var byteArrays = [];
  
    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      var slice = byteCharacters.slice(offset, offset + sliceSize);
  
      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
  
      var byteArray = new Uint8Array(byteNumbers);
  
      byteArrays.push(byteArray);
    }
  
    var blob = new Blob(byteArrays, {type: contentType});
    return blob;
  }
function ImageUploader() {
    const [image, setImage] = useState(profile);
    const handleFileChange = async event => {
        console.log(event);
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onloadend = () => {
            setImage(reader.result);
        };
    }

    const handleSubmit = async e => {
        e.preventDefault();
        const formData = new FormData();
        const base64Image = image;
        const blob = b64toBlob(base64Image, 'image/jpeg'); // Convert base64 to Blob
        formData.append('image', blob, 'image.jpeg'); // Append Blob to FormData
        // formData.append('image', image);
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
        <form encType="multipart/form-data" onSubmit={handleSubmit}>
            <input type="file" name="image" onChange={handleFileChange} />
            <button type="submit">Submit</button>
        </form>
    );

}

export default ImageUploader;