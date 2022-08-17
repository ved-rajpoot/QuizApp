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
import CreatedSuccessfully from './screens/created-successfully/created-successfully';
import AttemptQuiz from './screens/attempt-quiz/attempt-quiz';
import LoadingScreen from './screens/loadingScreen/loadingScreen';

function App() {
  const[ user, setLoginUser] = useState({
      id:"",
      name:"",
      email:"",
  })
  useEffect(()=>{
    const token = localStorage.getItem('token');
    if(token){
      console.log('jwt token: ' , token);
      const User = jwtDecode(token);
      if(!User){
        localStorage.removeItem('token');
        setLoginUser({});
      } else {
        setLoginUser({
          id:User.id,
          name:User.name,
          email:User.email
        })
        console.log('User from jwt: ',User);
        console.log('user of useState', user);
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
        <Route path="/createquiz" element={<CreateQuiz user={user}/>}/>
        <Route path="/created-successfully/:quizcode" element={<CreatedSuccessfully/>}/>
        <Route path="/joinquiz" element={<JoinQuiz/>}/>
        <Route path="/attempt-quiz/:quizcode" element={<AttemptQuiz/>}/>
        {/* <Route path="/loading" element={<LoadingScreen/>}/> */}
      </Routes>
    </div>
    </Router>
    </>
  );
}
export default App;
