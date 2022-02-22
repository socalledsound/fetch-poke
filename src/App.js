import { useReducer, useEffect } from 'react';
import './App.css';

const request = `https://pokeapi.co/api/v2/pokemon?limit=10`;
// const badRequest = `https://pokeapi.co/api/v10/pokemon?limit=10`;

const initialState = {
  isLoading: false,
  data: null,
  error: null,
}


function App() {
  // const [isLoading, setLoading] = useState(false); 
  // const [data, setData ] = useState(null);
  // const [error, setError] = useState(null); 

  const [state, dispatch ] = useReducer((state, action) => {
    console.log(state, action);
      switch(action.type){
        case 'PENDING' :
            return {
              ...state,
              isLoading: true
            }
        case 'FULFILLED' : 
            return {
              ...state,
              isLoading: false,
              data: action.payload
            }
        case 'REJECTED' : 
            return {
              ...state,
              isLoading: false,
              error: action.payload,
            }
        default : 
            return state
      }

  }, initialState);



  useEffect(() => {
    dispatch({type: 'PENDNG'})
    fetch(request)
      .then(response => response.json())
      .then(data => {
        setTimeout(() => {
          dispatch({type: 'FULFILLED', payload: data})
        }, 5000)
          
        return null
      })
      .catch(err => dispatch({type: 'REJECTED', payload: err.toString()}))
  }, [])

  const { isLoading, data, error } = state;
  console.log(isLoading)

if(data){
  console.log(data.results)
}
if(error){
  console.log(error);
}
 
  return (
    <div className="App">
            {
        isLoading && 
        <div>
          <h1>loading.....</h1>
        </div>
      }
      {
      error &&
        <div>
          <h1>whoopsie!: that was a bad request</h1>
          <p>{error}</p>
        </div>
      }
      {
        data &&
        // data.results.length > 0 &&
        <div>
          <h1>top 10 poke</h1>
            {
              data.results.map((item, idx) => <div key={idx}>{item.name}</div>)
            }
        </div>
      }
    </div>
  );
}

export default App;
