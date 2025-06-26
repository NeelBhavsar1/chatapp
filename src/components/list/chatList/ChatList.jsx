import React, { useEffect, useState } from 'react'
import './ChatList.css'
import search_icon from '../../../assets/search.png'
import add_icon from '../../../assets/plus.png'
import minus_icon from '../../../assets/minus.png'
import user_icon from '../../../assets/user1.png' 
import AddUser from './addUser/addUser'
import {useUserStore} from '../../../lib/userStore'
import { doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore'
import { db } from '../../../lib/firebase'
import { useChatStore } from '../../../lib/chatStore'


const ChatList = () => {

    const {currentUser} = useUserStore()

    const {chatId, changeChat} = useChatStore()

    //console.log(chatId)

    const [chats, setChats] = useState([])

    const [changeIcon, setChangeIcon] = useState(false)

    const [input, setInput] = useState("")

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

            //to sort most recent chats at the top and least at the base
            const chatData = await Promise.all(promises)
            setChats(chatData.sort((a,b) => b.updatedAt - a.updatedAt))

            
           
        })

        return () => {
            unSub()
        }

    }, [currentUser.id])


    const handleSelect = async (chat) => {

        const userChats = chats.map(item => {
            const {user, ...rest} = item;
            return rest;
        })

        const chatIndex = userChats.findIndex(item => item.chatId === chat.chatId)
        userChats[chatIndex].isSeen = true;

        const userChatRef = doc(db, "userchats", currentUser.id)

        try {

            await updateDoc(userChatRef, {
               chats: userChats,
            })

            changeChat(chat.chatId, chat.user)

        } catch (err) {
            console.log(err)
        }



        

    }

    const filteredChats = chats.filter(c => c.user.username.toLowerCase().includes(input.toLowerCase()))



  return (
    <>
    <div className='chatlist'>
        <div className="search">
            <div className="searchBar">
                <img src={search_icon} alt="" />
                <input type="text" placeholder='Search' onChange={(e) => setInput(e.target.value)}/>
            </div>
            <img src={changeIcon ? minus_icon : add_icon} alt=""  className='add' onClick={() => handler()}/>
        </div>
        {filteredChats.map(chat => (
            <div className="item" 
            key={chat.chatId} 
            onClick={() => handleSelect(chat)}
            style={{
              backgroundColor: chat?.isSeen ? "transparent" : "#5183fe",
            }}

            >
                <img src={user_icon} alt="" />
                <div className="text">
                    <span>{chat.user.blocked.includes(currentUser.id)
                        ? "User" : chat.user.username}</span>
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