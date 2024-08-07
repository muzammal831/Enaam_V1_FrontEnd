

import React, { useState } from 'react';
import axios from 'axios';
import Header from '../../../Components/HeaderComponent'; // Adjust the path as needed
import Footer from '../../../Components/FooterCompnent'; // Adjust the path as needed
import './Styles.css'; 
// Ensure this CSS file is imported

const Contact = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    message: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://3.138.38.248/Enaam_Backend_V1/public/api/contacts', formData);
      setMessage(response.data.message);
      setFormData({ username: '', email: '', message: '' });
    } catch (error) {
      console.error('Error submitting contact form:', error);
    }
  };

  return (
    <div >
      <Header />
      <div className="container mt-5" style={{ marginBottom: '30px' }}>
        <div className="row mt-5">
          <div className="col-lg-8 mt-5 offset-lg-2">
            <div className="card glow p-4">
              <h2 className="text-center mb-4">Contact Us</h2>
              {message && <p className="mt-3 text-success text-center">{message}</p>}
              <form onSubmit={handleSubmit}>
                <div className="form-group" style={{ textAlign: "left" }}>
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    name="username"
                    placeholder="Enter your username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group" style={{ textAlign: "left" }}>
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group" style={{ textAlign: "left" }}>
                  <label htmlFor="message">Message</label>
                  <textarea
                    className="form-control"
                    id="message"
                    name="message"
                    rows="5"
                    placeholder="Enter your message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
