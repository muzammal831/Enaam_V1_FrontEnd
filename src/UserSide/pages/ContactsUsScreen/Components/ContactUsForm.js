import React, { useState } from 'react';

const ContactUsForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name: name,
      email: email,
      msgBody: message
    };

    try {
      const response = await fetch('https://enaam.pk/api/email/sendMail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        setSubmitted(true);
        setName('');
        setEmail('');
        setMessage('');
      } else {
        // Handle the error appropriately
        console.error('Error sending email.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container " style={{ marginBottom: '30px'}}>
      <div className="row">
        <div className="col-lg-8 offset-lg-2">
          <div className="card glow p-4">
            <h2 className="text-center mb-4">Contact Us</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group " style={{textAlign:"left"}}>
                <label htmlFor="name">Your Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="cname"
                  name="cname"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group" style={{textAlign:"left"}}>
                <label htmlFor="email">Your Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="cemail"
                  name="cemail"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group" style={{textAlign:"left"}}>
                <label htmlFor="message">Message</label>
                <textarea
                  className="form-control"
                  id="cmessage"
                  name="cmessage"
                  rows="5"
                  placeholder="Enter your message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            {submitted && <p className="mt-3 text-success">Your message has been sent!</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsForm;
