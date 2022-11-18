import { useState, useEffect, useRef } from "react";
import "./Components.css";
import axios from 'axios';


function CreatePost() {
    const initialValues = { content: "", adress: "" };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

    const addPost = async () => {
        await axios.post('http://localhost:3001/CreatePost', {
            content: formValues.content,
            adress: formValues.adress
        }).then(() => {
            console.log("success");
            setFormValues(initialValues);
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
    return (
        <div className="container">
            {Object.keys(formErrors).length === 0 && isSubmit ? (
                <div className="ui message success">Uspješno ste kreirali post!</div>
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
                            <input  name="adress" type="text" className='form-control' placeholder="Lokacija" value={formValues.adress} aria-label="Input group example" aria-describedby="basic-addon1" onChange={handleChange} />
                        </div>
                    </div>
                    <p>{formErrors.adress}</p>
                    <button type="submit" className="btn btn-success">Objavi</button>
                </div>
            </form>
        </div>
    );
}

export default CreatePost;