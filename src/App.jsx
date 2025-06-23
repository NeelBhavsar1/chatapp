import React from 'react'
import './index.css'
import Signin from './components/signin/Signin'
import List from './components/list/List'
import Chat from './components/chat/Chat'
import Detail from './components/detail/Detail'


const App = () => {
  return (
    <div className='container'>
      <List />
      <Chat />
      <Detail />

      
      {/*<Signin />*/}
    </div>
  )
}

export default App