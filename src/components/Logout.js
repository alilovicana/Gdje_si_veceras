import React from 'react'
import video from './img/video.mp4';

const LogOut = () => {
  return (
    <div className='video'>
      <video src={video} autoPlay />
      <div className="logout-btn">
        <button type="submit" className="btn btn-success">Odjava</button>
      </div>
    </div>

  )
}
export default LogOut