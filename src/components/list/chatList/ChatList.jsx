import React, { useState } from 'react'
import './ChatList.css'
import search_icon from '../../../assets/search.png'
import add_icon from '../../../assets/plus.png'
import minus_icon from '../../../assets/minus.png'
import user_icon from '../../../assets/user1.png' 

const ChatList = () => {

    const [changeIcon, setChangeIcon] = useState(false)

    const handler = () => {
        setChangeIcon(!changeIcon)
    }

  return (
    <div className='list'>
        <div className="search">
            <div className="searchBar">
                <img src={search_icon} alt="" />
                <input type="text" placeholder='Search' />
            </div>
            <img src={changeIcon ? minus_icon : add_icon} alt=""  className='add' onClick={() => handler()}/>
        </div>
        <div className="item">
            <img src={user_icon} alt="" />
            <div className="text">
                <span>Jane doe</span>
                <p>Latest message!</p>
            </div>
        </div>
        <div className="item">
            <img src={user_icon} alt="" />
            <div className="text">
                <span>Jane doe</span>
                <p>Latest message!</p>
            </div>
        </div>
        <div className="item">
            <img src={user_icon} alt="" />
            <div className="text">
                <span>Jane doe</span>
                <p>Latest message!</p>
            </div>
        </div>
        
    </div>
  )
}

export default ChatList