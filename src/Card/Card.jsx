import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Card.css';

function Card({ image, name, time, location, price }) {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    setIsLoggedIn(!!storedUser && storedUser !== 'null' && storedUser !== 'undefined');
  }, []);

  const handleReserve = () => {
    if (!isLoggedIn) {
      alert("⚠️ You must log in to reserve a spot!");
      navigate("/login");
      return;
    }

  
    const cardData = { image, name, time, location, price };

    const existing = JSON.parse(localStorage.getItem('cartItems')) || [];

    const index = existing.findIndex(
      item => item.name === name && item.time === time
    );

    if (index !== -1) {
      existing[index].quantity = Number(existing[index].quantity || 0) + 1;
    } else {
      existing.push({ ...cardData, quantity: 1 });
    }


    localStorage.setItem('cartItems', JSON.stringify(existing));

    alert(`${name} at ${time} has been added to your pending shows!`);
  };

  return (
    <div className='stylecard'>
      <img src={image} className="artist-img" alt={name} />
      <div className='cardcontent'>
        <p>
          {name}<br />
          {time}<br />
          {location}<br />
          <div className='price'>${price}</div>
        </p>
        <button
          className='respotbtn'
          onClick={handleReserve}
          disabled={!isLoggedIn} 
          title={!isLoggedIn ? "Please login to reserve a spot" : ""}
          style={{
            cursor: isLoggedIn ? 'pointer' : 'not-allowed',
            opacity: isLoggedIn ? 1 : 0.5
          }}
        >
          {isLoggedIn ? "Reserve Spot" : "Login to Reserve"}
        </button>
      </div>
    </div>
  );
}

export default Card;
