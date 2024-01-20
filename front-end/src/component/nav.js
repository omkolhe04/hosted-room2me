// --------------------------- IMPORTING--------------------------------------------------------------------
import React, { useEffect, useState } from 'react';
import {Link} from "react-router-dom"
import '../css/nav.css';
import Img1 from '../img/img1.jpg';
import img2 from '../img/img2.jpg';
import img3 from '../img/img3.jpg';
import img4 from '../img/img4.jpg';
import img5 from '../img/img5.jpg';
import img6 from '../img/img6.jpg';

function Nav() {
  
  // --------------------------- IMAGE TRANSITION--------------------------------------------------------------------
  const [selectedImage, setSelectedImage] = useState(0);
  const [allImages] = useState([Img1, img2, img3, img4, img5, img6]);
  // const [allImages, setAllImages] = useState([Img1, img2, img3, img4, img5, img6]);
  
  useEffect(() => {
    const intervalId = setInterval(() => {
      setSelectedImage((prevSelectedImage) => (prevSelectedImage < 5 ? prevSelectedImage + 1 : 0));
    }, 3000);

    return () => clearInterval(intervalId); // Cleanup the interval on component unmount
  }, []); // empty dependency array to run the effect only once on mount

  return (
    <div>
      <img className="bg-image" src={allImages[selectedImage]} alt="not found" />
      
      <nav className="navbar">
        <ul className="nav-list">
          <li>
            <Link className='nav-link' to={'/'}>HOME</Link>
          </li>
          <li>
            <Link className="nav-link" to={'/addroom'}>ADD-ROOM</Link>
          </li>
          <li> 
            <Link className="nav-link" to={'/wishlist'}>WISHLIST</Link>
          </li>
          <li >
            <button className="dark-mode"><p>DARK-MODE</p></button>
          </li>
        </ul>
      </nav>
      <div className="img-button">
          <button
            onClick={() => {
              if (selectedImage > 0) {
                setSelectedImage(selectedImage - 1);
              }
            }}
          >
            PREV
          </button>
          <button 
            onClick={() => {
              if (selectedImage < allImages.length - 1) {
                setSelectedImage(selectedImage + 1);
              }
            }}
          >
            NEXT
          </button>
      </div>
    </div>
  );
}


export default Nav;
