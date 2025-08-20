import React, { useEffect, useState } from 'react';
import './Myshows.css';
import axios from 'axios';

function Myshows() {
  const [boughtShows, setBoughtShows] = useState([]);

  useEffect(() => {
    const fetchBoughtShows = async () => {
      const userId = localStorage.getItem("token"); 
      if (!userId) return; 

      try {
        const res = await axios.get(`http://localhost:5000/users/${userId}`);
        if (res.data.user && res.data.user.boughtShows) {
          setBoughtShows(res.data.user.boughtShows);
        }
      } catch (err) {
        console.error("Failed to fetch bought shows:", err);
      }
    };

    fetchBoughtShows();
  }, []);

  return (
    <div className='editshows2 cartShift'>
      <div className='vijaya'>
        <div className='pendingshows'>My Shows</div>
      </div>

      <div className='wanttoflex'>
        <div className='showname'>Shows</div>
        <div className='othershowdet'>No.Spots</div>
      </div>

      {boughtShows.map((item, index) => (
        <div key={index} className='wanttoflex2'>
          <div className='showname'>
            <img src={item.imageUrl} alt={item.artistName} width="50" style={{ marginRight: '8px' }} />
            <div className='havesamespace'>
              {item.artistName + " at " + item.time}
            </div>
          </div>

          <div className='othershowdet4'>{item.quantity}</div>
        </div>
      ))}

      {boughtShows.length === 0 && (
        <div style={{ textAlign: "center", color: "white", marginTop: "20px" }}>
          You haven't bought any shows yet.
        </div>
      )}
    </div>
  );
}

export default Myshows;
