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

function App() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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

  return (
    <div>
      <h1>Tours</h1>
      <Gallery tours={tours} onRemove={removeTour} />
    </div>
  );
}

export default App;
