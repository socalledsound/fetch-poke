import { useState, useEffect } from 'react';
import './App.css';

const request = `https://pokeapi.co/api/v2/pokemon?limit=10`;
const badRequest = `https://pokeapi.co/api/v10/pokemon?limit=10`;

function App() {
  const [isLoading, setLoading] = useState(false); 
  const [data, setData ] = useState(null);
  const [error, setError] = useState(null); 

  useEffect(() => {
    setLoading(true);
    fetch(request)
      .then(response => response.json())
      .then(data => {
        setTimeout(() => {
          setData(data);
          setLoading(false);
        }, 5000)
          
        return null
      })
      .catch(err => setError(err.toString()))
  }, [])
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
