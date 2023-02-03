import React, { useState, useEffect, useContext } from "react";
import video from './img/video.mp4';

const LogOut = () => {
  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.reload(true); 
  }
  return (
    <div className='video'>
      <video src={video} autoPlay />
      <div className="logout-btn">
        <button onClick={handleLogout} name="logout" type="submit" className="btn btn-success">Log Out</button>
      </div>
    </div>

  )
}
export default LogOut