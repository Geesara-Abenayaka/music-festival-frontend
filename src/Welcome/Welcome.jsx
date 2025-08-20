import React, { useState, useEffect } from 'react';
import axios from 'axios';


import './Welcome.css'
import { BACKEND_BASE } from '../config';

function Welcome() {

  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState("");
      const [inputs, setInputs] = useState({
          name: "",
          email: "",
          nic: "",
          country: "",
          gender: "",
          language: "",
      });



  useEffect(() => {
          const fetchUser = async () => {
              try {
                  const userIdFromStorage = localStorage.getItem("token"); 
  
                  
                  console.log("localStorage token:", userIdFromStorage);
  
                  if (!userIdFromStorage) {
                      console.error("No user ID found in localStorage");
                      return;
                  }
  
                  const response = await axios.get(
                      `${BACKEND_BASE}users/${userIdFromStorage}`,
                      {
                          headers: { "Content-Type": "application/json" }
                      }
                  );
  
                  
                  console.log("Fetched user:", response.data);
  
                  const user = response.data.user; 
  
                  setUserId(user._id || "");
                  setInputs({
                      name: user.name || "",
                      email: user.email || "",
                      nic: user.nic || "",
                      country: user.country || "",
                      gender: user.gender || "",
                      language: user.language || ""
                  });
              } catch (err) {
                  console.error("Failed to fetch user:", err);
                  alert("Failed to load user data.");
              }
          };
  
          fetchUser();
      }, []);
  
  // useEffect(() => {

  //   const user = JSON.parse(localStorage.getItem('user'));
  //   if (user && user.name) {
  //     setUserName(user.name);
  //   }
  // }, []);
  return (
   <div className='wannagodown7 tomorrowland-default'>
         <p className='welcome'>Hello! {inputs.name}</p>
        <h1>Welcome to Skyveil Dashboard!</h1>
        <p className='discovertitle'>Discover the latest shows, events, and festival highlights!</p>
       
        
        
      </div>
  
 
  )
}

export default Welcome