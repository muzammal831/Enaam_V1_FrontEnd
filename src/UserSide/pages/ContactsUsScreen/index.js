import React from 'react'
import ContactUsForm from './Components/ContactUsForm';
import Header from '../../Components/HeaderComponent';
import Footer from '../../Components/FooterCompnent';

const ContactUs = () => {
  return (
    <div className='App'>
      <Header/>
      <div style={{height:"15vh"}}/>
      <ContactUsForm/>
      <Footer/>
    </div>
  )
}
export default ContactUs;