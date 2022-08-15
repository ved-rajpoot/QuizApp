import React from 'react'
import { useParams } from 'react-router-dom';

const AttemptQuiz = () => {
    const { quizcode } = useParams();
    return (
      <div>
          <div>{quizcode}</div>
          <div>Attempt-quiz</div>
          <button>Submit</button>
      </div>
    )
}

export default AttemptQuiz;