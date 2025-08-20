import React, { useEffect, useState } from 'react';
import './Navigationbar.css';
import { RiAccountCircleFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom"; 

function Navigationbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleAccountClick = () => {
    if (user) {
      if (user.isAdmin) {
        navigate("/admindashboard");
      } else {
        navigate("/userdashboard");
      }
    } else {
      navigate("/login");
    }
  };

  const handleScroll = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className='navbar'>
      <div className='festname'>Skyveil</div>

      <div className='links'>
        <Link to='#' className='a' onClick={() => handleScroll("landing-section")}>Home</Link>
        <Link to='#' className='b' onClick={() => handleScroll("events-section")}>Shows</Link>
        <Link to='#' className='c' onClick={() => handleScroll("reviews-section")}>Feedback</Link>
        <Link to='#' className='d' onClick={() => handleScroll("reachus-section")}>Contact</Link>
      </div>

      <button className="loginbtn" onClick={handleAccountClick}>
        <RiAccountCircleFill className="profileicon" />
        <div className="btntext">My Account</div>
      </button>
    </div>
  );
}

export default Navigationbar;
