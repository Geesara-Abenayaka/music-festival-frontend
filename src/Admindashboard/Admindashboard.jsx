import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cart from '../Cart/Cart';
import Myshows from '../Myshows/Myshows';
import Addashow from '../Addashow/Addashow';
import Welcome from '../Welcome/Welcome';
import Deleteashow from '../Deleteashow/Deleteashow';
import Editashow from '../Editashow/Editashow';
import './Admindashboard.css'
import Navigationbar from '../Navigationbar/Navigationbar';
import { IoMdMenu } from "react-icons/io";
import kygo  from '../assets/a.webp'
import garrix  from '../assets/b.webp'
import avicii  from '../assets/c.jpg'
import alan from '../assets/d.jpeg'
import backgroundvideo from '../assets/backgroundvideo.webm';
import Changepassword from '../Changepassword/Changepassword';

function Admindashboard() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const navigate = useNavigate();


  const geesara = (menu) => {
    if(menu === 'Back to Home') {
      navigate('/');
    }
  }

  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
    setMenuOpen(false);
  };

  
  const handleLogout = () => {
    localStorage.removeItem("token"); 
    localStorage.removeItem("user");  
    alert("Successfully logged out!"); 
    navigate("/"); 
  }

  return (
    <>
      <video
        autoPlay
        muted
        loop
        playsInline
        className="background-video1"
      >
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
       
        <div className='menuitems' onClick={() => handleMenuClick('Add a Show')}>Add a Show</div>
        <div className='menuitems' onClick={() => handleMenuClick('Delete a Show')}>Delete a Show</div>
        <div className='menuitems' onClick={() => handleMenuClick('Edit a Show')}>Edit a Show</div>
        <div className='menuitems' onClick={() => handleMenuClick('Change Password')}>Change Password</div>
        <div className='menuitems' onClick={() => geesara('Back to Home')}>Back to Home</div>
        <div className='menuitems' onClick={handleLogout}>Log Out</div> {/* fixed */}
      </div>

     
      <div className={`slide-container ${menuOpen ? 'shifted' : ''}`}>
        {selectedMenu === 'Delete a Show' && (
          <div className={`wannagodown4 ${menuOpen ? 'loweena' : ''}`}>
            <Deleteashow/>
          </div>
        )}
        {selectedMenu === 'Edit a Show' && (
          <div className={`wannagodown5 ${menuOpen ? 'geesara' : ''}`}>
            <Editashow />
          </div>
        )}
        {selectedMenu === 'Add a Show' && (
          <div className={`wannagodown2 ${menuOpen ? 'shifted' : ''}`}>
            <Addashow/>
          </div>
        )}
        {selectedMenu === 'Change Password' && (
          <div className={`wannagodown6 ${menuOpen ? 'latha' : ''}`}>
            <Changepassword />
          </div>
        )}
        {!selectedMenu && (
          <div className={`skyveil-content ${menuOpen ? 'shifted' : ''}`}>
            <br/>
            <div className={`welcomediv2 ${menuOpen ? 'abenayaka' : ''}`}>
              <Welcome/>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Admindashboard;
