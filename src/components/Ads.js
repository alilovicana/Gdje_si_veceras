import React from "react";
import JSONDATA from '../MOCK_DATA.json';
import { useState, useEffect, useContext } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Components.css';
import axios from 'axios';
import { AuthContext } from "../context/AuthContext";
import { Link } from 'react-router-dom';



function Ads() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [adsList, showAdsList] = useState([]);
  const [formValues, setFormValues] = useState({ city: "", category: "" });
  const [filter, setFilter] = useState(false);
  const [cityState, setCityState] = useState('Bakar');
  const [categoryState, setCategoryState] = useState('Kategorije');

  //Shows Ads when I load the page
  useEffect(() => {
    const getAds = async () => {
      await axios.get('http://localhost:3001/showAds').then((response) => {
        showAdsList(response.data);
      })
    };
    getAds();
  }, []);
  //Filter
  const filtering = async () => {
    await axios.put('http://localhost:3001/filter', {
      category: categoryState,
      city: cityState
    }).then((response) => {
      showAdsList(response.data);
      setFilter(true);
    })
  };
  const addLike = async (id, likes) => {
    await axios.put('http://localhost:3001/Update', {
      id,
      likes
    }).then((response) => {
      const newState = adsList.map(list => {
        if (list.id === id) {
          return { ...list, likes };
        }
        return list;
      })
      showAdsList(newState);
    })
  };
  const handleClick = (event) => {
    event.currentTarget.disabled = true;
    console.log(event);
    console.log('button clicked');
  };
  const events = [{ text: "Kategorije" }, { text: "Kafići" }, { text: "Klubovi" }, { text: "Restorani" }, { text: "Sport" }, { text: "Kultura" }, { text: "Priroda" }, { text: "Studentska događanja" }, { text: "Privatne zabave" }];
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4">
          <div className="categories">
            <select value={categoryState}
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
                dateFormat='dd/MM/yyyy'
                minDate={new Date()}
                isClearable
              />
            </label>
          </div>
        </div>
        <div className="col-md-1">
          <button type="submit" className="btn btn-success" onClick={()=>filtering()} >Filtriraj</button>
        </div>
      </div>
      <div className="showAds" >
        {adsList.map((val, key) => {
          return <div className="ad" key={key}>
            <h6><i>{val.firstName}</i></h6>
            <h4> {val.content}</h4>
            <h5><a href=""><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#bb2d3b" className="bi bi-geo-alt-fill" viewBox="0 0 16 16">
              <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"></path>
            </svg>{val.adress}</a></h5>
            <h5 className="likes">Likes: {val.likes}</h5>
            <div>
              {""}
              <button type="submit" onClick={(e) => { addLike(val.id, val.likes + 1); handleClick(e) }} className="btn btn-success" > LIKE</button>
            </div>
            {/* <h4> {val.city}</h4>
            <h4> {val.category}</h4>
            <h4> {val.dateOfTheEvent}</h4> */}
          </div>
        })}
      </div>
    </div >
  )
}
export default Ads;