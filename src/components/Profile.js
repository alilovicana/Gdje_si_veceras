import React, { useState, useContext, useEffect } from 'react';
import Avatar from "react-avatar-edit";
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import img from "./img/profile.png";
import './Components.css';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { AuthContext } from "../context/AuthContext"

const Profile = () => {
  const [image, setimage] = useState("")
  const [imagecrop, setimagecrop] = useState(false);
  const [src, setsrc] = useState(false);
  const [profile, setprofile] = useState([]);
  const [pview, setpview] = useState(false);
  const [dialogs, setdialogs] = useState(false);
  const initialValues = { profile_image: "profile.png", about_me: "Zagarantitano dobra zabava", email: "email@gmail.com", first_and_last_name: "Ime i Prezime", rating: "5", phone_number: "099/999/9999" };
  const [formValues, setFormValues] = useState(initialValues);
  const [activateUpdation, setActivateUpdation] = useState(false)
  const { user } = useContext(AuthContext);

  const profileFinal = profile.map((item) => item.pview);

  useEffect(() => {
    async function fetchData() {
      if (localStorage.length != 0) {
        await axios.get(`http://localhost:3001/Profile/${user.result[0].id}`).then((response) => {
          console.log(response);
          setFormValues(response.data[0]);
        })
      }
    }
    fetchData();
  }, []);

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
  const handleSubmit = (e) => {
    e.preventDefault();
    profileInformation();
    setActivateUpdation(!activateUpdation);
  };
  const handleSubmit2 = (e) => {
    e.preventDefault();
    updateProfile();
    setActivateUpdation(!activateUpdation);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const profileInformation = async () => {
    await axios.post(`http://localhost:3001/Profile/${user.result[0].id}`, {
      user_id: user.result[0].id,
      // profile_image = req.body.profile_image;
      // first_and_last_name: formValues.first_and_last_name,
      email: formValues.email,
      phone_number: formValues.phone_number,
      about_me: formValues.about_me,
      // rating: formValues.rating,
    }).then(() => {
      console.log('success');
      setFormValues(initialValues);
    })

  };
  const updateProfile = async () => {
    await axios.put(`http://localhost:3001/UpdateProfile/${user.result[0].id}`, {
      user_id: user.result[0].id,
      // profile_image = req.body.profile_image;
      // first_and_last_name: formValues.first_and_last_name,
      email: formValues.email,
      phone_number: formValues.phone_number,
      about_me: formValues.about_me,
      // rating: formValues.rating,
    }).then(() => {
      console.log('success');
      setFormValues(initialValues);
    })
  };
  return (
    <div className='profile_img'>
      <div className='flex'><img style={{ width: "200px", height: "200px", borderRadius: "50%", objectFit: "cover", border: "4px solid green" }}
        // onClick={()=>setdialogs(true)}
        src={profileFinal.length ? profileFinal : img}
        alt=""
        onClick={() => setimagecrop(true)} />

        <label htmlFor='' className='mt-3 font-semibold text-5xl'>{formValues.first_and_last_name}</label>
        <div className="modal" tabIndex="-1">
          <div className="modal-dialog">
            <Dialog visible={imagecrop} header={() => (
              <p htmlFor="" className="text-2xl font-semibold textColor">Uredi sliku profila</p>
            )}
              onHide={() => setimagecrop(false)}
            >
              <div className='confirmation-content flex flex-column align-items-center'>
                <Avatar width={500} height={400} onCrop={onCrop} onClose={onClose}
                  src={src}
                  shadingColor={"#474649"}
                  backgroundColor={"#474649"}
                />
              </div>
              <div className='flex flex-column align-items-center mt-5 W-12'>
                <div className='flex justify-content-around w-12 mt-4'>
                  <Button onClick={saveCropImage} label="Save" icon="pi pi-check" />
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
      {activateUpdation ? (
        <form onSubmit={handleSubmit2}>
          <div className="ui form">
            <div className="email">
              <label className="form__label" htmlFor="email">Email: </label>
              <input
                type="text"
                name="email"
                placeholder="Email"
                value={formValues.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="Broj Telefona">
              <label className="form__label" htmlFor="phone_number">Broj Telefona: </label>
              <input type="text" name='phone_number' value={formValues.phone_number} onChange={handleInputChange} placeholder="Broj telefona" />
            </div>
            <div className="oMeni">
              <label className="form__label" htmlFor="aboutMe">O meni:</label>
              <textarea name='about_me' id='about_me' cols="50" rows="8" value={formValues.about_me} onChange={handleInputChange}></textarea>
            </div>
          </div>
          <div className="register-btn">
            <button type="submit" className="btn btn-success" >Sačuvaj</button>
          </div>
        </form >
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="ui form">
            <button type="submit" className="btn btn-success" >Uredi profil</button>
            <div className="email">
              <label className="form__label" htmlFor="email">Email: </label>
              <label htmlFor='' className='mt-3 font-semibold text-5xl'>{formValues.email}</label>
            </div>
            <div className="Broj Telefona">
              <label className="form__label" htmlFor="phone_number">Broj Telefona: </label>
              <label htmlFor='' className='mt-3 font-semibold text-5xl'>{formValues.phone_number}</label>
            </div>
            <div className="oMeni">
              <label className="form__label" htmlFor="aboutMe">O meni:</label>
              <label htmlFor='' className='mt-3 font-semibold text-5xl'>{formValues.about_me}</label>
            </div>
          </div>
        </form >
      )
      }
    </div>
  )
}

export default withRouter(Profile)