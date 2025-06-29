import React from 'react'
import './Detail.css'
import arrowup_icom from '../../assets/arrowup.png'
import arrowdown_icon from '../../assets/arrowdown.png'
import download_icom from '../../assets/download.png'
import user_icon from '../../assets/user1.png'
import { auth, db } from '../../lib/firebase'
import { useChatStore, useUserStore } from '../../lib/chatStore'
import { arrayRemove, arrayUnion, updateDoc, doc } from 'firebase/firestore'

const Detail = () => {

  const { user, isCurrentUserBlocked, isReceiverBlocked, changeBlock} = useChatStore();
  const {currentUser} = useUserStore();

  const handleBlock = async () => {
    if (!user) {
      return;
    }

    const userDocRef = doc(db, "users", currentUser.id)

    try {
      await updateDoc(userDocRef, {
        blocked: isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id),
      })
      changeBlock();

    } catch (err) {
      console.log(err)
    }

  }

  return (
    <div className='detail'>
      <div className="user">
        <img src={user_icon} alt="" />
        <h2>{user?.username}</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo assumenda iusto, optio, </p>
      </div>
      <div className="info">
        <div className="option">
          <div className="title">
            <span>Chat settings</span>
            <img src={arrowup_icom} alt="" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Privacy and Help</span>
            <img src={arrowup_icom} alt="" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared Photos</span>
            <img src={arrowdown_icon} alt="" />
          </div>
          <div className="photos">
            <div className="photoItem">
              <div className="photoDetail">
                <img src="" alt="" />
                <span>Photo_28482</span>
              </div>
              <img src={download_icom} alt="" className='icon-download'/>
            </div>
  
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared File</span>
            <img src={arrowup_icom} alt="" />
          </div>
        </div>
        <button className='block-btn' onClick={handleBlock}>
          {
          isCurrentUserBlocked ? "You are Blocked" :
           isReceiverBlocked ? "User Blocked" : "Block User"
           }
           </button>
        <button className='logout-btn' onClick={() => auth.signOut()}>Logout</button>
      </div>
    </div>
  )
}

export default Detail