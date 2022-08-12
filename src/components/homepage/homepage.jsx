import React from 'react'
import './homepage.css'
import jwtDecode from 'jwt-decode';

const Homepage = ({ token , setToken}) => {

  const user = jwtDecode(token);
  console.log(user);

  const logout = ()=>{
    localStorage.removeItem('token');
    setToken(null);
    console.log(token);
  }
  return (
    <div className='homepage'>
        <h1>Hello {user.name}</h1>
        <div className="button" onClick={logout}>Logout</div>
    </div>
  )
}

export default Homepage;