import React from 'react'
import './homepage.css'

const Homepage = ({ user , setLoginUser}) => {
  return (
    <div className='homepage'>
        <h1>Hello {user.name}</h1>
        <div className="button" onClick={()=>{setLoginUser({})}}>Logout</div>
    </div>
  )
}

export default Homepage;