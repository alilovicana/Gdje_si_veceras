import React, { useState } from 'react';
import Avatar from "react-avatar-edit";
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import img from "./img/profile.png";
import './Components.css';
const Profile = () => {
  const [image, setimage] = useState("")
  const [imagecrop, setimagecrop] = useState(false);
  const [src, setsrc] = useState(false);
  const [profile, setprofile] = useState([]);
  const [pview, setpview] = useState(false);
  const [dialogs, setdialogs] = useState(false);

  const profileFinal = profile.map((item) => item.pview);
  const onClose = () => {
    setpview(null);
  };
  const onCrop = (view) => {
    setpview(view);
  };
  const saveCropImage = () => {
    setprofile([...profile, { pview }]);
    setimagecrop(false);
  };
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === "email") {
      setEmail(value);
    }
    if (id === "password") {
      setPassword(value);
    }
  }

  const handleSubmit = () => {
    console.log(email, password);
  }
  return (
    <div className='profile_img'>
      <div className='flex'>
        <img style={{
          width: "200px",
          height: "200px",
          borderRadius: "50%",
          objectFit: "cover",
          border: "4px solid green"
        }}
          onClick={() => setimagecrop(true)}
          src={profileFinal.length ? profileFinal : img} alt=""
        />
        <label htmlFor='' className='mt-3 font-semibold text-5xl'>Ana Alilovic</label>
        <div className="modal" tabindex="-1">
          <div className="modal-dialog">
            <Dialog
              visible={imagecrop}
              header={() => (
                <p htmlFor="" className="text-2xl font-semibold textColor">Uredi sliku profila</p>
              )}
              onHide={() => setimagecrop(false)}
            >
              <div className='confirmation-content flex flex-column align-items-center'>
                <Avatar
                  width={500}
                  height={400}
                  onCrop={onCrop}
                  onClose={onClose}
                  src={src}
                  shadingColor={"#474649"}
                  backgroundColor={"#474649"}
                />
              </div>
              <div className='flex flex-column align-items-center mt-5 W-12'>
                <div className='flex justify-content-around w-12 mt-4'>
                  <Button
                    onClick={saveCropImage}
                    label="Save"
                    icon="pi pi-check"
                  />
                </div>
              </div>
            </Dialog>
            <InputText
              type="file"
              accept='image/*'
              style={{ display: "none" }}
              onChange={(event) => {
                const file = event.target.files[0];
                if (file && file.type.substring(0, 5) === "image") {
                  setimage(file);
                } else {
                  setimage(null)
                }
              }}
            />
          </div>
        </div>
      </div>
      <div className="form">
        <div className="form-body">
          <div className="email">
            <label className="form__label" for="email">Email: </label>
            <input type="email" id="email" className="form__input" value={email} onChange={(e) => handleInputChange(e)} placeholder="Email" />
          </div>
          <div className="Broj Telefona">
            <label className="form__label" for="password">Broj Telefona: </label>
            <input className="form__input" type="password" id="password" value={password} onChange={(e) => handleInputChange(e)} placeholder="Broj telefona" />
          </div>
          <div className="oMeni">
            <label className="form__label" for="confirmPassword">O meni:</label>
            <textarea name="post_content" id="content" cols="50" rows="8" ></textarea>
          </div>
        </div>
        <div className="register-btn">
          <button onClick={() => handleSubmit()} type="submit" className="btn btn-success">Sačuvaj</button>
        </div>
      </div>
    </div>
  )
}

export default Profile