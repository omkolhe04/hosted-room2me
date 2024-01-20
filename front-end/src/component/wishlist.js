import React, { useState, useEffect } from "react";
import postpic from "../img/post-pic.png";
import Header from "./header.js";
import Footer from "./footer.js";
import Navbar from "./navbar.js";
import { Link } from "react-router-dom";

// import './wishlist.css'; // Add your CSS file

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [item, setItem] = useState([]);
  const [show, setShow] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [data, setData] = useState([]);
  const [scrollPosition, setScrollPosition] = useState(0);
  const token = localStorage.getItem("jwt");

  //FUNCTION FOR  IMAGE SLIDER IN MORE-SECTION--------------------
  const ImageSlider = ({ images }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
  }
  
//FUNCTION FOR NEXT-IMG BUTTON IN MORE-SECTION--------------------
    const nextImage = () => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % item.images.length);
    };
  
//FUNCTION FOR PREV-IMG BUTTON INN MORE-SECTION----------------------
    const prevImage = () => {
      setCurrentImageIndex((prevIndex) => (prevIndex - 1 + item.images.length) % item.images.length);
    };
    //FUNCTION FOR ADJUSTING THE POSITION OF MORE-SECTION ON SCREEN---------------------
  useEffect(() => {
    let animationFrameId;

    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
    //FUNCTION FOR SHOW AND HIDE THE MORE-SECTION---------------------
    const toggleMore = (rooms) => {
      if (show) {
        setShow(false);
      } else {
        setShow(true);
        setItem(rooms);
        console.log(item)
      }
    };
  
    //FUNCTION FOR STOP SCROLLING WHEN SHOW IS TRUE---------------------
    useEffect(() => {
      if (show) {
        document.body.classList.add("no-scroll");
      } else {
        document.body.classList.remove("no-scroll");
      }
    }, [show]);

     //FUNCTION FOR FETCH WISH API ---------------------
  const likePost = (id) => {
    const responce = fetch("/wish", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        roomId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((rooms) => {
          if (rooms._id == result._id) {
            return result;
          } else {
            return rooms;
          }
        });
        setData(newData);
        console.log(result);
      });
  };

  //FUNCTION FOR FETCHING UNWISH API---------------------
  const unlikePost = (id) => {
    fetch("/unwish", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        roomId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((rooms) => {
          if (rooms._id == result._id) {
            return result;
          } else {
            return rooms;
          }
        });
        setData(newData);
        console.log(result);
      });
  };
  const handleButtonClick = () => {
    if (item && item.postedBy && item.postedBy.email) {
      const phoneNumber = item.postedBy.email;
      const whatsappLink = `https://wa.me/${phoneNumber}`;
      window.open(whatsappLink, '_blank');
    } else {
      console.error("Phone number not available for this user.");
    }
  };

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await fetch("/wishlist", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const result = await response.json();
        setWishlist(result);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };

    fetchWishlist();
  }, [token]);
  return (
    <div>
      <Header/>
      <Navbar/>
      <div className="wishlist-wrapper" style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
        <div className="wishlist">
        <h1 style={{textAlign:"center"}}>-- Your Wishlist --</h1>
        {wishlist.length === 0 ? (
            <div className="no-rooms-message">
              <p>Your wishlist is empty.</p>
            </div>
          ) : (
            wishlist.map((room) => {
            return(
            <div className="post">
              <div className="post-header">
                  <div className="post-pic">
                    <img src={postpic} alt="P" />
                  </div>
                  <div className="user-detail">
                    <h5>{room.postedBy.name}</h5>
                    <h5>- {room.postedBy._id}</h5>
                  </div>
                  <Link className="post-button" id="profile" to={`/profile/${room.postedBy._id}`}><span class="material-symbols-outlined">
account_circle
</span>Profile</Link>
<a className="post-button" id="whatsapp" onClick={handleButtonClick}><span class="fa fa-whatsapp whats-btn"></span><p></p>WhatsApp</a>
                  <a className="post-button" id="more" onClick={() => {toggleMore(room);}}><span class="material-symbols-outlined">
expand_circle_right
</span>More...</a>
                  {room.wishlist.includes(
                    JSON.parse(localStorage.getItem("user"))?.["_id"]
                  ) ? (
                    <span
                      onClick={() => {
                        unlikePost(room._id);
                      }}
                      className="material-symbols-outlined addtowish addtowish-red"
                    >
                      favorite
                    </span>
                  ) : (
                    <span
                      onClick={() => {
                        likePost(room._id);
                      }}
                      className="material-symbols-outlined addtowish"
                    >
                      favorite
                    </span>
                  )}
                </div>
              <div className="image-content">
                <div className="post-image">
                  {room.images.length > 0 && (
                    <img src={room.images[0]} alt="" />
                  )}
                </div>
                <div className="post-content">
                  <h5 style={{ fontSize: "18px", margin: "7px 0px" }}>
                    - {room.roomType} on {room.roomFloor}
                  </h5>
                  <p>
                    - Details: {room.numberOfRooms}, {room.numberOfKitchens},{" "}
                    {room.toiletAndBathroom}
                  </p>
                  <p>- Electricity Bill will {room.electricityBills}</p>
                  <p>
                    - Adress: {room.colony}, {room.area}, {room.landmark},{" "}
                    {room.city}
                  </p>
                  <p
                    style={{ color: "#3dd42c", textShadow: "1px 1px darkred" }}
                  >
                    - Expected Rent: {room.expectedRent}/-
                  </p>
                </div>
              </div>
            </div>
          )}))}
        </div>
      </div>
      <Footer/>
      {show && (
        <div className="more-section"    style={{ top: `${scrollPosition}px` }}>
          <div className="close-more" >
            <span
              style={{ fontSize: "50px" }}
              class="material-symbols-outlined"
              onClick={()=>{toggleMore()}}
            >
              close
            </span>
          </div>
          <div className="container">
            <div className="img-user">
              <div className="all-image">
              <div className="image-slider">
                <img src={item.images[currentImageIndex]} alt={`Slide ${currentImageIndex + 1}`} />
                <div className="slider-nav">
                  <button className="slider-btn" onClick={prevImage}>&#10094;</button>
                  <button className="slider-btn" onClick={nextImage}>&#10095;</button>
                </div>
              </div>
              </div>
              <div className="user-info">
                <div className="user">
                  <img src={postpic} alt="" />
                    <h2 style={{textShadow: "0px 0px 5px #1f60ff"}}>{item.postedBy.name}</h2>
                    <h4 style={{textShadow: "0px 0px 5px #1f60ff"}}>id: {item.postedBy._id}</h4>
                    <div className="more-btn" >
                       <a className="post-button" id="message" onClick={handleButtonClick} >Message</a>
                        <Link className="post-button" id="location" to={`/profile/${item.postedBy._id}`}>Profile</Link>
                    </div>
                    <h2 className="more-rent">RENT: {item.expectedRent}/-</h2>
                </div>
                </div>
            </div>
            <div style={{display:"flex", flexDirection:"row"}}>
            <div className="room-info">
              
              <div style={{display:"flex",flexDirection:"row"}}>
                <p>- Room Type : {item.roomType}</p>
                <p>- Room Floor : {item.roomFloor}</p>
              </div>
                <p>- Electicity Bill will {item.electricityBills}</p>
                <p>- Details : {item.numberOfRooms}, {item.numberOfKitchens}, {item.toiletAndBathroom}</p>
                <p>- Address : {item.colony}, {item.area}, {item.landmark}, {item.city}</p>
              </div>
              <div className="fav-btn">
                <p onClick={() => { likePost(item._id);}}>ADD TO WISHLIST</p>
                <p onClick={() => { unlikePost(item._id);}}>REMOVE FROM WISHLIST</p>
              </div>
              </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
