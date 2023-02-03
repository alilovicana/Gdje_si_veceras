import React from "react";
import JSONDATA from '../MOCK_DATA.json';
import { useState, useEffect, useContext } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Components.css';
import axios from 'axios';
// import { colors } from "@material-ui/core";

function Ads() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [adsList, showAdsList] = useState([]);
  const [cityState, setCityState] = useState('Bakar');
  const [categoryState, setCategoryState] = useState('Kategorije');
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [userLiked, setUserLiked] = useState(false);

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
      city: cityState,
      date: selectedDate
    }).then((response) => {
      showAdsList(response.data);
    })
  };
  //part for Likes
  const addLike = async (id, likes) => {
    await axios.put('http://localhost:3001/update', {
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
  // useEffect(() => {
  //   // Check if user has already liked the post
  //   const checkIfUserLiked = async () => {
  //     const response = await fetch('/api/check-like');
  //     const data = await response.json();
  //     setUserLiked(data.userLiked);
  //     setLikes(data.likes);
  //   }
  //   checkIfUserLiked();
  // }, []);

  const handleClick = (e) => {
    e.preventDefault();
    setLiked(!liked);
  }
  const events = [{ text: "Categories" }, { text: "Caffe bars" }, { text: "Clubs" }, { text: "Restaurants" }, { text: "Sport" }, { text: "Culture Events" }, { text: "Events in Nature" }, { text: "Students Events" }, { text: "Private Parties" }];
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
                dateFormat='dd.MM.yyyy'
                minDate={new Date()}
                isClearable
              />
            </label>
          </div>
        </div>
        <div className="col-md-1">
          <button type="submit" className="btn btn-success" onClick={() => filtering()} >Filter</button>
        </div>
      </div>
      <div className="showAds" >
        {adsList.map((val, key) => {
          return <div className="ad" key={key}>
            <h6><i>{val.firstName}</i></h6>
            <h4> {val.content}</h4>
            <img src={val.picture} />
            <h5><a href=""><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#bb2d3b" className="bi bi-geo-alt-fill" viewBox="0 0 16 16">
              <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"></path>
            </svg>{val.adress}</a></h5>
            <h5 className="likes">Likes: {val.likes}</h5>
            <div>
              {""}
              {liked ? (<svg onClick={(e) => { addLike(val.id, val.likes - 1); handleClick(e) }} xmlns="http://www.w3.org/2000/svg" style={{ color: "red" }} width="16" height="16" fill="currentColor" className="bi bi-heart-fill" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
              </svg>) : (<svg onClick={(e) => { addLike(val.id, val.likes + 1); handleClick(e) }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart" viewBox="0 0 16 16">
                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
              </svg>)}
              {console.log(val.id)}
            </div>
            <img src={val.profile_image} />
            <h6><i>{val.first_and_last_name}</i></h6>
            <h4> {val.email}</h4>
            <h4> {val.phone_number}</h4>
            <h4> {val.about_me}</h4>
          </div>
        })}
      </div>
    </div>
  )
}
export default Ads;