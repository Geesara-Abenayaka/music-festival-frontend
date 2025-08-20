import React, { useState } from 'react';
import './Addashow.css';
import axios from 'axios';

function Addashow() {
    const [artistName, setArtistName] = useState('');
    const [time, setTime] = useState('');
    const [location, setLocation] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) setImage(file);
    };

    const handleCreateShow = async (e) => {
        e.preventDefault();

        if (!artistName || !time || !location || !price || !image) {
            alert('Please fill all fields and upload an image.');
            return;
        }

        try {
            setLoading(true);

            const formData = new FormData();
            formData.append('artistName', artistName);
            formData.append('time', time);
            formData.append('location', location);
            formData.append('price', price);
            formData.append('image', image); 

            const res = await axios.post(
                'http://localhost:5000/api/shows', 
                formData,
                { headers: { 'Content-Type': 'multipart/form-data' } }
            );

            if (res.data.success) {
                alert('Show created successfully!');
                setArtistName('');
                setTime('');
                setLocation('');
                setPrice('');
                setImage(null);
            }
        } catch (err) {
            console.error('Error creating show:', err.response?.data || err.message);
            alert('Error creating show. Check console for details.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='accountdetails'>
            <div className='keepalign'>
                <p className='david'>Add a Show</p>
            </div>

            <form onSubmit={handleCreateShow} encType="multipart/form-data">
                <label className='artistnamelabel'>
                    Artist Name
                    <input
                        type="text"
                        value={artistName}
                        onChange={(e) => setArtistName(e.target.value)}
                        placeholder="Enter artist's name"
                        required
                    />
                </label>
                <br />

                <label className='country2'>
                    Time He/She Plays
                    <select value={time} onChange={(e) => setTime(e.target.value)} required className='countrybox2'>
                        <option value="" disabled>Choose a time</option>
                        <option value='08:30-10:30 (1st Day)'>08:30-10:30 (1st Day)</option>
                        <option value='10:30-12:00 (3rd Day)'>10:30-12:00 (3rd Day)</option>
                        <option value='13:00-15:00 (2nd Day)'>13:00-15:00 (2nd Day)</option>
                        <option value='08:30-10:30 (2nd Day)'>08:30-10:30 (2nd Day)</option>
                        <option value='08:30-10:30 (3rd Day)'>08:30-10:30 (3rd Day)</option>
                        <option value='10:30-12:00 (1st Day)'>10:30-12:00 (1st Day)</option>
                        <option value='14:00-16:00 (2nd Day)'>14:00-16:00 (2nd Day)</option>
                    </select>
                </label>
                <br />

                <label className='country2'>
                    Where He/She Plays
                    <select value={location} onChange={(e) => setLocation(e.target.value)} required className='gender2'>
                        <option value="" disabled>Choose a location</option>
                        <option value='Mainstage'>At Mainstage</option>
                        <option value='Rose Garden'>At Rose Garden</option>
                        <option value='Dreamvilla'>At Dreamvilla</option>
                    </select>
                </label>
                <br />

                <label className='country2'>
                    Artist's Ticket Price
                    <select value={price} onChange={(e) => setPrice(e.target.value)} required className='language2'>
                        <option value="" disabled>Choose a price</option>
                        <option value='50'>50</option>
                        <option value='100'>100</option>
                        <option value='150'>150</option>
                        <option value='200'>200</option>
                        <option value='250'>250</option>
                        <option value='300'>300</option>
                    </select>
                </label>
                <br />

                <label className='image-upload1'>
                    Give an image for the artist
                    <label className="custom-file-upload1">
                        <input type="file" accept="image/*" onChange={handleImageChange} required />
                        Choose File
                    </label>
                </label>

                {image && (
                    <div className="image-preview1">
                        <p>{image.name} selected</p>
                    </div>
                )}

                <br />
                <button className='savechangesbtn1' type="submit" disabled={loading}>
                    {loading ? 'Creating...' : 'Create Show'}
                </button>
            </form>
        </div>
    );
}

export default Addashow;
