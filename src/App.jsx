import { useEffect, useReducer } from "react";
import "./App.css";
import Header from "./components/header/Header";
import Main from "./components/main/Main";
import Loader from "./components/util/Loader";
import Error from "./components/util/Error";
import StartScreen from "./components/util/StartScreen";
import Question from "./components/question/Question";
import NextQuestion from "./components/util/NextQuestion";
import ProgressBar from "./components/progress/ProgressBar";

const initialState = {
  questions: [],

  // 'loading', 'active', 'error', 'ready', 'finished', 'dataReceived'
  status: "loading",
  index: 0,
  answer: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };

    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return { ...state, status: "active" };
    case "newAnswer": {
      const question = state.questions.at(state.index);

      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      }}
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };

    default:
      throw new Error("Action unknown");
  }
};

function App() {
  const [{ questions, status, index, answer, points }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const numQuestions = questions.length;
  const totalPoints = questions.reduce((prev, cur) => prev + cur.points, 0);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:8000/questions");
        const data = await res.json();
        dispatch({
          type: "dataReceived",
          payload: data,
        });
      } catch (error) {
        dispatch({
          type: "dataFailed",
        });
        console.error("Error fetching data:", error);
        throw error;
      }
    };
    fetchData();
  }, []);

  console.log(questions);
  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <ProgressBar
              index={index}
              numberQuestions={numQuestions}
              points={points}
              totalPoints={totalPoints}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <NextQuestion dispatch={dispatch} answer={answer} />
          </>
        )}
      </Main>
    </div>
  );
}

export default App;
