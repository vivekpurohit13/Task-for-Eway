// src/components/AdForm.tsx
import React, { useState } from 'react';
import './AdForm.css';
import { set } from 'mongoose';
// import { response } from 'express';

const AdForm: React.FC = () => {
  const [adTitle, setAdTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [neighbourhood, setNeighbourhood] = useState('');
  const [activeTab, setActiveTab] = useState<'list' | 'currentLocation'>('list');
  const [name, setName] = useState('Existing User');
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [phoneNumber, setPhoneNumber] = useState('');

  // function resetFields() {
  //   setAdTitle(""),
  //   setDescription(""),
  //   setPrice(""),
  //   setState(""),
  //   setCity(""),
  //   setNeighbourhood(""),
  //   setName(""),
  //   setPhoneNumber(""),
  // };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newImages = Array.from(event.target.files);
      setImages((prevImages) => [...prevImages, ...newImages].slice(0, 12));
    }
  };

  const removeImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // Handle form submission logic here

    const formData = new FormData();
    formData.append('adTitle', adTitle);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('state', state);
    formData.append('city', city);
    formData.append('neighbourhood', neighbourhood);
    formData.append('name', name);
    formData.append('phoneNumber', phoneNumber);
    
    if (profilePic) {
      formData.append('profilePic', profilePic);
    }
  
    images.forEach((image, index) => {
      formData.append(`images`, image);
    });
  
    try {
      const response = await fetch('http://localhost:5000/api/ads', {
        method: 'POST',
        // headers: {
        //   'Content-Type': 'multipart/form-data',
        // },
        body: formData,
      });
  
      if (response.ok) {
        // Handle successful submission (e.g., redirect, display message, etc.)
        console.log('Ad posted successfully');
        alert('Ad posted successfully!');
        // Optionally, clear the form or redirect
      } else {
        // Handle errors
        console.error('Failed to post ad');
      }
      console.log(response);
    } catch (err) {
      console.error('Error:', err);
      alert('An error occurred. Please try again.');
    }

    // console.log(response);
    console.log({ adTitle, description, price, state, city, neighbourhood, phoneNumber, images, name, profilePic });
  };


  const handleProfilePic = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setProfilePic(event.target.files[0]);
    }
  };

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setState(e.target.value);
    setCity('');
    setNeighbourhood('');
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCity(e.target.value);
    setNeighbourhood('');
  };
  

  return (
    <form onSubmit={handleSubmit}>
        <div className="section">
            <h3>SELECTED CATEGORY</h3>
            <p>Electronics & Appliances / Computers & Laptops</p>
            <hr />
        </div>
        
        <div className="form-group">
            <h3>INCLUDE SOME DETAILS</h3>
            <label className="required">Ad title</label>
            <input
            type="text"
            value={adTitle}
            onChange={(e) => setAdTitle(e.target.value)}
            placeholder="A minimum length of 10 characters is required."
            required
            />
        </div>

      <div className="form-group">
        <label className="required">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Include condition, features, and reason for selling"
          required
        />
      </div>
      <hr />

      <div className="form-group price-section">
        <h3>SET A PRICE</h3>
        <label className="required">Price</label>
        <div className="price-input-container">
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter price"
            required
            min={0}
            className="price-input"
          />
        </div>
      </div>
      <hr />

      <div className="form-group upload-section">
        <h3>UPLOAD UP TO 12 PHOTOS</h3>
        <div className="upload-grid">
          {images.map((image, index) => (
            <div key={index}>
              <img src={URL.createObjectURL(image)} alt={`Uploaded ${index}`} />
              <span className="delete-icon" onClick={() => removeImage(index)}>
                &times;
              </span>
            </div>
          ))}
          {images.length < 12 && (
            <div>
              <span className="upload-placeholder">+</span>
              <input
                type="file"
                className="upload-input"
                accept="image/*"
                onChange={handleImageUpload}
                multiple
              />
            </div>
          )}
        </div>
      </div>
      <hr />

       {/* Confirm Your Location Section */}
       <div className="form-group location-section">
        <h3>CONFIRM YOUR LOCATION</h3>
        <div className="tabs">
          <div
            className={`tab ${activeTab === 'list' ? 'active' : ''}`}
            onClick={() => setActiveTab('list')}
          >
            List
          </div>
          <div
            className={`tab ${activeTab === 'currentLocation' ? 'active' : ''}`}
            onClick={() => setActiveTab('currentLocation')}
          >
            Current Location
          </div>
        </div>
        <div className="tab-content">
            {activeTab === 'list' && (
            <>
            <label className="location_label required">State</label>
                <select value={state} onChange={handleStateChange} required>
                <option value="">Select State</option>
                <option value="Delhi">Delhi</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Karnataka">Karnataka</option>
                {/* Add more options as needed */}
                </select>

                {state && (
                <label className="location_label required">City</label>
                )}
                {state && (
                <select value={city} onChange={handleCityChange} required>
                    <option value="">Select City</option>
                    {state === 'Delhi' && <option value="Delhi">Delhi</option>}
                    {state === 'Maharashtra' && <option value="Mumbai">Mumbai</option>}
                    {state === 'Karnataka' && <option value="Bangalore">Bangalore</option>}
                    {/* Add more options as needed */}
                </select>
                )}

            {city && (
                <label className="location_label required">Neighbourhood</label>
                )}
                {city && (
                <select
                    value={neighbourhood}
                    onChange={(e) => setNeighbourhood(e.target.value)}
                    required
                >
                    <option value="">Select Neighbourhood</option>
                    {city === 'Delhi' && (
                    <>
                        <option value="Africa Avenue">Africa Avenue</option>
                        <option value="Connaught Place">Connaught Place</option>
                    </>
                    )}
                    {city === 'Mumbai' && (
                    <>
                        <option value="Bandra">Bandra</option>
                        <option value="Andheri">Andheri</option>
                    </>
                    )}
                    {city === 'Bangalore' && (
                    <>
                        <option value="Indiranagar">Indiranagar</option>
                        <option value="Koramangala">Koramangala</option>
                    </>
                    )}
                </select>
                )}
            </>
            )}
            {activeTab === 'currentLocation' && (
            <div>
                {/* Add logic to fetch and display current location */}
                <p>Your current location will be displayed here.</p>
            </div>
            )}
        </div>
        </div>
        <hr />

    {/* Review Your Details Section */}
<div className="form-group review-section">
    <h3>REVIEW YOUR DETAILS</h3>
        <div className="profile-section">
            <div className="review-container">
            <input
                type="file"
                accept="image/*"
                onChange={handleProfilePic}
                style={{ display: 'none' }}
                id="profilePicUpload"
            />
            <label htmlFor="profilePicUpload" className="profile-pic-container">
            {profilePic ? (
                <img
                src={URL.createObjectURL(profilePic)}
                alt="Profile"
                className="profile-pic"
                />
            ) : (
                <img
                src="https://via.placeholder.com/40"
                alt="Placeholder"
                className="profile-pic"
                />
            )}
            <div className="rui-c"role="button">
                <svg width="25px" height="25px" viewBox="0 0 1024 1024" data-aut-id="icon" className="" fill-rule="evenodd">
                    <path className="rui-d" d="M861.099 667.008v78.080h77.568v77.653h-77.568v77.141h-77.568v-77.184h-77.611v-77.611h77.611v-78.080h77.568zM617.515 124.16l38.784 116.437h165.973l38.827 38.827v271.659l-38.827 38.357-38.741-38.4v-232.832h-183.125l-38.784-116.48h-176.853l-38.784 116.48h-183.083v426.923h426.667l38.784 38.357-38.784 39.253h-465.493l-38.741-38.869v-504.491l38.784-38.827h165.973l38.827-116.437h288.597zM473.216 318.208c106.837 0 193.92 86.955 193.92 194.048 0 106.923-87.040 194.091-193.92 194.091s-193.963-87.168-193.963-194.091c0-107.093 87.083-194.048 193.963-194.048zM473.216 395.861c-64.213 0-116.352 52.181-116.352 116.395 0 64.256 52.139 116.437 116.352 116.437 64.171 0 116.352-52.181 116.352-116.437 0-64.213-52.181-116.437-116.352-116.437z"></path>
                </svg>
            </div>
            </label>

            {/* <label className='ppname-field required'>Name</label> */}
            <div>
                <label className="ppname-field required">Name</label>
            </div>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="name-input"
                placeholder="Enter your name"
                required
            />
            </div>
            </div>

            <div className="phone-input">
            <h4>Let's verify your account</h4>
            <span>We will send you a confirmation code by sms on the next step.</span>
            <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="+91"
                required
            />
            </div>
    </div>
    <hr />

    <button onSubmit={handleSubmit} type="submit">Post now</button>
    </form>
  );
};

export default AdForm;
