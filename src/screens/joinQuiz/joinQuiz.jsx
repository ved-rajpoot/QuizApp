import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const JoinQuiz = () => {
  const [quizCode, setQuizCode] = useState('');
  const navigate = useNavigate();
  useEffect(()=>{
    console.log(quizCode);
  },[quizCode])

  const joinQuiz = ()=>{
    console.log('join quiz button clicked');
    console.log(quizCode);
    navigate(`/attempt-quiz/${quizCode}`)
  }
  return (
    <div>
      <input type="text" value={quizCode} name="quizCode" placeholder='Enter Quiz Code' onChange={(e)=>{setQuizCode(e.target.value)}}/>
      <button onClick={joinQuiz}>Join Quiz</button>
    </div>
  )
}

export default JoinQuiz;