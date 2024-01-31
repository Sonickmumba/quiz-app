import { useEffect, useReducer } from 'react'
import './App.css'
import Header from './components/header/Header'
import Main from './components/main/Main';
import Loader from './components/util/Loader'
import Error from './components/util/Error'
import StartScreen from './components/util/StartScreen';
import Question from './components/question/Question';


const initialState = {
  questions: [],

  // 'loading', 'active', 'error', 'ready', 'finished', 'dataReceived'
  status: "loading",
  index: 0
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'dataReceived':
      return {...state, questions: action.payload, status: 'ready'}
      
    case 'dataFailed':
      return {...state, status: 'error'};
    case 'start':
      return {...state, status: 'active'}
  
    default:
      throw new Error("Action unknown")
  }
}

function App() {

  const [{questions, status, index}, dispatch] = useReducer(reducer, initialState);
  const numQuestions = questions.length;

 
  useEffect (() => {
    const fetchData = async () => {
     try {
        const res = await fetch('http://localhost:8000/questions');
        const data = await res.json();
        dispatch({
          type: "dataReceived",
          payload: data
        });
     } catch (error) {
      dispatch({
        type: 'dataFailed',
      })
      console.error('Error fetching data:', error);
      throw error;
     } 
    }
    fetchData();
  },[])

  return (
      <div className='app'>
        <Header />
        <Main>
          {status === 'loading' && <Loader />}
          {status === 'error' && <Error />}
          {status === 'ready' && <StartScreen numQuestions={numQuestions} dispatch={dispatch}/>}
          {status === 'active' && <Question question={questions[index]}/>}

        </Main>
      </div>
  )
}

export default App
