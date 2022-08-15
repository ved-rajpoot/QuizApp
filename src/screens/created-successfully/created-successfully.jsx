import React from 'react'
import {useParams} from 'react-router-dom';

const Createdsuccessfully = () => {
    const {quizcode} = useParams();
    return (
      <>
      <div>{quizcode}</div>
      <div>Created-successfully</div>
      </>
    )
}

export default Createdsuccessfully