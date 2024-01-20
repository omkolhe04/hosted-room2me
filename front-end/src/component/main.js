import React, { useState, useEffect } from "react";
import "../css/main.css";
import postpic from "../img/post-pic.png";
import { Link } from "react-router-dom";

const Main = () => {
  const token = localStorage.getItem("jwt");
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [item, setItem] = useState([]);
  const [filters, setFilters] = useState({
    roomType: "",
    roomFloor: "",
    numberOfRooms: "",
    numberOfKitchens: "",
    toiletAndBathroom: "",
    electricityBills: "",
    colony: "",
    area: "",
    city: "",
    expectedRent: "",
  });

  // Function to handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  // Function to apply filters to the data
  const applyFilters = (room) => {
    return (
      (filters.roomType == "" || room.roomType == filters.roomType) &&
      (filters.city == "" || room.city == filters.city) &&
      (filters.roomFloor === "" || room.roomFloor === filters.roomFloor) &&
      (filters.numberOfRooms === "" ||room.numberOfRooms === filters.numberOfRooms) &&
      (filters.numberOfKitchens === "" ||room.numberOfKitchens === filters.numberOfKitchens) &&
      (filters.toiletAndBathroom === "" ||room.toiletAndBathroom === filters.toiletAndBathroom) &&
      (filters.electricityBills === "" ||room.electricityBills === filters.electricityBills) &&
      (filters.colony==""||room.colony==filters.colony) &&
      (filters.area==""||room.area==filters.area) &&
      (filters.expectedRent===""||room.expectedRent===filters.expectedRent)
    );
  };

  // Function to get unique cities from the data
  const getUniqueValues = (filterKey) => {
    const uniqueValues = [...new Set(data.map((room) => room[filterKey]))];
    return uniqueValues;
  };

  const resetFilters = () => {
    setFilters({
      roomType: "",
    roomFloor: "",
    numberOfRooms: "",
    numberOfKitchens: "",
    toiletAndBathroom: "",
    electricityBills: "",
    colony: "",
    area: "",
    city: "",
    expectedRent: "",
    });
  };





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
  
  //FUNCTION FOR FETCHING ROOM BY API ----------------------
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch("/allrooms", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

    fetchRooms();
  }, [token]);

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

  const handleButtonClick = () => {
    if (item && item.postedBy && item.postedBy.email) {
      const phoneNumber = item.postedBy.email;
      const whatsappLink = `https://wa.me/${phoneNumber}`;
      window.open(whatsappLink, '_blank');
    } else {
      console.error("Phone number not available for this user.");
    }
  };

  return (
    <div>
      <div className="wrapper">
        <div className="main">
        {data.filter(applyFilters).length === 0 ? (
            // Display a message when no matching rooms are found
            <div className="no-matching-rooms-message">
              <h2>No rooms match the selected filters.</h2>
            </div>
          ) : (
            // Display matching rooms
            data
          .filter(applyFilters)
          .map((rooms) => {
            const handleButtonClick = () => {
              if (rooms && rooms.postedBy && rooms.postedBy.email) {
                const phoneNumber = rooms.postedBy.email;
                const whatsappLink = `https://wa.me/${phoneNumber}`;
                window.open(whatsappLink, '_blank');
              } else {
                console.error("Phone number not available for this user.");
              }
            };
            
            return (
              <div className="post">
                <div className="post-header">
                  <div className="post-pic">
                    <img src={postpic} alt="P" />
                  </div>
                  <div className="user-detail">
                    <h5>{rooms.postedBy.name}</h5>
                    <h5>- {rooms.postedBy._id}</h5>
                  </div>
                  <Link className="post-button" id="profile" to={`/profile/${rooms.postedBy._id}`}><span class="material-symbols-outlined">
account_circle
</span>Profile</Link>
                  <a className="post-button" id="whatsapp" onClick={handleButtonClick}><span class="fa fa-whatsapp whats-btn"></span><p></p>WhatsApp</a>
                  <a className="post-button" id="more" onClick={() => {toggleMore(rooms);}}><span class="material-symbols-outlined">
expand_circle_right
</span>More...</a>
                  {rooms.wishlist.includes(
                    JSON.parse(localStorage.getItem("user"))?.["_id"]
                  ) ? (
                    <span
                      onClick={() => {
                        unlikePost(rooms._id);
                      }}
                      className="material-symbols-outlined addtowish addtowish-red"
                    >
                      favorite
                    </span>
                  ) : (
                    <span
                      onClick={() => {
                        likePost(rooms._id);
                      }}
                      className="material-symbols-outlined addtowish"
                    >
                      favorite
                    </span>
                  )}
                </div>
                <div className="image-content">
                  <div className="post-image">
                    {rooms.images.length > 0 && (
                      <img src={rooms.images[0]} alt="" />
                    )}
                  </div>
                  <div className="post-content">
                    <h5 style={{ fontSize: "18px", margin: "7px 0px" }}>
                      - {rooms.roomType} on {rooms.roomFloor}
                    </h5>
                    <p>
                      - Details: {rooms.numberOfRooms}, {rooms.numberOfKitchens}
                      , {rooms.toiletAndBathroom}
                    </p>
                    <p>- Electricity Bill will {rooms.electricityBills}</p>
                    <p>
                      - Adress: {rooms.colony}, {rooms.area}, {rooms.landmark},{" "}
                      {rooms.city}
                    </p>
                    <p
                      style={{
                        color: "#3dd42c",
                        textShadow: "1px 1px darkred",
                      }}
                    >
                      - Expected Rent: {rooms.expectedRent}/-
                    </p>
                  </div>
                </div>
              </div>
            );
          }))}
        </div>
        <div>
          <div className="filter">
          <h2 style={{fontFamily: 'Philosopher'}}>-- Apply Room Filter --</h2>
            <label><p>Room Type:</p><select name="roomType" onChange={handleFilterChange} value={filters.roomType}>
                <option value="">All</option>
                {getUniqueValues("roomType").map((value) => (
                  <option key={value} value={value}>{value}</option>))}</select>
            </label>
            <label><p>Room Floor:</p><select name="roomFloor" onChange={handleFilterChange} value={filters.roomFloor}>
                <option value="">All</option>
                {getUniqueValues("roomFloor").map((value) => (
                  <option key={value} value={value}>{value}</option>))}</select>
            </label>
            <label><p>No. of Rooms:</p><select name="numberOfRooms" onChange={handleFilterChange} value={filters.numberOfRooms}>
                <option value="">All</option>
                {getUniqueValues("numberOfRooms").map((value) => (
                  <option key={value} value={value}>{value}</option>))}</select>
            </label>
            <label><p>No. of Kitchen:</p><select name="numberOfKitchens" onChange={handleFilterChange} value={filters.numberOfKitchens}>
                <option value="">All</option>
                {getUniqueValues("numberOfKitchens").map((value) => (
                  <option key={value} value={value}>{value}</option>))}</select>
            </label>
            <label><p>Toilet Bathroom:</p><select name="toiletAndBathroom" onChange={handleFilterChange} value={filters.toiletAndBathroom}>
                <option value="">All</option>
                {getUniqueValues("toiletAndBathroom").map((value) => (
                  <option key={value} value={value}>{value}</option>))}</select>
            </label>
            <label><p>Electricity Bill:</p><select name="electricityBills" onChange={handleFilterChange} value={filters.electricityBills}>
                <option value="">All</option>
                {getUniqueValues("electricityBills").map((value) => (
                  <option key={value} value={value}>{value}</option>))}</select>
            </label>
            <label><p>Colony:</p><select name="colony" onChange={handleFilterChange} value={filters.colony}>
                <option value="">All</option>
                {getUniqueValues("colony").map((value) => (
                  <option key={value} value={value}>{value}</option>))}</select>
            </label>
            <label><p>Area:</p><select name="area" onChange={handleFilterChange} value={filters.area}>
                <option value="">All</option>
                {getUniqueValues("area").map((value) => (
                  <option key={value} value={value}>{value}</option>))}</select>
            </label>
            <label><p>City:</p><select name="city" onChange={handleFilterChange} value={filters.city}>
                <option value="">All</option>
                {getUniqueValues("city").map((value) => (
                  <option key={value} value={value}>{value}</option>))}</select>
            </label>
            <label><p>Rent Upto:</p><select name="expectedRent" onChange={handleFilterChange} value={filters.expectedRent}>
                <option value="">All</option>
                {getUniqueValues("expectedRent").map((value) => (
                  <option key={value} value={value}>{value}</option>))}</select>
            </label>
            <button className="reset-btn" onClick={resetFilters}><span class="material-symbols-outlined">
restart_alt
</span>Reset</button>
          </div>
        </div>
      </div>
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
                    <h4 style={{textShadow: "0px 0px 5px #1f60ff"}}>phone: {item.postedBy.email}</h4>
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

export default Main;
