import React, { useState, useEffect, useContext } from "react";
import video from './img/video.mp4';
import styled from "styled-components";
const LogOut = () => {
  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.reload(true);
  }
  return (
    <LogoutConteiner>
      <div className='video'>
        <video src={video} autoPlay />
        <button className="loginButton" name="logout" type="submit"onClick={handleLogout}>Log Out</button>
      </div>
    </LogoutConteiner>
  )
}
const LogoutConteiner=styled.div`
.loginButton{
  height: 50px;
  border-radius: 10px;
  border: none;
  background-color: #1775ee;
  color: white;
  font-size: 20px;
  font-weight: 500;
  cursor: pointer;
  padding:10px;
  display: flex;
  align-items: center;
  justify-content: center;
}
`;
export default LogOut