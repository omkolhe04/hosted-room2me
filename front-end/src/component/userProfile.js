import React, {useState,useEffect} from "react";
import Header from "./header.js";
import Footer from "./footer.js";
import Navbar from "./navbar.js";
import postpic from "../img/post-pic.png"
import '../css/myacc.css'
import {Link, useNavigate, useParams } from "react-router-dom";

const UserProfile = () => {
    const {userid} = useParams();
    console.log(userid)
    const [data, setData] = useState([]);
    const [user,setUser] = useState("");
    const [myroom, setMyroom] = useState([]);
    const [show, setShow] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [item, setItem] = useState([]);
    const token = localStorage.getItem('jwt');
    const navigate = useNavigate();

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
      // Add a class to the body to prevent scrolling
      document.body.classList.add("no-scroll");
    } else {
      // Remove the class to allow scrolling
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

    useEffect(() => {
                fetch(`/user/${userid}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                .then(res=>res.json())
                .then((result)=>{
                    console.log(result)
                    setUser(result.user)
                    setMyroom(result.myroom)
                })
    },[]);

    const removeRoom=(roomId)=>{
      if(window.confirm("Do you want to delete the Room ?")){

        fetch(`/deleteRoom/${roomId}`, {
          method:"delete",
          headers: {
              Authorization: `Bearer ${token}`
            },
       })
       .then((res)=>res.json())
       .then((result)=>{
        console.log(result)
        navigate("/")
       })
      }
    }
    const handleButtonClick = () => {
      if (user  && user.email) {
        const phoneNumber = user.email;
        const whatsappLink = `https://wa.me/${phoneNumber}`;
        window.open(whatsappLink, '_blank');
      } else {
        console.error("Phone number not available for this user.");
      }
    };
 
  return (
    <div>
      <Header />
      <Navbar/>
      <div className="profile">
        <div className="profile-frame">
          <div className="profile-pic">
            <img src={postpic} alt="" />
          </div>
          <div className="profile-data">
            <h1>{user.name}</h1>
            <div className="profile-info">
              <p>Phone: {user.email}</p>
              <p>{myroom.length} Added Content</p>
            </div>
          </div>
        </div>
          <hr className="hr-tag" />
          <h2 style={{textAlign:"center"}}>-- YOUR UPLOADED ROOMS --</h2>
        <div className="gallery">
            {myroom.map((myroom)=>{
                return(
                    <div className="post" >
                    <div className="post-header">
                        <div className="post-pic">
                            <img src={postpic} alt="P" />
                        </div>
                        <div className="user-detail" style={{width:"606px"}}>
                            <h5>{user.name}</h5>
                            <h5>- {myroom.city}</h5>
                        </div>
                        <Link className="post-button" id="profile" to={`/profile/${myroom.postedBy._id}`}><span class="material-symbols-outlined">
account_circle
</span>Profile</Link>
<a className="post-button" id="whatsapp" onClick={handleButtonClick}><span class="fa fa-whatsapp whats-btn"></span><p></p>WhatsApp</a>
                  <a className="post-button" id="more" onClick={() => {toggleMore(myroom);}}><span class="material-symbols-outlined">
expand_circle_right
</span>More...</a>
                  {myroom.wishlist.includes(
                    JSON.parse(localStorage.getItem("user"))?.["_id"]
                  ) ? (
                    <span
                      onClick={() => {
                        unlikePost(myroom._id);
                      }}
                      className="material-symbols-outlined addtowish addtowish-red"
                    >
                      favorite
                    </span>
                  ) : (
                    <span
                      onClick={() => {
                        likePost(myroom._id);
                      }}
                      className="material-symbols-outlined addtowish"
                    >
                      favorite
                    </span>
                  )}                        
                    </div>
                    <div className='image-content'>
                        <div className="post-image">
                        {myroom.images.length > 0 && (
                           <img src={myroom.images[0]} alt='' />
                         )}
                        </div>
                        <div className="post-content">
                            <h5 style={{fontSize:"18px", margin:"7px 0px"}}>- {myroom.roomType} on {myroom.roomFloor}</h5>
                            <p>- Details: {myroom.numberOfRooms}, {myroom.numberOfKitchens}, {myroom.toiletAndBathroom}</p>
                            <p>- Electricity Bill will {myroom.electricityBills}</p>
                            <p>- Adress: {myroom.colony}, {myroom.area}, {myroom.landmark}, {myroom.city}</p>
                            <p style={{color:"#3dd42c", textShadow:"1px 1px darkred"}}>- Expected Rent: {myroom.expectedRent}/-</p>
                        </div>
                    </div>
                </div>
                )
            })}
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
                    <h2 style={{textShadow: "0px 0px 5px #1f60ff"}}>{user.name}</h2>
                    <h4 style={{textShadow: "0px 0px 5px #1f60ff"}}>Phone: {user.email}</h4>
                    <div className="more-btn" >
                       <a className="post-button" id="message" onClick={handleButtonClick} >WhatsApp</a>
                       <Link className="post-button" id="location" to={`/profile/${item.postedBy._id}`}>profile</Link>
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

export default UserProfile;
