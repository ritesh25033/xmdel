import React, { useState } from 'react';
import './App.css'; // Assuming styles are placed in XModal.css

const XModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    dob: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleOutsideClick = (e) => {
    if (e.target.className === 'modal') {
      closeModal();
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, email, phone, dob } = formData;

    if (!username) {
      setErrorMessage('Please fill out the Username field.');
      return;
    }
    if (!email.includes('@')) {
      setErrorMessage('Invalid email. Please check your email address.');
      return;
    }
    if (phone.length !== 10 || isNaN(phone)) {
      setErrorMessage(
        'Invalid phone number. Please enter a 10-digit phone number.'
      );
      return;
    }
    const today = new Date();
    const birthDate = new Date(dob);
    if (birthDate > today) {
      setErrorMessage(
        'Invalid Date of Birth. You cannot select a future date.'
      );
      return;
    }

    setErrorMessage('');
    closeModal(); // Close modal on successful submission
  };

  return (
    <div>
    <h1>User Details modal</h1>
      <button onClick={openModal}>Open Form</button>

      {isOpen && (
        
        <div className='modal' onClick={handleOutsideClick}>
          <div className='modal-content'>
            <form onSubmit={handleSubmit}>
            <h1>Fill Details</h1>
              <label>
                Username:
                <input
                  type='text'
                  id='username'
                  placeholder='Enter your username'
                  value={formData.username}
                  onChange={handleChange}
                />
              </label>
              <br />
              <label>
                Email Address:
                <input
                  type='email'
                  id='email'
                  placeholder='Enter your email'
                  value={formData.email}
                  onChange={handleChange}
                />
              </label>
              <br />
              <label>
                Phone Number:
                <input
                  type='text'
                  id='phone'
                  placeholder='Enter your phone number'
                  value={formData.phone}
                  onChange={handleChange}
                />
              </label>
              <br />
              <label>
                Date of Birth:
                <input
                  type='date'
                  id='dob'
                  value={formData.dob}
                  onChange={handleChange}
                />
              </label>
              <br />
              <button type='submit' className='submit-button'>
                Submit
              </button>
            </form>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default XModal;
