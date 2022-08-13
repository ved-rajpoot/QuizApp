import React from 'react'
import './homepage.css'

const Homepage = ({ user , setLoginUser}) => {

  // const user = jwtDecode(token);
  // console.log(user);

  const logout = ()=>{
    localStorage.removeItem('token');
    setLoginUser({});
    // setToken(null);
    // console.log(token);
  }
  return (
    <div className='homepage'>
        <h1>Hello {user.name}</h1>
        <div className="button" onClick={logout}>Logout</div>
    </div>
  )
}

export default Homepage;