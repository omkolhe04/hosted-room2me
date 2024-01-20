import React from 'react';
import Nav from './nav.js';
import Header from './header.js';
import Main from './main.js';
import Footer from './footer.js';

function Home() {
    return (
        <div className="App">
          <Header/>
          <Nav/>
          <Main/>
          <Footer/>
        </div>
    );
  }
  
  export default Home;
  