import React from 'react'
import user_icon from '../../../../assets/user1.png'
import './addUser.css'

const AddUser = () => {
  return (
    <div className='addUser'>
        <form>
            <input type="text" placeholder="Username" name='username' />
            <button>Search</button>
        </form>
        <div className="user">

            <div className="details">
                <img src={user_icon} alt="" />
                <span>Jane Doe</span>
            </div>
            <button>Add User</button>
        </div>
    </div>
  )
}

export default AddUser