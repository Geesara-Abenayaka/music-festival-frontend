import React, { useEffect, useState } from 'react';
import './Deleteashow.css';
import axios from 'axios';

function Deleteashow() {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/shows');
        if (res.data.success) {
          setShows(res.data.shows);
        } else {
          console.error("Failed to fetch shows:", res.data.message);
        }
      } catch (err) {
        console.error("Error fetching shows:", err);
      }
    };
    fetchShows();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this show?")) return;

    try {
      const res = await axios.delete(`http://localhost:5000/api/shows/${id}`);
      if (res.data.success) {
        setShows(prevShows => prevShows.filter(show => show._id !== id));
      } else {
        alert("Failed to delete show: " + res.data.message);
      }
    } catch (err) {
      console.error("Error deleting show:", err);
      alert("Error deleting show. Check console for details.");
    }
  };

  return (
    <div className='delete'>
      <h2>Delete a Show</h2>
      {shows.length === 0 && <p>No shows available</p>}

      <div className="shows-scroll-container">
        {shows.map(show => (
          <div className='thisishowitworks' key={show._id}>
            <div className='show-left'>
              <img
                src={`http://localhost:5000${show.imageUrl}`}
                alt={show.artistName}
                className='aviciiimg'
              />
              <div className='show-details'>
                <p className='showname'>{show.artistName}</p>
                <p className='wannahaveapadding'>{show.time} at {show.location}</p>
              </div>
            </div>

            <button
              className='deletebutton'
              onClick={() => handleDelete(show._id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Deleteashow;
