import './App.css';
import Login from './components/login/login';
import Register from './components/register/register';
import Homepage from './components/homepage/homepage';
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import jwtDecode from 'jwt-decode';

function App() {
  const[ user, setLoginUser] = useState({
      name:"",
      email:"",
      password:"" 
  })
  const [token,setToken] = useState(null);
  useEffect(()=>{
    const token = localStorage.getItem('token');
    if(token){
      console.log(token);
      const User = jwtDecode(token);
      if(!User){
        localStorage.removeItem('token');
        setToken(null);
      } else {
        setToken(token);
        console.log(User);
      }
      // setLoginUser(User);
    }
  },[]);

  return (
    <div className="App">
    <Router>
      <Routes>
        <Route exact path="/" element={ token ? <Homepage token={token} setToken={setToken}/>: <Login setToken={setToken}/>}/>
        <Route exact path="/login" element={<Login setToken={setToken}/>}/>
        <Route exact path="/register" element={<Register/>}/>
      </Routes>
    </Router>
    </div>
  );
}
export default App;
