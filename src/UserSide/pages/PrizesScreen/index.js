import React from 'react'
import Header from '../../Components/HeaderComponent';
import ProductsListComponent from '../HomeScreen/Components/ProductsListComponent';
import Footer from '../../Components/FooterCompnent';
 
const Prizes = () => {
  return (
    <div className="App">
        <Header/>
        <div style={{height:"15vh"}}/>
        <ProductsListComponent/>
        <Footer/>
    </div>
  )
}

export default Prizes;