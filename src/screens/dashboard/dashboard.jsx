import React from 'react'
import { useEffect, useState } from 'react';
import CreatedQuizCard from '../../components/createdQuizCard/createdQuizCard';
import axios from 'axios';
import AttemptedQuizCard from '../../components/attemptedQuizCard/attemptedQuizCard';
import jwtDecode from 'jwt-decode';

const Dashboard = ({user,setLoginUser}) => {
  const [createdQuizzes,setCreatedQuizzes] = useState([]);
  const [attemptedQuizzes,setAttemptedQuizzes] = useState([]);

  useEffect( ()=>{
    const token = localStorage.getItem('token');
    const User = jwtDecode(token);
    // console.log(User);
    // setLoginUser({
    //   id:User.id,
    //     name:User.name,
    //     email:User.email
    //   })
      // console.log(User);
      // console.log('sending request to getquizzes ',user);

      const tempuser = {id:User.id,name:User.name,email:User.email};
      console.log('tempuser: ',tempuser);
    axios.get('http://localhost:8000/getquizzes',tempuser)
    .then((res)=>{
      console.log(res.data);
      setCreatedQuizzes(res.data.createdQuizzes);
      setAttemptedQuizzes(res.data.attemptedQuizzes);
    }).catch(err=>console.log(err));
    // setCreatedQuizzes(['lka','kal','lakj','kalsj']);
    // setAttemptedQuizzes(['lka','kal','lakj','kalsj']);
    // console.log(createdQuizzes);
  },[])
  return (
    <div>
        <h1>Created Quizzes</h1>
        {/* <ul>{
          createdQuizzes.map((quiz,index)=>{
            return <li key={index}><CreatedQuizCard quiz={quiz}/></li>
          })
        }
        </ul> */}
        <h1>Attempted Quizzes</h1>
        {/* <ul>{
          attemptedQuizzes.map((quiz,index)=>{
            return <li key={index}><AttemptedQuizCard quizId={quiz}/></li>
          })
        }</ul> */}
    </div>
  )
}

export default Dashboard;