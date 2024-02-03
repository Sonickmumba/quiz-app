// import React from "react";
/* eslint-disable react/prop-types */

const NextQuestion = ({ dispatch, answer }) => {
  if(answer === null) return null;
  return (
    <button
    type="button"
    className="btn btn-ui"
    onClick={() => dispatch({ type: "nextQuestion" })}
  >
    Next Question
  </button>
  );
};

export default NextQuestion;
