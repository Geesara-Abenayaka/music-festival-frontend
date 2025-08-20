import React, { useRef, useEffect, useState } from 'react';
import './Maincomponent.css';
import AAA from "../Card/Card";
import backgroundvideo from '../assets/backgroundvideo.webm';
import { MdArrowBackIos } from "react-icons/md";
import { MdArrowForwardIos } from "react-icons/md";
import axios from "axios";

function Maincomponent() {
  const videoRef = useRef(null);
  const [shows, setShows] = useState([]);
  const [filteredShows, setFilteredShows] = useState([]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 480;
      videoRef.current.play().catch(err => console.error("Autoplay error:", err));
    }
  }, []);


  useEffect(() => {
    const fetchShows = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/shows");
        const allShows = res.data.shows || [];
        setShows(allShows);
        setFilteredShows(allShows);
      } catch (err) {
        console.error("Failed to fetch shows:", err);
      }
    };

    fetchShows();
  }, []);


  const filterByArtist = (artist) => setFilteredShows(shows.filter(show => show.artistName === artist));
  const filterByLocation = (location) => setFilteredShows(shows.filter(show => show.location === location));
  const filterByTime = (time) => setFilteredShows(shows.filter(show => show.time === time));


  const showAll = () => setFilteredShows(shows);

  return (
    <div className='stylemain'>
      <div className="jkl">Upcoming Shows & Events</div>

 
      <button className='showall-btn' onClick={showAll}>Show All</button>


      <div className='dropdown'>
        <button className='dropbtn'>Choose by Artist</button>
        <div className='dropdowncontent'>
          {[...new Set(shows.map(show => show.artistName))].map((artist, index) => (
            <a href="#" key={index} onClick={() => filterByArtist(artist)}>{artist}</a>
          ))}
        </div>
      </div>

      <div className='dropdown'>
        <button className='dropbtn'>Choose by Stage</button>
        <div className='dropdowncontent'>
          {[...new Set(shows.map(show => show.location))].map((location, index) => (
            <a href="#" key={index} onClick={() => filterByLocation(location)}>{location}</a>
          ))}
        </div>
      </div>

      <div className='dropdown'>
        <button className='dropbtn'>Choose by Time</button>
        <div className='dropdowncontent'>
          {[...new Set(shows.map(show => show.time))].map((time, index) => (
            <a href="#" key={index} onClick={() => filterByTime(time)}>{time}</a>
          ))}
        </div>
      </div>

      <br />
      <div className='iwantthat'>
        <div className="wannablur">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            className="background-video4"
          >
            <source src={backgroundvideo} type="video/webm" />
            Your browser does not support the video tag.
          </video>

          <div className='wannaaligncenter'>
            {filteredShows.map((show, index) => {
              const imageUrl = `http://localhost:5000${show.imageUrl}`;
              return (
                <AAA
                  key={index}
                  image={imageUrl}
                  name={show.artistName}
                  time={show.time}
                  location={show.location}
                  price={show.price}
                />
              );
            })}
          </div>

          <div className='backbutton'>
            <p className='b1'> <MdArrowBackIos/> </p>
            <p className='n1'> <MdArrowForwardIos/></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Maincomponent;
