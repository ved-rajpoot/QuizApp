import React from 'react'
import { useEffect, useState } from 'react';
import CreatedQuizCard from '../../components/createdQuizCard/createdQuizCard';
import axios from 'axios';
import AttemptedQuizCard from '../../components/attemptedQuizCard/attemptedQuizCard';
import jwtDecode from 'jwt-decode';
import LoadingScreen from '../loadingScreen/loadingScreen';

const Dashboard = ({user,setLoginUser}) => {
  const [createdQuizzes,setCreatedQuizzes] = useState([]);
  const [attemptedQuizzes,setAttemptedQuizzes] = useState([]);
  const [loading,setLoading] = useState(true);

  useEffect( ()=>{
      const token = localStorage.getItem('token');
      const User = jwtDecode(token);
      const tempuser = {id:User.id,name:User.name,email:User.email};
      console.log('tempuser: ',tempuser);
      axios.post('http://localhost:8000/getquizzes',tempuser)
      .then((res)=>{

      console.log('response data from getquizzes: ', res.data);
      setCreatedQuizzes(res.data.createdQuizzes);
      setAttemptedQuizzes(res.data.attemptedQuizzes);
    }).catch(err=>console.log(err));
    // setCreatedQuizzes(['lka','kal','lakj','kalsj']);
    // setAttemptedQuizzes(['lka','kal','lakj','kalsj']);
    // console.log(createdQuizzes);
    setLoading(false);
  },[])
  return (
    loading || attemptedQuizzes.length===0 || createdQuizzes.length===0 ? <LoadingScreen/>:
    <div>
        <h1>Created Quizzes</h1>
        { <ul>{
          createdQuizzes.map((quiz,index)=>{
            return <li key={index}><CreatedQuizCard quiz={quiz}/></li>
          })
        }
        </ul> }
        <h1>Attempted Quizzes</h1>
        { <ul>{
          attemptedQuizzes.map((quiz,index)=>{
            return <li key={index}><AttemptedQuizCard quizId={quiz}/></li>
          })
        }</ul> }
    </div>
  )
}

export default Dashboard;