import React, { useEffect, useState } from 'react';
import './Editashow.css';
import axios from 'axios';

function Editashow() {
  const [cards, setCards] = useState([]);


  useEffect(() => {
    const fetchShows = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/shows");
        const showsWithImages = res.data.shows.map(show => ({
          id: show._id,
          artistName: show.artistName,
          time: show.time,
          location: show.location,
          price: show.price,
          imageUrl: show.imageUrl.startsWith('http') 
                    ? show.imageUrl 
                    : `http://localhost:5000${show.imageUrl}`,
          newImageFile: null, 
        }));
        setCards(showsWithImages);
      } catch (err) {
        console.error("Error fetching shows:", err);
      }
    };
    fetchShows();
  }, []);


  const handleInputChange = (index, field, value) => {
    const newCards = [...cards];
    newCards[index][field] = value;
    setCards(newCards);
  };


  const handleImageChange = (index, file) => {
    if (!file) return;
    const newCards = [...cards];
    newCards[index].imageUrl = URL.createObjectURL(file); 
    newCards[index].newImageFile = file; 
    setCards(newCards);
  };


  const handleSaveAll = async () => {
    try {
      for (let i = 0; i < cards.length; i++) {
        const show = cards[i];
        const formData = new FormData();
        formData.append('artistName', show.artistName);
        formData.append('time', show.time);
        formData.append('location', show.location);
        formData.append('price', show.price);
        if (show.newImageFile) {
          formData.append('image', show.newImageFile);
        }

        await axios.put(`http://localhost:5000/api/shows/${show.id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }

      alert("All changes saved!");
    } catch (err) {
      console.error("Error saving shows:", err);
      alert("Failed to save changes.");
    }
  };

  return (
    <div>
      <div className='editashow-container'>
        <div className='editashow-title'>Edit Shows</div>
        <button className='savechanges' onClick={handleSaveAll}>Save Changes</button>
      </div>

      <div className="card-scroll-container">
        {cards.map((card, index) => (
          <div key={card.id} className='stylecard'>
          
            <label style={{ cursor: 'pointer' }}>
              <img src={card.imageUrl} className="artist-img" alt={card.artistName} />
              <input
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={(e) => handleImageChange(index, e.target.files[0])}
              />
            </label>

          
            <div className='cardcontent'>
              <input
                type="text"
                value={card.artistName}
                onChange={(e) => handleInputChange(index, 'artistName', e.target.value)}
                className="edit-input"
                placeholder="Artist Name"
              />
              <br />
              <input
                type="text"
                value={card.time}
                onChange={(e) => handleInputChange(index, 'time', e.target.value)}
                className="edit-input"
                placeholder="Time"
              />
              <br />
              <input
                type="text"
                value={card.location}
                onChange={(e) => handleInputChange(index, 'location', e.target.value)}
                className="edit-input"
                placeholder="Location"
              />
              <br />
              <input
                type="text"
                value={card.price}
                onChange={(e) => handleInputChange(index, 'price', e.target.value)}
                className="edit-input"
                placeholder="Price"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Editashow;
