import React, { useState } from 'react'
import './Chat.css'
import user_icon from '../../assets/user1.png'
import video_icon from '../../assets/cam-recorder.png'
import phone_icon from '../../assets/call.png'
import info_icon from '../../assets/info.png'
import emoji_icon from '../../assets/emoji.png'
import image_icon from '../../assets/image.png'
import camera_icon from '../../assets/camera.png'
import microphone_icon from '../../assets/microphone.png'
import EmojiPicker from 'emoji-picker-react'

const Chat = () => {

  const [usingEmoji, setUsingEmoji] = useState(false)
  const [text, setText] = useState("")

  const EmojiOpen = () => {
    setUsingEmoji(!usingEmoji)
  }

  const handleEmoji = (emojiData) => {
    setText(prev => prev + emojiData.emoji)

    
  }


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
      <div className="bottom">
        <div className="icons">
          <img src={image_icon} alt="" />
          <img src={camera_icon} alt="" />
          <img src={microphone_icon} alt="" />
        </div>

        <input type="text" placeholder='Type a message...' value={text} onChange={e => setText(e.target.value)}/>
        <div className="emoji">
          <img src={emoji_icon} alt="" onClick={() => EmojiOpen()}/>
          <div className="picker">
            <EmojiPicker open={usingEmoji} onEmojiClick={handleEmoji}/>
          </div>
        </div>
        <button className='send-btn'>Send</button>
        
      </div>
    </div>
  )
}

export default Chat