import React from 'react'
import './index.css'
import Signin from './components/signin/Signin'
import List from './components/list/List'
import Chat from './components/chat/Chat'
import Detail from './components/detail/Detail'
import { ToastContainer } from 'react-toastify'



const App = () => {

  const user = true;

  return (
    <div className='container'>

      {
        user ? (
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