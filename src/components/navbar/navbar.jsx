import React from 'react'
import { Link, Navigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const Navbar = ({user,setLoginUser}) => {
    // const user = jwtDecode(User);
    const navigate = useNavigate();

    const logout = ()=>{
        localStorage.removeItem('token');
        setLoginUser({});
        // console.log(User);
        navigate('/');    
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-    ">
        <Link className="navbar-brand" to="/">Navbar</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link className="nav-link" to="/dashboard">Dashboard</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="createquiz">CreateQuiz</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="joinquiz">JoinQuiz</Link>
            </li>
          </ul>
          <div className='ms-auto'>
          <span>{user.email}</span>
          <button className="btn btn-primary my-2 mx-4 my-sm-0" onClick={logout}>Logout</button>
          </div>
        </div>
        </nav>
    )
}

export default Navbar;