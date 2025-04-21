import { useState, useEffect } from 'react';
import './App.css';
import Gallery from './components/Gallery';

// Prompt #1
// Fetch tours from https://course-api.com/react-tours-project using useEffect
// Store in state: tours, loading, error

// Prompt #2
// If loading is true, display "Loading..."
// If error, display an error message
// Else, render Gallery with tour data

// Prompt #3
// If no tours are left, show a "Refresh" button to refetch the data

function App() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTours = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://course-api.com/react-tours-project');
      if (!response.ok) {
        throw new Error('Failed to fetch tours');
      }
      const data = await response.json();
      setTours(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      setTours([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTours();
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>Error: {error}</h2>;
  }

  const removeTour = (id) => {
    setTours(tours.filter((tour) => tour.id !== id));
  };

  if (tours.length === 0) {
    return (
      <div>
        <h2>No Tours Left</h2>
        <button onClick={fetchTours}>Refresh</button>
      </div>
    );
  }

  return (
    <div>
      <h1>Tours</h1>
      <Gallery tours={tours} onRemove={removeTour} />
    </div>
  );
}

export default App;
