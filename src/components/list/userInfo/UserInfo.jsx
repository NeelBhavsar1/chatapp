import React from 'react'
import './UserInfo.css'
import user_icon from '../../../assets/user1.png'
import more_icon from '../../../assets/more.png'
import video_icon from '../../../assets/cam-recorder.png'
import edit_icon from  '../../../assets/edit.png'

const UserInfo = () => {
  return (
    <div className='UserInfo'>
        <div className="user">
            <img src={user_icon} alt="" />
            <h2>John Doe</h2>
        </div>
        <div className="icons">
            <img src={more_icon} alt="" />
            <img src={video_icon} alt="" />
            <img src={edit_icon} alt="" />
        </div>
    </div>
  )
}

export default UserInfo