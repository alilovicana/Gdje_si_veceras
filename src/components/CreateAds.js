import React from "react";
import { useState, useEffect, useRef, useContext } from "react";
import JSONDATA from '../MOCK_DATA.json';
import DatePicker from 'react-datepicker';
import "./Components.css";
import axios from 'axios';
import { useHistory } from 'react-router-dom'
import { withRouter } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import ImageUploader from "./ImageUploader";
function CreateAds() {
    let redirect = useHistory();
    const [selectedDate, setSelectedDate] = useState(null);
    const initialValues = { content: "", adress: "" };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [cityState, setCityState] = useState('Bakar');
    const [categoryState, setCategoryState] = useState('Kategorije');
    const { user } = useContext(AuthContext);
    const [image, setImg] = useState("");

    const addPost = async () => {
        await axios.post(`http://localhost:3001/CreateAds/${user.result[0].id}`, {
            user_id: user.result[0].id,
            content: formValues.content,
            adress: formValues.adress,
            category: categoryState,
            city: cityState,
            date: selectedDate,
            picture: image
        }).then(() => {
            console.log('success');
            setFormValues(initialValues);
            redirect.push('/');
        })
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
    };
    useEffect(() => {
        console.log(formErrors);
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            addPost();
        }
    }, [formErrors]);
    const validate = (values) => {
        const errors = {};

        if (!values.content) {
            errors.content = "Upišite objavu!";
        }
        else if (values.content.length > 300) {
            errors.content = "Vaša objava je preduga!";
        }
        if (!values.adress) {
            errors.adress = "Unesite adresu!";
        }
        return errors;
    };

    const events = [{ text: "Kategorije" }, { text: "Kafići" }, { text: "Klubovi" }, { text: "Restorani" }, { text: "Sport" }, { text: "Kultura" }, { text: "Priroda" }, { text: "Studentska događanja" }, { text: "Privatne zabave" }];
    return (
        <div className="container">
            {Object.keys(formErrors).length === 0 && isSubmit ? (
                <div className="ui message success">Uspješno ste kreirali oglas!</div>
            ) : (
                <div className="ui message success">...</div>
            )}
            <form onSubmit={handleSubmit}>
                <div className="ui form">
                    <div className="field">
                        <label>Novi oglas</label>
                        <textarea name='content' id="content" cols="60" rows="10" value={formValues.content} onChange={handleChange}></textarea>
                    </div>
                    <p>{formErrors.content}</p>
                    <div className="field">
                        <div className="input-group w-50">
                            <span className="input-group-text" id="basic-addon1">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#bb2d3b" className="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                                    <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"></path>
                                </svg>
                            </span>
                            <input name="adress" type="text" className='form-control' placeholder="Lokacija" value={formValues.adress} aria-label="Input group example" aria-describedby="basic-addon1" onChange={handleChange} />
                        </div>
                    </div>
                    <p>{formErrors.adress}</p>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-5">
                                <div className="categories">
                                    <select
                                        value={categoryState}
                                        onChange={(e) => {
                                            const selectedCaetgory = e.target.value;
                                            setCategoryState(selectedCaetgory);
                                        }}>
                                        {events.map((val, i) => <option key={i}>{val.text}</option>)}
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="town-filter">
                                    <select value={cityState}
                                        onChange={(e) => {
                                            const selectedCity = e.target.value;
                                            setCityState(selectedCity);
                                        }}>
                                        {JSONDATA.map((val, key) => {
                                            return <option key={key}> {val.town_name}</option>
                                        })}
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="calendar-filter"  >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-calendar4-week" viewBox="0 0 16 16">
                                        <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM2 2a1 1 0 0 0-1 1v1h14V3a1 1 0 0 0-1-1H2zm13 3H1v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V5z" />
                                        <path d="M11 7.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-2 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z" />
                                    </svg>
                                    <label>
                                        <DatePicker selected={selectedDate}
                                            onChange={date => setSelectedDate(date)}
                                            dateFormat='dd.MM.yyyy'
                                            minDate={new Date()}
                                            isClearable
                                        />
                                    </label>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-success">Objavi</button>
                        </div>
                    </div>
                </div>
            </form>
            <div>
                <ImageUploader />
            </div>
        </div>
    );
}

export default withRouter(CreateAds);