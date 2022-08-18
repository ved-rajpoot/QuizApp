import React from 'react'
import { useNavigate } from 'react-router-dom'

const Result = ({score}) => {
  const navigate = useNavigate();
  return (
    <div>
        <h1>Thanks for attempting, Your score is {score}</h1>
        <button onClick={()=>navigate('/dashboard')}>Dashboard</button>
    </div>
  )
}

export default Result;