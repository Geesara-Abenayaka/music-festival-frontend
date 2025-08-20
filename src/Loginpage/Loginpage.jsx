import React, { useState } from 'react';
import './Loginpage.css';
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { BACKEND_BASE } from '../config';

function Loginpage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${BACKEND_BASE}users/login`, {
                email,
                password
            });

            if (res.data.success) {
                alert("Login Successful");

              
                localStorage.setItem("isLoggedIn", "true");
                localStorage.setItem("token", res.data.user._id);
                localStorage.setItem("user", JSON.stringify(res.data.user));

                
                if (res.data.user.isAdmin) {
                    navigate("/admindashboard");
                } else {
                    navigate("/userdashboard");
                }
            } else {
                alert("Invalid Credentials");
            }
        } catch (err) {
            console.error(err);
            alert("Something went wrong with the login");
        }
    };

    return (
        <div className="login-container">
            {/* <video
                autoPlay
                muted
                loop
                playsInline
                className="background-video"
            >
                <source src={backgroundvideo} type="video/mp4" />
                Your browser does not support the video tag.
            </video> */}

            <div className='wanttogettoleft'>
                <div className='logindiv'>
                    <div className='makeitclear'>
                        <div className='logintext'>Login</div>
                        <form className='aligncenter' onSubmit={handleLogin}>
                            <label className='email'>
                                EMAIL
                                <input
                                    type="email"
                                    placeholder='Enter Your Email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    pattern=".+@.+\.com"
                                    title="Email must contain @ and end with .com"
                                />
                            </label>

                            <label className='password'>
                                PASSWORD
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder='Enter Your Password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    minLength={8}
                                    title="Password must be at least 8 characters long"
                                />
                            </label>

                            <div className="ss">
                                <label style={{ fontSize: "14px", color: "white", marginLeft: "415px" }}>
                                    <input
                                        type="checkbox"
                                        checked={showPassword}
                                        onChange={(e) => setShowPassword(e.target.checked)}
                                    /> Show
                                </label>
                            </div>

                            <p className='accountcheck'>Don't have an account? </p>
                            <p
                                className='clicktosignup'
                                onClick={() => navigate("/signup")}
                                style={{ cursor: "pointer" }}
                            >
                                Click here to signup
                            </p>

                            <button className='next-btn' type="submit">NEXT</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Loginpage;
