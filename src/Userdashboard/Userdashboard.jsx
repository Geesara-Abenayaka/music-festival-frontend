import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cart from '../Cart/Cart';
import Myshows from '../Myshows/Myshows';
import Account from '../Account/Account';
import Welcome from '../Welcome/Welcome';
import Changepassword from '../Changepassword/Changepassword';
import './Userdashboard.css';
import { IoMdMenu } from "react-icons/io";
import backgroundvideo from '../assets/backgroundvideo.webm';

function Userdashboard() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(null);

  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);


  const geesara = (menu) => {
    if (menu === 'Back to Home') {
      navigate('/');
    } else if (menu === 'Log Out') {
      
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('userId');
      localStorage.removeItem('cartItems');
      localStorage.setItem('isLoggedIn', 'false');

      alert("Successfully logged out");
      navigate('/'); 
    }
  };


  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
    setMenuOpen(false);
  };

  
  const handleDeleteAccount = async () => {
    const userId = localStorage.getItem("userId") || localStorage.getItem("token");
    if (!userId) {
      alert("User not logged in");
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );
    if (!confirmDelete) return;

    try {
      await fetch(`http://localhost:5000/users/${userId}`, {
        method: 'DELETE',
      });

      
      localStorage.removeItem("userId");
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("cartItems");
      localStorage.setItem("isLoggedIn", "false");

      alert("Account deleted successfully");
      navigate("/login"); 
    } catch (err) {
      console.error(err);
      alert("Error deleting account");
    }
  };

  return (
    <>
      
      <video autoPlay muted loop playsInline className="background-video1">
        <source src={backgroundvideo} type="video/webm" />
        Your browser does not support the video tag.
      </video>

     
      {!menuOpen && (
        <div className='menu'>
          <IoMdMenu
            className='menubutton'
            onClick={() => setMenuOpen(true)}
          />
        </div>
      )}

     
      <div className={`menuhandler ${menuOpen ? 'open' : ''}`}>
        <div className='menuitem'>Menu</div>
        <div className='closebtn' onClick={() => setMenuOpen(false)}>✖</div>
        <div className='menuitems' onClick={() => handleMenuClick('My Shows')}>My Shows</div>
        <div className='menuitems' onClick={() => handleMenuClick('Manage Shows')}>Manage Shows</div>
        <div className='menuitems' onClick={() => handleMenuClick('Account')}>Account</div>
        <div className='menuitems' onClick={() => handleMenuClick('Change Password')}>Change Password</div>
        <div className='menuitems' onClick={handleDeleteAccount}>Delete Account</div>
        <div className='menuitems' onClick={() => geesara('Back to Home')}>Back to Home</div>
        <div className='menuitems' onClick={() => geesara('Log Out')}>Log Out</div>
      </div>

     
      <div className={`slide-container ${menuOpen ? 'shifted' : ''}`}>
        {selectedMenu === 'My Shows' && <div className='wannagodown1'><Myshows /></div>}
        {selectedMenu === 'Manage Shows' && <div className={`wannagodown ${menuOpen ? 'shifted' : ''}`}><Cart /></div>}
        {selectedMenu === 'Account' && <div className={`wannagodown2 ${menuOpen ? 'shifted' : ''}`}><Account /></div>}
        {selectedMenu === 'Change Password' && <div className={`wannagodown6 ${menuOpen ? 'latha' : ''}`}><Changepassword /></div>}
        {!selectedMenu && (
          <div className={`skyveil-content ${menuOpen ? 'shifted' : ''}`}>
            <br />
            <div className={`welcomediv2 ${menuOpen ? 'abenayaka' : ''}`}>
              <Welcome />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Userdashboard;
