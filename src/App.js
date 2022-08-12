import './App.css';
import Login from './components/login/login';
import Register from './components/register/register';
import Homepage from './components/homepage/homepage';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { useState } from 'react';

function App() {
  const[ user, setLoginUser] = useState({
      name:"",
      email:"",
      password:"" 
  })
  return (
    <div className="App">
    <Router>
      <Routes>
        <Route exact path="/" element={user && user._id? <Homepage user={user} setLoginUser={setLoginUser}/>: <Login setLoginUser={setLoginUser}/>}/>
        <Route exact path="/login" element={<Login setLoginUser={setLoginUser}/>}/>
        <Route exact path="/register" element={<Register/>}/>
      </Routes>
    </Router>
    </div>
  );
}
export default App;
