import React, { useEffect, useRef, useState } from 'react'
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
import { arrayUnion, doc, onSnapshot, updateDoc, getDoc } from 'firebase/firestore'
import { db } from '../../lib/firebase'
import { useChatStore, useUserStore } from '../../lib/chatStore'
 


const Chat = () => {

  const [usingEmoji, setUsingEmoji] = useState(false)
  const [text, setText] = useState("")
  const [chat, setChat] = useState()

  const {chatId, user} = useChatStore()
  const {currentUser} = useUserStore()

  const endRef = useRef(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({behavior: "smooth" })
  }, [])

  const EmojiOpen = () => {
    setUsingEmoji(!usingEmoji)
  }

  const handleEmoji = (emojiData) => {
    setText(prev => prev + emojiData.emoji)

    
  }

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", chatId ), (res) => {
      setChat(res.data())
    })

    return () => {
      unSub()
    }

  }, [chatId])

  //console.log(chat)


  const handleSend = async() => {
    if (text === "") {
      return;
    }


    try {
      await updateDoc(doc(db, "chats", chatId), {
        messages:arrayUnion({
          senderId: currentUser.id,
          text,
          createdAt: new Date(),
        })
      })

      const userIDs = [currentUser.id, user.id]

      userIDs.forEach(async (id) => {

        const userChatRef = doc(db, "userchats", id)
        const userChatsSnapshot = await getDoc(userChatRef)
        if (userChatsSnapshot.exists()) {
          const userChatsData = userChatsSnapshot.data()

          const chatIndex = userChatsData.chats.findIndex(c => c.chatId === chatId)

          userChatsData.chats[chatIndex].lastMessage = text
          userChatsData.chats[chatIndex].isSeen = id === currentUser.id ? true : false;
          userChatsData.chats[chatIndex].updatedAt = Date.now()

          await updateDoc(userChatRef, {
            chats:userChatsData.chats,
          })
        }
      })

      

    } catch (err) {
      console.log(err)
    }
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
      <div className="center">


        { chat?.messages?.map(message => (

        

        
        <div className="message own" key={message?.createdAt}>
          <img src={user_icon} alt="" />
          <div className="text">
            {message.img && <img src={message.img} alt=""/>}
            
            <p>{message.text}</p>
            {/*<span>{message}</span>*/}
          </div>
        </div>
        
        ))}

        <div ref={endRef}></div>
      </div>
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
        <button className='send-btn' onClick={handleSend}>Send</button>
        
      </div>
    </div>
  )
}

export default Chat