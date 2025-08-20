import React, { useState, useEffect } from 'react';
import './Account.css';
import Profilepic from '../assets/profilepic.jpg';
import axios from 'axios';
import { BACKEND_BASE } from '../config';

function Account() {
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



    const handleChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        try {
            const response = await axios.put(`${BACKEND_BASE}users/${userId}`, inputs, {
                headers: { "Content-Type": "application/json" }
            });

            const updatedUser = response.data.users; 


            setInputs({
                name: updatedUser.name || "",
                email: updatedUser.email || "",
                nic: updatedUser.nic || "",
                country: updatedUser.country || "",
                gender: updatedUser.gender || "",
                language: updatedUser.language || ""
            });

            alert("User details updated!");
        } catch (err) {
            console.error(err);
            alert("User details updated!");
        }
    };

    return (
        <div className="accountdetails">
            Account Details
            <br />
            <div className="keepalign">
                {/* <img src={Profilepic} alt="Profile" className="profilepic" /> */}
                <p className="david">
                    {inputs.name}
                    <br />
                    <span className="davidemail">{inputs.email}</span>
                </p>
            </div>

            <div>
                <label className="fullnamelabel">
                    Full Name
                    <input
                        name="name"
                        type="text"
                        value={inputs.name}
                        onChange={handleChange}
                    />
                </label>
                <br />

                <label className="niclabel">
                    NIC
                    <input
                        name="nic"
                        type="text"
                        value={inputs.nic}
                        onChange={handleChange}
                    />
                </label>
                <br />

                <label className="country1">
                    COUNTRY
                    <select
                        name="country"
                        value={inputs.country}
                        onChange={handleChange}
                        className="countrybox1"
                        required
                    >
                        <option value="" disabled>Select Your Country</option>
                        <option value="Belgium">Belgium</option>
                        <option value="France">France</option>
                        <option value="Sweden">Sweden</option>
                    </select>
                </label>
                <br />

                <label className="country1">
                    GENDER
                    <select
                        name="gender"
                        value={inputs.gender}
                        onChange={handleChange}
                        className="gender1"
                        required
                    >
                        <option value="" disabled>Select Your Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="N/A">N/A</option>
                    </select>
                </label>
                <br />

                <label className="country1">
                    LANGUAGE
                    <select
                        name="language"
                        value={inputs.language}
                        onChange={handleChange}
                        className="language1"
                        required
                    >
                        <option value="" disabled>Select Your Language</option>
                        <option value="English">English</option>
                        <option value="Spanish">Spanish</option>
                        <option value="French">French</option>
                        <option value="German">German</option>
                        <option value="Dutch">Dutch</option>
                        <option value="Japanese">Japanese</option>
                    </select>
                </label>
                <br /><br />

                <button className="savechangesbtn" onClick={handleSave}>
                    Save Changes
                </button>
            </div>
        </div>
    );
}

export default Account;
