import { useEffect, useReducer } from 'react'
import './App.css'
import Header from './components/header/Header'
import Main from './components/main/Main'


const initialState = {
  questions: [

  ],

  // 'loading', 'active', 'error', 'ready', 'finished', 'dataReceived'
  status: "loading"
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'dataReceived':
      return {...state, questions: action.payload, status: 'ready'}
      
    case 'dataFailed':
      return {...state, status: 'error'};
  
    default:
      throw new Error("Action unknown")
  }
}

function App() {

  const [state, dispatch] = useReducer(reducer, initialState);

 
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
          <p>1/15</p>
          <p>Question?</p>
        </Main>
      </div>
  )
}

export default App
