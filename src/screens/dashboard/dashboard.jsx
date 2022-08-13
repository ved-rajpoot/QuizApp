import React from 'react'
import { useEffect, useState } from 'react';
import CreatedQuizCard from '../../components/createdQuizCard/createdQuizCard';
import axios from 'axios';
import AttemptedQuizCard from '../../components/attemptedQuizCard/attemptedQuizCard';

const Dashboard = ({user,getLoginUser}) => {
  const [createdQuizzes,setCreatedQuizzes] = useState([]);
  const [attemptedQuizzes,setAttemptedQuizzes] = useState([]);

  useEffect( ()=>{
    axios.get('http://localhost:8000/getquizzes',user)
    .then((res)=>{
      console.log(res.data);
      // setCreatedQuizzes(res.data.createdQuizzes);
      // setAttemptedQuizzes(res.data.attemptedQuizzes);
    }).catch(err=>console.log(err));
    setCreatedQuizzes(['lka','kal','lakj','kalsj']);
    setAttemptedQuizzes(['lka','kal','lakj','kalsj']);
    // console.log(createdQuizzes);
  },[])
  return (
    <div>
        <h1>Created Quizzes</h1>
        <ul>{
          createdQuizzes.map((quizId,index)=>{
            return <li key={index}><CreatedQuizCard quizId={quizId}/></li>
          })
        }
        </ul>
        <h1>Attempted Quizzes</h1>
        <ul>{
          attemptedQuizzes.map((quizId,index)=>{
            return <li key={index}><AttemptedQuizCard quizId={quizId}/></li>
          })
        }</ul>
    </div>
  )
}

export default Dashboard;