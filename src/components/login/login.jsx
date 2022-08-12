import React from 'react'
import { useState,useEffect } from 'react';
import './login.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ( { setLoginUser } ) => {
    const navigate = useNavigate();
    const [user,setUser] = useState({
        email:"",
        password:"",
    });
    const handleChange = (e)=>{
        const {name,value} = e.target;
        // console.log({name,value});
        setUser({...user,[name]: value})
    };

    useEffect(()=>{
        console.log(user);
    },[user]);

    const login = async ()=>{
        console.log('login clicked');
        try{
            const res = await axios.post("http://localhost:8000/login",user)
            alert(res.data.message);
            setLoginUser(()=>res.data.user);
            console.log(res.data.token);
            console.log(res.data.user);
            navigate('/');
        }
        catch(err){
            console.log(err);
        }
    }

    return (
        <div className='login'>
        <h1>Login</h1>
        <input type="text" placeholder='Enter your Email' name="email" value={user.email} onChange={handleChange}/>
        <input type="password" placeholder='Enter your Password' name="password" value={user.password} onChange={handleChange}/>
        <div className="button" onClick={login}>Login</div>
        <div>or</div>
        <div className="button" onClick={()=>{navigate('/register')}}>Register</div>
        </div>
    )
}

export default Login;
