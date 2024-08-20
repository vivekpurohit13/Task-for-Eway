import React from 'react';
// import { Route, Routes } from "react-router-dom";
// import SellProduct from './SellProduct';
import Navbar from './Navbar';
import AdForm from './AdForm';
import Footer from './Footer';



function App() {
  return (
      <div>
        <Navbar/>
        <AdForm />
        <Footer />

          {/* <Routes>
          <Route path="/" element={<SellProduct />} />
          <Route path="/SellProduct" element={<SellProduct />} />
          </Routes> */}
      </div>
  );
}

export default App;
