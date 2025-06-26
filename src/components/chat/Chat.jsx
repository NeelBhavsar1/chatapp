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
 

/*
image upload features for selecting and previewing images 
have not been implemented due to firebase storage for uploading and 
hosting images which requires billing.

intentional as my project is hosted online for public usage and could
generate unintended costs even if accidental.
i have chosen not to risk potential charges caused by anonymous users uploading content 
and consuming bandwidth or storage.
*/

const Chat = () => {

  const [usingEmoji, setUsingEmoji] = useState(false)
  const [text, setText] = useState("")
  const [chat, setChat] = useState()

  const {chatId, user, isCurrentUserBlocked, isReceiverBlocked } = useChatStore()
  const {currentUser} = useUserStore()

  //image state setup

  const [img, setImg] = useState({
    file: null,
    url: "",
  })
   

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

    let imgUrl = null;
    


    try {

      if (img.file) {
        imgUrl = await upload(img.file)
      }

      await updateDoc(doc(db, "chats", chatId), {
        messages:arrayUnion({
          senderId: currentUser.id,
          text,
          createdAt: new Date(),
          ...(imgUrl && {img: imgUrl}),
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


  //function sets selected file
  const handleImage = (e) => {
    if (e.target.files[0]) {
      setImg ({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      })

    }

    setImg({
      file:null,
      url:""
    })

    setText("")
  }


  return (
    <div className='chat'>
      <div className="top">
        <div className="user">
          <img src={user_icon} alt="" />
          <div className="text">
            <span>{user?.username}</span>
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

        

        
        <div className={message.senderId === currentUser?.id ? "message own" : "message" } key={message?.createdAt}>
          <img src={user_icon} alt="" />
          <div className="text">
            {message.img && <img src={message.img} alt=""/>}
            
            <p>{message.text}</p>
            {/*<span>{message}</span>*/}
          </div>
        </div>
        
        ))}

        { img.url && (<div className="message own">
          <div className="text">
            <img src={img.url} alt="" />
          </div>
        </div>
      )}
        <div ref={endRef}></div>
      </div>
      <div className="bottom">
        <div className="icons">
          <label htmlFor="file">
            <img src={image_icon} alt="" />
          </label>
          <input type="file" id="file" style={{display:"none"}} onChange={handleImage}/>
          <img src={camera_icon} alt="" />
          <img src={microphone_icon} alt="" />
        </div>

        <input type="text" 
        placeholder={ (isCurrentUserBlocked || isReceiverBlocked) ? "You cannot send a message!" :  "Type a message..."} 
        value={text} 
        onChange={e => setText(e.target.value)} disabled={isCurrentUserBlocked || isReceiverBlocked}/>


        <div className="emoji">
          <img src={emoji_icon} alt="" onClick={() => EmojiOpen()}/>
          <div className="picker">
            <EmojiPicker open={usingEmoji} onEmojiClick={handleEmoji}/>
          </div>
        </div>
        <button className='send-btn' onClick={handleSend} disabled={isCurrentUserBlocked || isReceiverBlocked}>Send</button>
        
      </div>
    </div>
  )
}

export default Chat