// import React from 'react'
/* eslint-disable react/prop-types */

const ProgressBar = ({index, numberQuestions, points, totalPoints, answer}) => {

  return (
    <header className='progress'>
      <progress max={numberQuestions} value={index + Number(answer !== null)} />
      <p>Question <strong>{index + 1}</strong> / {numberQuestions}</p>
      <p><strong>{points}</strong> / {totalPoints}</p>
    </header>
  )
}

export default ProgressBar;
