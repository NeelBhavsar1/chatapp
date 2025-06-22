import React from 'react'
import './Chat.css'
import user_icon from '../../assets/user1.png'
import video_icon from '../../assets/cam-recorder.png'
import phone_icon from '../../assets/call.png'
import info_icon from '../../assets/info.png'


const Chat = () => {
  return (
    <div className='chat'>
      <div className="top">
        <div className="user">
          <img src={user_icon} alt="" />
          <div className="text">
            <span>Jane Doe</span>
            <p>Lorem ipsum dolor sit, amet.</p>
          </div>
        </div>
        <div className="icons">
          <img src={phone_icon} alt="" />
          <img src={video_icon} alt="" />
          <img src={info_icon} alt="" />
        </div>
      </div>
      <div className="center"></div>
      <div className="bottom"></div>
    </div>
  )
}

export default Chat