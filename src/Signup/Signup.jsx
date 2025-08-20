import React, { useState, useEffect } from 'react';
import './Signup.css';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    name: "",
    nic: "",
    email: "",
    country: "",
    password: "",
    gender: "",
    language: "",
    profilepicture: ""
  });

  const [allUsers, setAllUsers] = useState([]);


  const ALLOWED = {
    gender: ["Male", "Female", "N/A"],
    country: ["Belgium", "France", "Sweden"],
    language: ["English", "Spanish", "French", "German", "Dutch", "Japanese"],
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/users");
        setAllUsers(res.data.users || []);
      } catch (err) {
        console.error("Failed to fetch users:", err);
      }
    };
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  
  const buildPayload = () => {
    const payload = {
      email: inputs.email.trim().toLowerCase(),
      password: inputs.password,
    };

    if (inputs.name.trim()) payload.name = inputs.name.trim();
    if (inputs.nic.trim()) payload.nic = inputs.nic.trim();

   
    if (ALLOWED.gender.includes(inputs.gender)) payload.gender = inputs.gender;
    if (ALLOWED.country.includes(inputs.country)) payload.country = inputs.country;
    if (ALLOWED.language.includes(inputs.language)) payload.language = inputs.language;

   
    payload.profilepicture = inputs.profilepicture.trim()
      ? inputs.profilepicture.trim()
      : "https://example.com/default-avatar.png";

    return payload;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

  
    const emailToCheck = inputs.email.trim().toLowerCase();
    const emailExists = allUsers.some(u => (u.email || "").toLowerCase() === emailToCheck);
    if (emailExists) {
      alert("⚠️ This email is already registered!");
      return;
    }

  
    if (!emailToCheck || !inputs.password) {
      alert("Please enter email and password.");
      return;
    }

    const payload = buildPayload();

    try {
      setSubmitting(true);
      const res = await axios.post("http://localhost:5000/users", payload);
      navigate('/register', { state: { userId: res.data.user._id } });
    } catch (err) {
      
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Signup failed!";
      alert(msg);
      console.error("Signup failed:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="login-container">
      <div className='wanttogettoleft'>
        <div className='logindiv'>
          <div className='logintext'>SignUp</div>
          <form className='aligncenter' onSubmit={handleSubmit}>
            <label className='email'>
              EMAIL
              <input
                type="email"
                name="email"
                value={inputs.email}
                placeholder='Enter Your Email'
                onChange={handleChange}
                required
                pattern=".+@.+\.com"
                title="Email must contain @ and end with .com"
              />
            </label>

            <label className='password'>
              PASSWORD
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={inputs.password}
                placeholder='Enter Your Password'
                onChange={handleChange}
                required
                minLength={8}
                title="Password must be at least 8 characters long"
              />
            </label>

            

            <div className="ss">
              <label style={{ fontSize: "14px", color: "white", marginLeft:"415px" }}>
                <input
                  type="checkbox"
                  checked={showPassword}
                  onChange={(e) => setShowPassword(e.target.checked)}
                /> Show
              </label>
            </div>

            <p className='accountcheck'>Don't have an account yet?</p>
            <p
              className='clicktosignup'
              onClick={() => navigate("/login")}
              style={{ cursor: "pointer" }}
            >
              Click here to Login
            </p>

            <button
              className='next-btn'
              type="submit"
              style={{ cursor: submitting ? "not-allowed" : "pointer", opacity: submitting ? 0.7 : 1 }}
              disabled={submitting}
            >
              {submitting ? "Submitting..." : "NEXT"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
