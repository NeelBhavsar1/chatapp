import React, { useEffect } from 'react'
import './index.css'
import Signin from './components/signin/Signin'
import List from './components/list/List'
import Chat from './components/chat/Chat'
import Detail from './components/detail/Detail'
import { ToastContainer } from 'react-toastify'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './lib/firebase'
import {useUserStore} from './lib/userStore'



const App = () => {


  const {currentUser, fetchUserInfo} = useUserStore()

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchUserInfo(user.uid)
      } else {
        fetchUserInfo(null)
      }
    })

    return () => {
      unSub()
    }
  }, [fetchUserInfo])

  console.log(currentUser)


  

  return (
    <div className='container'>

      {
        currentUser ? (
          <>
          <List />
          <Chat />
          <Detail />
          </>

        ) : (<Signin />)
      }

      <ToastContainer position='bottom-right'/>
      

      
      
    </div>
  )
}

export default App