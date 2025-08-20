import React, { useState } from 'react';
import axios from 'axios';
import './Changepassword.css';

function Changepassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleChangePassword = async () => {
    if (newPassword.length < 8) {
      alert("❌ New password must be at least 8 characters long");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("❌ New passwords do not match");
      return;
    }

    try {
      const userId = localStorage.getItem("userId") || localStorage.getItem("token");
      if (!userId) {
        alert("User not logged in");
        return;
      }

      const response = await axios.put(
        `http://localhost:5000/users/${userId}`,
        { oldPassword, password: newPassword },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.data.success === false) {
        alert(`❌ ${response.data.message}`);
      } else {
        alert("✅ Password updated successfully");
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }

    } catch (err) {
      console.error(err);
      alert("❌ Error changing password");
    }
  };

  return (
    <div className='abcd'>
      <div className='changepwd'>Change Password</div>

      <label className='password1'>
        Old Password
        <input
          type="password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          placeholder='Enter Your Old Password'
        />
      </label>
      <br />

      <label className='password2'>
        New Password
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder='Enter Your New Password'
        />
      </label>
      <br />

      <label className='password3'>
        Confirm New Password
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder='Confirm Your New Password'
        />
      </label>
      <br />

      <button className='changepassword' onClick={handleChangePassword}>
        Change Password
      </button>

      {message && <p>{message}</p>}
    </div>
  );
}

export default Changepassword;
