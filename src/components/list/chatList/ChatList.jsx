import React, { useEffect, useState } from 'react'
import './ChatList.css'
import search_icon from '../../../assets/search.png'
import add_icon from '../../../assets/plus.png'
import minus_icon from '../../../assets/minus.png'
import user_icon from '../../../assets/user1.png' 
import AddUser from './addUser/addUser'
import {useUserStore} from '../../../lib/userStore'
import { doc, getDoc, onSnapshot } from 'firebase/firestore'
import { db } from '../../../lib/firebase'


const ChatList = () => {

    const {currentUser} = useUserStore()

    const [chats, setChats] = useState([])

    const [changeIcon, setChangeIcon] = useState(false)

    const handler = () => {
        setChangeIcon(!changeIcon)
    }

    useEffect(() => {
        if (!currentUser?.id) {
            return;
        }
        const unSub = onSnapshot(doc(db, "userchats", currentUser.id), async (res) => {
            

                 const items = res.data().chats;

                const promises = items.map(async (item) => {
                    const userDocRef = doc(db, "users", item.recieverId)
                    const userDocSnap = await getDoc(userDocRef)

                    const user = userDocSnap.data()

                    return {...item, user}

            })

            const chatData = await Promise.all(promises)
            setChats(chatData.sort((a,b) => b.updatedAt - a.updatedAt))

            
           
        })

        return () => {
            unSub()
        }

    }, [currentUser.id])



  return (
    <>
    <div className='chatlist'>
        <div className="search">
            <div className="searchBar">
                <img src={search_icon} alt="" />
                <input type="text" placeholder='Search' />
            </div>
            <img src={changeIcon ? minus_icon : add_icon} alt=""  className='add' onClick={() => handler()}/>
        </div>
        {chats.map(chat => (
            <div className="item" key={chat.chatId}>
                <img src={user_icon} alt="" />
                <div className="text">
                    <span>{chat.user.username}</span>
                    <p>{chat.lastMessage}</p>
                </div>
            </div>

        ))}
        
        
    
    </div>
    { changeIcon && <AddUser />}
    </>
  )
}

export default ChatList