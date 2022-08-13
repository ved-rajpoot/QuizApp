import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';

import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from './components/navbar/navbar';
import Login from './screens/login/login';
import Register from './screens/register/register';
import Homepage from './screens/homepage/homepage';
import Dashboard from './screens/dashboard/dashboard';
import CreateQuiz from './screens/createQuiz/createQuiz';
import JoinQuiz from './screens/joinQuiz/joinQuiz';

function App() {
  const[ user, setLoginUser] = useState({
      id:"",
      name:"",
      email:"",
  })
  // const [token,setToken] = useState(null);
  useEffect(()=>{
    const token = localStorage.getItem('token');
    if(token){
      console.log(token);
      const User = jwtDecode(token);
      if(!User){
        localStorage.removeItem('token');
        setLoginUser({});
        // setToken(null);
      } else {
        setLoginUser({
          id:User.iat,
          name:User.name,
          email:User.email
        })
        console.log(User);
        console.log(user);
      }
    }
  },[]);

  return (
    <>
    <Router>
    {
      user && user.id? <Navbar user={user} setLoginUser={setLoginUser}/>:null
    }
    <div className="App">
      <Routes>
        <Route exact path="/" element={ (user && user.id) ? <Homepage user={user} setLoginUser={setLoginUser}/>: <Login user={user} setLoginUser={setLoginUser}/>}/>
        <Route path="/login" element={<Login user={user} setLoginUser={setLoginUser}/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/dashboard" element={<Dashboard user={user} setLoginUser={setLoginUser}/>}/>
        <Route path="/createquiz" element={<CreateQuiz/>}/>
        <Route path="/joinquiz" element={<JoinQuiz

        />}/>
      </Routes>
    </div>
    </Router>
    </>
  );
}
export default App;
