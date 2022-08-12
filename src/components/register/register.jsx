import React from 'react'
import { useState, useEffect } from 'react'
import './register.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();

    const [user,setUser] = useState({
        name:"",
        email:"",
        password:"",
        reEnterPassword:""
    });

    const handleChange = (e)=>{
        const {name,value} = e.target;
        // console.log({name,value});
        setUser({...user,[name]: value})
    };

    useEffect(()=>{
        console.log(user);
    },[user])
    
    const register = async ()=>{
        // console.log(user);
        const {name,email,password,reEnterPassword} = user;
        if(name && email && password && (password===reEnterPassword)){
            try{
                const res = await axios.post("http://localhost:8000/register",user)
                alert(res.data.message);
                navigate('/login');
            }
            catch(err){
                console.log(err);
            }
        } else {
            alert('Invalid credentials');
        }
    }

    return (
        <div className="register">
            <h1>Register</h1>
            <input type="text" name="name" value={user.name} placeholder='Your Name' onChange={handleChange}/>
            <input type="text" name="email" value={user.email} placeholder='Your Email' onChange={handleChange}/>
            <input type="password" name="password" value={user.password} placeholder='Your Password' onChange={handleChange}/>
            <input type="password" name="reEnterPassword" value={user.reEnterPassword} placeholder='Re-Enter Password' onChange={handleChange}/>
            <div className="button" onClick={register}>Register</div>
            <div>or</div>
            <div className="button" onClick={()=>{navigate('/login')}}>Login</div>
        </div>
    )
}

export default Register;