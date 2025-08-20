import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

import { useLocation } from "react-router-dom";
import axios from "axios";
import './Register.css'
import { BACKEND_BASE } from '../config';

function Register() {
    const location = useLocation();
    const userId = location.state?.userId;

    const navigate = useNavigate();
    const [image, setImage] = useState(null);
    // const [fullName, setFullName] = useState('');
    // const [nic, setNic] = useState('');

    
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file));
            setInputs(prev => ({ ...prev, profilepicture: file }));
        }
    };



    const [inputs, setInputs] = useState({
        name: "",
        nic: "",
        country: "",
        gender: "",
        language: "",

    });


    const isFormValid = inputs.name.trim() !== '' && inputs.nic.trim() !== '';

    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(inputs);
        sendRequest().then(() => navigate('/login'));
    }
    const sendRequest = async () => {
        try {
            await axios.put(`${BACKEND_BASE}users/${userId}`, inputs, {
                headers: { "Content-Type": "application/json" }
            });
        } catch (err) {
            console.log(err);
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
                <div className='registerdiv'>
                    <div className='registertext'>USER DETAILS</div>
                    <form className='aligncenter' onSubmit={handleSubmit}>
                        <label className='fullname'>FULL NAME
                            <input type="text" name="name" placeholder='Enter Your Name' value={inputs.name}
                                onChange={handleChange} />
                        </label>
                        <label className='NIC'>NIC
                            <input type="text" name="nic" placeholder='Enter Your NIC' value={inputs.nic}
                                onChange={handleChange} />
                        </label>
                        <label className='country'>
                            COUNTRY
                            <select name='country' required className='countrybox' value={inputs.country} onChange={handleChange}>
                                <option value="" disabled>
                                    Select Your Country
                                </option>
                                <option value='Belgium'>Belgium</option>
                                <option value='France'>France</option>
                                <option value='Sweden'>Sweden</option>
                            </select>
                        </label>
                        <br />
                        <label className='country'>
                            GENDER
                            <select name='gender' required className='gender' value={inputs.gender} onChange={handleChange}>
                                <option value="" disabled>
                                    Select Your Gender
                                </option>
                                <option value='Male'>Male</option>
                                <option value='Female'>Female</option>
                                <option value='N/A'>N/A</option>
                            </select>
                        </label>
                        <br />
                        <label className='country'>
                            LANGUAGE
                            <select name='language' required className='language' value={inputs.language} onChange={handleChange}>
                                <option value="" disabled>
                                    Select Your language
                                </option>
                                <option value='English'>English</option>
                                <option value='Spanish'>Spanish</option>
                                <option value='French'>French</option>
                                <option value='German'>German</option>
                                <option value='Dutch'>Dutch</option>
                                <option value='Japanese'>Japanese</option>
                            </select>
                        </label>
                        <br />

                        {/* Image Upload */}
                        {/* <label className='image-upload'>
                            PROFILE PICTURE
                            <label className="custom-file-upload">
                                <input type="file" accept="image/*" />
                                Choose File
                            </label>

                        </label> */}

                        {/* Preview */}
                        {image && (
                            <div className="image-preview">
                                <img src={image} alt="Preview" />
                            </div>
                        )}
                        <button className='nextbtn' type="submit"
                            disabled={!isFormValid}>NEXT</button>



                    </form>
                </div>
            </div>

        </div>
    )
}

export default Register