import React from "react";
import JSONDATA from '../MOCK_DATA.json';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Components.css';
import { Link } from 'react-router-dom';

function Ads() {
  const [selectedDate, setSelectedDate] = useState(null);
  const refreshPage = () => {
    window.location.reload();
  }
  return (
    <div className="container">
      <div className="row">
      <div className="col-md-4">
            <div className="categories">
              <select>
                <option>Studentska događanja</option>
                <option>Druženja u kafićima</option>
                <option>Privatne zabave</option>
                <option>Sport-termini</option>
              </select>
            </div>
          </div>
          <div className="col-md-4">
            <div className="town-filter">
              <select>
                {JSONDATA.map((val, key) => {
                  return <option> <p>{val.town_name}</p></option>
                })}
              </select>
            </div>
          </div>
          <div className="col-md-3">
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
          <button type="submit" className="btn btn-success">Filtriraj</button>
          </div>
        </div>
      </div>
  )
}
export default Ads;