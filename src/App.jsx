import { useState, useEffect } from 'react';
import './App.css';
import Gallery from './components/Gallery';

/*
Executed the following prompots 

Prompt #1
Fetch tours from https://api.allorigins.win/raw?url=https://course-api.com/react-tours-project using useEffect
Store in state: tours, loading, error

Prompt #2
If loading is true, display "Loading..."
If error, display an error message
Else, render Gallery with tour data

Prompt #3
If no tours are left, show a "Refresh" button to refetch the data
*/

function App() {
  const [tours, setTours] = useState([]);         // react state for list of tours
  const [loading, setLoading] = useState(true);   // react state to show loading indicator
  const [error, setError] = useState(null);       // react state if error has occurred

  // Method to fetch tours from API endpoint
  const fetchTours = async () => {

    // show loading indicator while loading
    setLoading(true);

    try {
      // call the API endpoint
      const response = await fetch('https://api.allorigins.win/raw?url=https://course-api.com/react-tours-project');

      // check response and set error if issue
      if (!response.ok) {
        throw new Error('Failed to fetch tours');
      }

      // parse the text response and convert to JSON list
      const data = await response.json();

      // set the tours react state
      setTours(data);

      // clear error
      setError(null);

    } catch (err) {
      // set error message
      setError(err.message);
      setTours([]);
    } finally {
      // hide loading indicator
      setLoading(false);
    }
  };

  // execute the fetchTours method when the component mounts
  useEffect(() => {
    fetchTours();
  }, []);

  // show loading indicator when in loading state
  if (loading) {
    return <h2>Loading...</h2>;
  }

  // show error message if error occurred
  if (error) {
    return <h2>Error: {error}</h2>;
  }

  // method to remove a tour from the list
  const removeTour = (id) => {
    setTours(tours.filter((tour) => tour.id !== id));
  };

  // if no tours left, show refresh butto
  if (tours.length === 0) {
    return (
      <div>
        <h2>No Tours Left</h2>
        <button onClick={fetchTours}>Refresh</button>
      </div>
    );
  }

  // render the gallery with the list of tours
  return (
    <div>
      <h1>Tours</h1>
      <Gallery tours={tours} onRemove={removeTour} />
    </div>
  );
}

export default App;
