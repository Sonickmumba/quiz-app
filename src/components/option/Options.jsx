/* eslint-disable react/prop-types */
// import React from 'react'

const Options = ({ question, dispatch, answer }) => {
  return (
    <div className="options">
      {question.options.map((opt, index) => (
        <button
          className={`btn btn-option ${index === answer ? "answer" : ""} ${index === question.correctOption ? "correct" : "wrong"}`}
          key={opt}
          onClick={() => dispatch({ type: "newAnswer", payload: index })}
        >
          {opt}
        </button>
      ))}
    </div>
  );
};

export default Options;
